<template>
  <div>
    <TopNav />

    <div class="markdown-body" ref="wikiContent" v-html="wikiContent"></div>
  </div>
</template>

<script>
import 'github-markdown-css';
import { marked } from 'marked'
import { wikiService } from '../services/api/wiki'
import { getConfig } from "../config/api";
const { GITLAB_SOURCE_URL } = getConfig();
export default {
  name: 'Wiki',
  layout: 'plain',
  data() {
    return {
      wikiContent: null,
      list: []
    }
  },
  methods: {
    prependBaseUrlToUploads(markdownContent, baseUrl) {
      const pathPattern = /(\.\.\/)?(uploads\/|images\/)[^\s)]+/g;

      return markdownContent.replace(pathPattern, match => {
        const normalizedMatch = match.replace(/\.\.\//, '');
        return `${baseUrl.replace(/\/+$/, '')}/${normalizedMatch}`;
      });
    },
    async getWikiData(wikiId) {
      try {
        const res = await wikiService.getById(wikiId);
        const content = this.prependBaseUrlToUploads(res.content, GITLAB_SOURCE_URL);
        this.wikiContent = marked(content)
      } catch (err) {
        this.$store.dispatch('growl/error', {
          title: 'Error',
          message: `Error fetching wiki ${wikiId}`,
        }, { root: true })
      }

      this.$nextTick(() => this.setupLinkHandlers());
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
        console.log(`url`, url, path)

        // Assuming the path is a relative URL and you want to handle it
        if (path.startsWith('/')) {
          // Extract the slug or ID from the URL
          const wikiId = path.substring(13); // Adjust extraction logic if needed
          this.getWikiData(wikiId);
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
/* @import '@github/github-markdown.css'; */
</style>