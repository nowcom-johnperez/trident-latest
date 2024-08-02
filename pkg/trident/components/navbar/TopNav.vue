<template>
  <div>
    <nav class="top-navbar">
        <div class="navbar-container">
            <div class="logo">
              <!-- <img src="../../assets/img/nowcom.jpeg" width="150px" alt=""> -->
               Trident
            </div>
            <div class="nav-links">
                <router-link v-for="link in links" :to="link.route">{{ link.name }}</router-link>
            </div>
        </div>
    </nav>
    <div v-if="$route.name.includes(WIKI_PAGE_NAME)" class="breadcrumbs">
        <a v-for="(bc, index) in breadcrumbs" href="#" @click.prevent="onBCclick(bc?.id, index)">
          {{ bc?.title }}
          <span v-if="index !== (breadcrumbs.length - 1)"> &gt; </span>
        </a> 
    </div>
  </div>
</template>

<script>
import { PRODUCT_ROUTE_NAME, TRIDENT_PAGE_NAME, WIKI_PAGE_NAME } from '../../config/constants';
export default {
  name: 'TopNav',
  props: {
    breadcrumbs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      WIKI_PAGE_NAME: WIKI_PAGE_NAME,
      links: [
        {
          route: {
            name: `${ PRODUCT_ROUTE_NAME }-c-cluster-${ TRIDENT_PAGE_NAME }`
          },
          name: 'App Launcher'
        },
        {
          route: {
            name: `${ PRODUCT_ROUTE_NAME }-c-cluster-${ WIKI_PAGE_NAME }`
          },
          name: 'Wiki'
        }
      ]
    }
  },
  methods: {
    onBCclick(id, index) {
      this.$emit('onBCclick', {id, index})
    }
  }
}
</script>

<style lang="scss" scoped>
.top-navbar {
    // background-color: #ffffff;
    // border-bottom: 1px solid #e0e0e0;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    // position: fixed;
    width: 90%;
    z-index: 1000;
}

.navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
}

.nav-links a {
    cursor: pointer;
    color: #333333;
    text-decoration: none;
    margin: 0 15px;
    font-size: 16px;
    position: relative;
}

.nav-links a:hover {
    color: #297db4;
}

.nav-links a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background: #297db4;
    left: 50%;
    bottom: -6px;
    transition: 0.3s;
}

.nav-links a:hover::after {
    width: 100%;
    left: 0;
}

.nav-links .router-link-exact-active {
  color: #297db4;
}

.breadcrumbs {
    margin-top: 10px; /* Adjust according to the height of the navbar */
    padding: 15px 20px;
    // background-color: #f9f9f9;
    border-bottom: 1px solid #e0e0e0;
    font-size: 14px;
}

.breadcrumbs a {
    color: #297db4;
    text-decoration: none;
}

.breadcrumbs a:hover {
    text-decoration: underline;
}

.theme-dark {
  .logo {
      color: #ffffff;
  }

  .nav-links a {
      color: #ffffff;
  }

  .nav-links a:hover {
      color: #297db4;
  }

  .nav-links .router-link-exact-active {
    color: #297db4;
  }

  .breadcrumbs a {
      color: #ffffff;
      text-decoration: none;
  }
}
</style>