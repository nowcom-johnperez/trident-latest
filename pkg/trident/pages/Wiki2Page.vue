<template>
  <div>
    <!-- <div class="wiki-header">
      <h1>Wiki List</h1>
      <ul>
        <li v-for="item in list">
          <a href="#" @click.prevent="getWikiData(item.slug)">{{ item.title }}</a>
        </li>
      </ul>
    </div> -->

    <div ref="wikiContent" v-html="wikiContent"></div>
  </div>
</template>

<script>
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
      const res = await wikiService.getById(wikiId);
      const content = this.prependBaseUrlToUploads(res.content, GITLAB_SOURCE_URL);
      this.wikiContent = marked(content)
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

<!-- @TODO FIX CSS for markdown -->
<style lang="scss" scoped>
H1, H2, H3, H4, H5 {
  border-bottom: 1px solid #bfbfc3 !important;
}
</style>