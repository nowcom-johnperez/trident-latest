<template>
  <div>
    <TopNav />
    <div v-if="loading" class="loader">
      <i class="fa fa-spinner fa-spin"></i> Loading Data Please Wait...
    </div>
    <div v-else>
      <div class="mt-30 pb-20">
        <SortableTable
          :headers="main.headers" 
          :rows="displayedClusterData" 
          :paging="true" 
          :rowActionsWidth="5" 
          :rows-per-page="main.rowsPerPage" 
          keyField="metadata.uid" 
          :loading="main.loading"
          :table-actions="false"
          :row-actions="false"
        >
          <template #header-left>
            <h1>App Launcher</h1>
          </template>
          <template #cell:metadata.name="{row}">
            <a href="#" @click.prevent="openSidebar(row)">{{ row.metadata.name }}</a>
            <p>{{ getIngressPath(row) }}</p>
          </template>
          <template #cell:clusterName="{row}">
            <UrlLink :url="{ path: `/c/${row.clusterId}/explorer#cluster-events`}">{{ row.clusterName }}</UrlLink>
          </template>
          <template #cell:nodeIP="{row}">
            <ul class="ip-listing">
              <li v-for="ip in row.nodeIP.slice(0, 3)" :key="`${ip}-${row.metadata.namespace}`">
                <CopyToClipboardText :text="ip" />
              </li>
            </ul>
          </template>
          <template #cell:loadBalancerIP="{row}">
            <ul class="ip-listing">
              <li v-for="ip in row.loadBalancerIP" :key="`${ip}-${row.metadata.namespace}`">
                <CopyToClipboardText :text="ip" />
              </li>
            </ul>
          </template>
          <template #cell:repoBranch="{row}">
            <GithubLink v-if="row.repoBranch" :value="row.repoBranch" />
          </template>
          <template #cell:actions="{ row }">
            <div style="display: flex; justify-content: flex-start;">
              <a
                v-if="getEndpoints(row)?.length <= 1 && row.kind === 'Service'"
                :href="getEndpoints(row)[0]?.value" target="_blank"
                rel="noopener noreferrer nofollow" class="btn role-primary">
                {{ t('appLauncher.launch') }}
              </a>
              <a
                v-else-if="row.kind === 'Ingress'"
                :href="getIngressPath(row)"
                target="_blank"
                rel="noopener noreferrer nofollow"
                class="btn role-primary"
              >
                {{ t('appLauncher.launch') }}
              </a>
              <ButtonDropDown
                v-else
                :button-label="t('appLauncher.launch')"
                :dropdown-options="getEndpoints(row)"
                :title="t('appLauncher.launchAnEndpointFromSelection')" @click-action="openLink"
              />
            </div>
          </template>
        </SortableTable>

        <SideBar type="main" :sidebar-visible="main.sidebar.show" @close="closeSidebar">
          <Overview v-if="selectedRow" :detail="selectedRow" />
        </SideBar>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@shell/components/Loading';
