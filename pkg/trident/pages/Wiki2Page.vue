<template>
  <div>
    <TopNav :breadcrumbs="breadcrumbs" @onBCclick="handleBreadCrumbClick" />

    <div id="wiki-container" class="container">
      <div class="markdown-body mt-10" ref="wikiContent" v-html="wikiContent"></div>
      <div class="right-sidebar">
        <h1>Wiki</h1>
        <ul class="toc">
          <li v-for="wiki in wikiList"><a :href="`#${encodeURIComponent(wiki.slug)}`" @click="clickOnSideBar(wiki.slug)">{{ formatLinkString(wiki.title) }}</a></li>
          <!-- <li><a href="#section2">Section 2</a>
            <ul>
              <li><a href="#section2-1">Section 2.1</a></li>
              <li><a href="#section2-2">Section 2.2</a></li>
            </ul>
          </li>
          <li><a href="#section3">Section 3</a></li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import 'github-markdown-css';
import { marked } from 'marked';
import { wikiService } from '../services/api/wiki';
import { getConfig } from "../config/api";
import { formatString } from "../utils/helpers";
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
      wikiList: [],
      wikiContent: null,
      list: [],
      breadcrumbs: []
    }
  },
  methods: {
    formatLinkString(string) {
      return formatString(string)
    },
    async prependBaseUrlToUploads(markdownContent, baseUrl) {
      const pathPattern = /(\.\.\/)?(uploads\/|images\/)[^\s)]+/g;

      const matches = markdownContent.match(pathPattern) || [];
      const fetchPromises = matches.map(async (match) => {
        const normalizedMatch = match.replace(/\.\.\//, '');
        const base64ImageContent = await this.fetchImage(normalizedMatch);
        const mimeType = this.getMimeType(normalizedMatch);
        const dataUrl = `data:${mimeType};base64,${base64ImageContent}`;
        return { match, dataUrl };
      });

      const results = await Promise.all(fetchPromises);
      let updatedMarkdownContent = markdownContent;
      results.forEach(({ match, dataUrl }) => {
        updatedMarkdownContent = updatedMarkdownContent.replace(match, dataUrl);
      });

      return updatedMarkdownContent;
    },
    getMimeType(filePath) {
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
          return 'application/octet-stream';
      }
    },
    async clickOnSideBar(wikiId) {
      this.breadcrumbs = []
      await this.getWikiData(wikiId)
    },
    async getWikiData(wikiId) {
      try {
        const res = await wikiService.getById(wikiId);
        const content = await this.prependBaseUrlToUploads(res.content, GITLAB_SOURCE_URL);
        this.breadcrumbs.push({
          id: wikiId,
          title: formatString(res.title)
        });
        this.wikiContent = marked(content);
      } catch (err) {
        this.$store.dispatch('growl/error', {
          title: 'Error',
          message: `Error fetching wiki ${wikiId}`,
        }, { root: true });
      }
      this.$nextTick(() => {
        this.setupLinkHandlers()
        this.scrollToTop()
      });
    },
    async getAllWiki() {
      this.wikiList = await wikiService.getAll();
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
    handleBreadCrumbClick(data) {
      this.$router.replace({ path: this.$route.path, hash: `#${encodeURIComponent(data.id)}`});
      this.breadcrumbs = this.breadcrumbs.slice(0, data.index);
      this.getWikiData(data.id);
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
            this.$router.replace({ path: this.$route.path, hash: `#${encodeURIComponent(wikiPath)}`});
            this.getWikiData(wikiPath);
          }
        }
      }
    },
    scrollToTop() {
      const contentContainer = document.getElementById('wiki-container');
      if (contentContainer) {
        contentContainer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  mounted() {
    if (this.$route.hash) {
      this.getWikiData(decodeURIComponent(this.$route.hash.replace('#', '')));
    } else {
      this.getWikiData('home');
    }

    this.getAllWiki();
  }
};
</script>

<style scoped>
  @import '../../../node_modules/github-markdown-css/github-markdown.css';

  .container {
    display: flex;
  }

  .markdown-body {
    flex: 1;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .right-sidebar {
    width: 250px;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    padding: 20px;
    /* background-color: #f9f9f9; */
    border-left: 1px solid #ddd;
  }

  .right-sidebar h1 {
    font-size: 1.5em;
    margin-bottom: 20px;
  }

  .right-sidebar ul.toc {
    list-style-type: none;
    padding-left: 0;
  }

  .right-sidebar ul.toc li {
    margin: 10px 0;
  }

  .right-sidebar ul.toc li a {
    text-decoration: none;
    color: #297db4;
    transition: color 0.3s;
  }

  .right-sidebar ul.toc ul {
    margin-top: 10px;
    padding-left: 20px;
  }

  .theme-dark .markdown-body {
    background: #1b1c21;
    color: white;
  }

  .theme-light .markdown-body {
    background: #fff;
    color: #141419;
  }

  .theme-dark .markdown-body a {
    color: #297db4 !important;
  }
</style>