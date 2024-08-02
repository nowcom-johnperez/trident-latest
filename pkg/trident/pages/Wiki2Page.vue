<template>
  <div>
    <TopNav :breadcrumbs="breadcrumbs" @onBCclick="handleBreadCrumbClick" />

    <div class="markdown-body mb-30" ref="wikiContent" v-html="wikiContent"></div>
  </div>
</template>

<script>
import 'github-markdown-css';
import { marked } from 'marked'
import { wikiService } from '../services/api/wiki'
import { getConfig } from "../config/api";
const { GITLAB_SOURCE_URL, GITLAB_TOKEN } = getConfig();
import TopNav from '../components/navbar/TopNav.vue';
const fs = require('fs');
export default {
  name: 'Wiki',
  layout: 'plain',
  components: {
    TopNav
  },
  data() {
    return {
      wikiContent: null,
      list: [],
      breadcrumbs: []
    }
  },
  methods: {
    async prependBaseUrlToUploads(markdownContent, baseUrl) {
    const pathPattern = /(\.\.\/)?(uploads\/|images\/)[^\s)]+/g;

    const matches = markdownContent.match(pathPattern);
    if (!matches) return markdownContent;

    const base64Promises = matches.map(async match => {
      const normalizedMatch = match.replace(/\.\.\//, '');
      const fullUrl = `${baseUrl.replace(/\/+$/, '')}/${normalizedMatch}`;
      const base64Image = await this.fetchImageAsBase64(fullUrl);
      return { match, base64Image };
    });

    const base64Images = await Promise.all(base64Promises);

    base64Images.forEach(({ match, base64Image }) => {
      markdownContent = markdownContent.replace(match, base64Image);
    });

    return markdownContent;
  },
  async fetchImageAsBase64(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  },
    // prependBaseUrlToUploads(markdownContent, baseUrl) {
    //   const pathPattern = /(\.\.\/)?(uploads\/|images\/)[^\s)]+/g;

    //   return markdownContent.replace(pathPattern, match => {
    //     const normalizedMatch = match.replace(/\.\.\//, '');
    //     const fullUrl = `${baseUrl.replace(/\/+$/, '')}/${normalizedMatch}?private_token=${GITLAB_TOKEN}`;
    //     console.log(`Generated URL: ${fullUrl}`);  
    //     return fullUrl
    //   });
    // },
    async getWikiData(wikiId) {
      try {
        const res = await wikiService.getById(wikiId);
        const content = await this.prependBaseUrlToUploads(res.content, GITLAB_SOURCE_URL);
        this.breadcrumbs.push({
          id: wikiId,
          title: res.title
        })
        this.wikiContent = marked(content)
      } catch (err) {
        this.$store.dispatch('growl/error', {
          title: 'Error',
          message: `Error fetching wiki ${wikiId}`,
        }, { root: true })
      }

      this.$nextTick(() => this.setupLinkHandlers());
    },
    handleBreadCrumbClick(data) {
      this.breadcrumbs = this.breadcrumbs.slice(0, data.index);
      this.getWikiData(data.id)
    },
    setupLinkHandlers() {
      const container = this.$refs.wikiContent;
      if (container) {
        container.addEventListener('click', this.handleLinkClick);
      }
    },
    handleLinkClick(event) {
      const target = event.target;
      if (target.tagName === 'A' && target.href) {
        event.preventDefault();
        const url = new URL(target.href);
        const path = url.pathname;

        if (path.startsWith('/')) {
          const splitPath = path.split('/');
          const cIndex = splitPath.indexOf('c');
          const underscoreIndex = splitPath.indexOf('_');
          if (cIndex !== -1 && underscoreIndex !== -1 && underscoreIndex > cIndex) {
            const wikiPath = splitPath.slice(underscoreIndex + 1).join('/');
            this.getWikiData(wikiPath);
          }
        }
      }
    }
  },
  mounted() {
    this.getWikiData('home')
  }
}
</script>

<style scoped>
@import '../../../node_modules/github-markdown-css/github-markdown.css';

.theme-dark .markdown-body {
  background: #1b1c21;
  color: white;
}

.theme-dark .markdown-body a {
  color: #297db4 !important;
}
</style>