import { MANAGEMENT, FLEET } from '@shell/config/types';
import CopyToClipboardText from '@shell/components/CopyToClipboardText.vue'
import SortableTable from '@shell/components/ResourceTable.vue'
import SideBar from '../components/common/SideBar.vue'
import GithubLink from '../components/common/GithubLink.vue'
import UrlLink from '../components/common/UrlLink.vue'
import Overview from '../components/trident/Overview.vue'
import { TRIDENT_TABLE_HEADERS } from '../config/tables'
import routeInit from '../mixins/init'
import { hasAccess } from '../utils/permission'
import ButtonDropDown from '@shell/components/ButtonDropdown';
import { isMaybeSecure } from '@shell/utils/url';
import { ingressFullPath } from '@shell/models/networking.k8s.io.ingress';
import TopNav from '../components/navbar/TopNav.vue';
export default {
  name: 'Trident',
  mixins: [routeInit],
  // layout: 'plain',
  components: {
    TopNav,
    SortableTable,
    SideBar,
    Overview,
    CopyToClipboardText,
    ButtonDropDown,
    GithubLink,
    UrlLink,
    Loading
  },
  data() {
    return {
      servicesByCluster: [],
      ingressesByCluster: [],
      githubList: [],
      loading: true,
      main: {
        headers: [],
        rows: [],
        rowsPerPage: 10,
        loading: false,
        sidebar: {
          show: false
        }
      },
      selectedRow: null,
    }
  },
  computed: {
    displayedClusterData() {
      if (this.servicesByCluster.length > 0) {
        // const allClustersData = this.servicesByCluster.map(cluster => ({
        //   ...cluster,
        //   ingresses: this.ingressesByCluster.find(ingressCluster => ingressCluster.id === cluster.id)?.ingresses || [],
        //   filteredApps: this.filteredApps(cluster.services, this.ingressesByCluster.find(ingressCluster => ingressCluster.id === cluster.id)?.ingresses || []),
        // }));
        return this.servicesByCluster.map((cluster) => {
          return this.filteredApps(cluster.services, this.ingressesByCluster.find(ingressCluster => ingressCluster.id === cluster.id)?.ingresses || [])
        }).flat();
      }
      return [];
    },
    filteredApps() {
      return (services, ingresses) => {
        const loadBalancerIP = services.map((service) => {
          return service.metadata?.annotations?.['kube-vip.io/loadbalancerIPs']
        })
        const sortedApps = [...(services || []), ...(ingresses || [])].filter((service) => !service.metadata?.namespace.includes('cattle-') && !service.metadata?.namespace.includes('kube-') && service.kind === 'Ingress').sort((a, b) => {
          const nameA = a.metadata.name.toLowerCase();
          const nameB = b.metadata.name.toLowerCase();
          nameB.localeCompare(nameA);
        }).map((d) => {
          const github = this.githubList.find((gh) => gh.clusterName === d.clusterName)
          const githubUrl = github?.spec?.repo && github?.spec?.paths?.length ? `${github.spec.repo.replace('.git', '')}/tree/${github.spec.branch}${github.spec.paths[0]}` : '';

          return {
            ...d,
            loadBalancerIP,
            repoBranch: githubUrl,
            github
          }
        });

        return sortedApps;
      };
    },
  },
  async mounted() {
    await this.getGitHubRepos()
    try {
      const allClusters = await this.getClusters();
      const [ingressesByCluster, servicesByCluster] = await Promise.all([
        this.getIngressesByCluster(allClusters),
        this.getServicesByCluster(allClusters),
      ]);

      this.ingressesByCluster = ingressesByCluster;
      this.servicesByCluster = servicesByCluster;
    } catch (error) {
      console.error('Error fetching clusters', error);
    } finally {
      this.loading = false;
    }
    
  },
  methods: {
    openSidebar (row) {
      this.selectedRow = row;
      this.main.sidebar.show = true;
    },
    closeSidebar () {
      this.main.sidebar.show = false;
    },
    async getGitHubRepos() {
      const hasFleetAccess = await hasAccess(this.$store, FLEET.GIT_REPO)
      if (!hasFleetAccess) return
      const allGithubRepos = await this.$store.dispatch(`management/findAll`, { type: FLEET.GIT_REPO } )
      this.githubList = allGithubRepos.map((g) => {
        return {
          ...g,
          clusterName: g.spec.targets?.map((target) => target.clusterName)[0]
        }
      })
    },
    async getClusters() {
      return await this.$store.dispatch(`management/findAll`, {
        type: MANAGEMENT.CLUSTER,
      });
    },
    async getServicesByCluster(allClusters) {
      const servicePromises = allClusters
        .filter(cluster => cluster.isReady)
        .map(async cluster => {
          const clusterData = {
            name: cluster.spec.displayName,
            id: cluster.id,
            services: [],
            loading: true,
            error: false,
          };

          try {
            const services = (
              await this.$store.dispatch('cluster/request', {
                url: `/k8s/clusters/${cluster.id}/v1/services`,
              })
            ).data;

            clusterData.services = services
              .filter(service => 
                service.spec?.type === 'LoadBalancer' &&
                service.metadata?.annotations?.['kube-vip.io/loadbalancerIPs']
              )
              .map(service => ({
                ...service,
                clusterId: cluster.id,
                clusterName: cluster.spec.displayName,
              }));
          } catch (error) {
            console.error(`Error fetching services for cluster ${cluster.id}:`, error);
            clusterData.error = true;
          } finally {
            clusterData.loading = false;
          }

          return clusterData;
        });

      return await Promise.all(servicePromises);
    },

    async getIngressesByCluster(allClusters) {
      const ingressPromises = allClusters
        .filter(cluster => cluster.isReady)
        .map(async cluster => {
          const clusterData = {
            name: cluster.spec.displayName,
            id: cluster.id,
            ingresses: [],
            loading: true,
            error: false,
          };

          try {
            const ingresses = (
              await this.$store.dispatch('cluster/request', {
                url: `/k8s/clusters/${cluster.id}/v1/networking.k8s.io.ingresses`,
              })
            ).data;

            clusterData.ingresses = ingresses.map(ingress => ({
              ...ingress,
              clusterId: cluster.id,
              clusterName: cluster.spec.displayName,
              nodeIP: ingress.status?.loadBalancer?.ingress?.map(node => node.ip) || [],
            }));
          } catch (error) {
            console.error(`Error fetching ingresses for cluster ${cluster.id}:`, error);
            clusterData.error = true;
          } finally {
            clusterData.loading = false;
          }

          return clusterData;
        });

      return await Promise.all(ingressPromises);
    },
    getEndpoints(row) {
      return (
        row?.spec.ports?.map((port) => {
          const endpoint = `${isMaybeSecure(port.port, port.protocol) ? 'https' : 'http'
              }:${row.metadata.name}:${port.port}`;

          return {
              label: `${endpoint}${port.protocol === 'UDP' ? ' (UDP)' : ''}`,
              value: `/k8s/clusters/${row.clusterId}/api/v1/namespaces/${row.metadata.namespace}/services/${endpoint}/proxy`,
          };
        }) ?? []
      );
    },

    getIngressPath(row) {
      if (!row.spec?.rules) return ''
      return ingressFullPath(row, row?.spec?.rules?.[0]) || '';
    },
    
    openLink(option) {
      window.open(option.value, '_blank');
    },
  },
  created() {
    this.main.headers = TRIDENT_TABLE_HEADERS
  }
}
</script>

<style lang="scss" scoped>
.loader {
  text-align: center;
  font-size: 2em;
  margin-top: 10%;
}
ul.ip-listing {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>