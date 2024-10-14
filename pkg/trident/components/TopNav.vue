<template>
  <nav class="navbar">
    <ul class="nav-list">
      <li><router-link :to="homeLocation">Home</router-link></li>
      <li class="dropdown">
        <a href="#">Trident</a>
        <ul class="dropdown-menu">
          <li><router-link :to="tridentLocation.app">App Launcher</router-link></li>
          <li><router-link :to="tridentLocation.wiki">Wiki</router-link></li>
          <li><router-link :to="tridentLocation.harvester">Resource Management</router-link></li>
        </ul>
      </li>
      <li class="dropdown">
        <a href="#">Infrastructure</a>
        <ul class="dropdown-menu">
          <li><router-link :to="infraLocation.k8">Kubernetes</router-link></li>
          <li><router-link :to="infraLocation.network">Network</router-link></li>
          <li><router-link :to="infraLocation.firewall">Firewall</router-link></li>
          <li><router-link :to="infraLocation.dhcp">DHCP</router-link></li>
          <li><router-link :to="infraLocation.dns">DNS</router-link></li>
          <li><router-link :to="infraLocation.roadmap">Road Map</router-link></li>
        </ul>
      </li>
      
    </ul>
  </nav>
</template>

<script>
import { getConfig } from '../config/api';
import { PRODUCT_NAME, HOME, INFRASTRUCTURE, TRIDENT_PAGE_NAME, RESOURCE_MANAGEMENT, WIKI_PAGE_NAME, BLANK_CLUSTER } from '../config/constants';
const { CLUSTER } = getConfig();
export default {
  name: 'TopNav',
  computed: {
    homeLocation() {
      return {
        name: `${INFRASTRUCTURE.PRODUCT_NAME}-c-cluster-${INFRASTRUCTURE.HOME}`,
        params: {
          cluster: BLANK_CLUSTER
        }
      }
    },
    tridentLocation() {
      return {
        app: {
          name: `${PRODUCT_NAME}-c-cluster-${TRIDENT_PAGE_NAME}`,
          params: {
            cluster: BLANK_CLUSTER
          }
        },
        wiki: {
          name: `${PRODUCT_NAME}-c-cluster-${WIKI_PAGE_NAME}`,
          params: {
            cluster: BLANK_CLUSTER
          }
        },
        harvester: {
          name: `${PRODUCT_NAME}-c-cluster-${RESOURCE_MANAGEMENT}`,
          params: {
            cluster: CLUSTER
          }
        }
      }
    },
    infraLocation() {
      return {
        k8: {
          name: `${INFRASTRUCTURE.PRODUCT_NAME}-c-cluster-${INFRASTRUCTURE.LIST_K8}`,
          params: {
            cluster: BLANK_CLUSTER
          }
        },
        network: {
          name: `${INFRASTRUCTURE.PRODUCT_NAME}-c-cluster-${INFRASTRUCTURE.LIST_NETWORK}`,
          params: {
            cluster: BLANK_CLUSTER
          }
        },
        firewall: {
          name: `${INFRASTRUCTURE.PRODUCT_NAME}-c-cluster-${INFRASTRUCTURE.LIST_FIREWALL}`,
          params: {
            cluster: BLANK_CLUSTER
          }
        },
        dns: {
          name: `${INFRASTRUCTURE.PRODUCT_NAME}-c-cluster-${INFRASTRUCTURE.LIST_DNS}`,
          params: {
            cluster: BLANK_CLUSTER
          }
        },
        dhcp: {
          name: `${INFRASTRUCTURE.PRODUCT_NAME}-c-cluster-${INFRASTRUCTURE.LIST_DHCP}`,
          params: {
            cluster: BLANK_CLUSTER
          }
        },
        roadmap: {
          name: `${INFRASTRUCTURE.PRODUCT_NAME}-c-cluster-${INFRASTRUCTURE.ROAD_MAP}`,
          params: {
            cluster: BLANK_CLUSTER
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #1b1c21;
  padding: 10px 0;
  z-index: 15;
  border: 1px solid #3D98D3;
}

.nav-list {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list > li {
  position: relative;
  margin: 0 15px;
}

.nav-list a {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  display: block;
}

.nav-list a:hover {
  background-color: #555;
  border-radius: 5px;
}

.nav-list a.router-link-active {
  background-color: #555;
  border-radius: 5px;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: #333;
  list-style: none;
  padding: 10px 0;
  margin: 0;
  border-radius: 5px;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 150px;
}

.dropdown-menu li {
  margin: 0;
}

.dropdown-menu a {
  padding: 10px 15px;
}

.dropdown-menu a:hover {
  background-color: #555;
  border-radius: 0;
}
</style>
