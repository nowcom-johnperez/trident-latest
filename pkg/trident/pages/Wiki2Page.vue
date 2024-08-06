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
const { GITLAB_SOURCE_URL } = getConfig();
import TopNav from '../components/navbar/TopNav.vue';
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
    // prependBaseUrlToUploads(markdownContent, baseUrl) {
    //   const pathPattern = /(\.\.\/)?(uploads\/|images\/)[^\s)]+/g;

    //   return markdownContent.replace(pathPattern, match => {
    //     const normalizedMatch = match.replace(/\.\.\//, '');
    //     const fullUrl = `${baseUrl.replace(/\/+$/, '')}/${normalizedMatch}`;
    //     return fullUrl
    //   });
    // },
    async prependBaseUrlToUploads(markdownContent, baseUrl) {
      const pathPattern = /(\.\.\/)?(uploads\/|images\/)[^\s)]+/g;

      // Use Promise.all to handle multiple async fetches in parallel
      const matches = markdownContent.match(pathPattern) || [];
      const fetchPromises = matches.map(async (match) => {
        const normalizedMatch = match.replace(/\.\.\//, '');
        
        // Fetch the base64 image content
        const base64ImageContent = await this.fetchImage(normalizedMatch);
        
        // Create a base64 data URL
        const mimeType = this.getMimeType(normalizedMatch);
        const dataUrl = `data:${mimeType};base64,${base64ImageContent}`;
        
        return { match, dataUrl };
      });

      const results = await Promise.all(fetchPromises);

      // Replace the matches with their corresponding data URLs
      let updatedMarkdownContent = markdownContent;
      results.forEach(({ match, dataUrl }) => {
        updatedMarkdownContent = updatedMarkdownContent.replace(match, dataUrl);
      });

      return updatedMarkdownContent;
    },
    getMimeType (filePath) {
      const extension = filePath.split('.').pop().toLowerCase();
      switch (extension) {
        case 'png':
          return 'image/png';
        case 'jpg':
        case 'jpeg':
          return 'image/jpeg';
        case 'gif':
          return 'image/gif';
        default:
          return 'application/octet-stream'; // Default MIME type for unknown types
      }
    },
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
    async fetchImage(imageUrl) {
      try {
        const res = await wikiService.getImage(imageUrl);
        return res.content;
      } catch (error) {
        console.error('Error fetching image:', error);
        return '';
      }
    },
    async fetchFiles() {
      const res = await wikiService.fetchAllFiles()
      console.log(`res`, res.data)
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
    // this.fetchFiles()
    this.fetchImage(`uploads/clus.png`)
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