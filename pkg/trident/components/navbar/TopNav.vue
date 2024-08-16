<template>
  <div>
    <nav class="top-navbar">
        <div class="navbar-container">
            <div class="logo">
               Trident
            </div>
            <div class="nav-links">
                <router-link v-for="link in links" :to="link.route">{{ link.name }}</router-link>
            </div>
        </div>
    </nav>
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
    padding-bottom: 20px;
    // border-bottom: 1px solid #e0e0e0;
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
    padding: 10px 15px;
    transition: all 0.3s ease-in-out;
    border-radius: 4px;
}

.nav-links a:hover {
    color: #ffffff;
    background-color: #297db4;
    font-weight: 600;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-links a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background: #297db4;
    left: 50%;
    bottom: -6px;
    transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
}

.nav-links a:hover::after {
    width: 100%;
    left: 0;
}

.nav-links .router-link-exact-active {
    color: #297db4;
    font-weight: 700;
    border-bottom: 3px solid #297db4;
}

.theme-dark {
    .logo {
        color: #ffffff;
    }

    .nav-links a {
        color: #ffffff;
        background-color: transparent;
        transition: all 0.3s ease-in-out;
    }

    .nav-links a:hover {
        color: #ffffff;
        background-color: #1c5d88;
    }

    .nav-links a::after {
        background: #ffffff;
    }

    .nav-links .router-link-exact-active {
        color: #ffffff;
        border-bottom: 3px solid #ffffff;
    }
}

</style>