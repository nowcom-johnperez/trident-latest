<template>
  <div>
    <div class="mb-25">
      <h3 class="mb-0 mt-20">Capacity</h3>
      <div class="hardware-resource-gauges mt-10">
        <HardwareResourceGauge
          :name="'CPU'"
          :reserved="cpuReserved"
          :used="cpuUsed"
        />
        <HardwareResourceGauge
          :name="'Memory'"
          :reserved="ramReserved"
          :used="ramUsed"
        />
        <HardwareResourceGauge
          :name="'Storage'"
          :reserved="storageAllocated"
          :used="storageUsed"
        />
      </div>
    </div>

    <div class="mb-30">
      <ExplorerProjectsNamespaces />
    </div>

    <!-- DISABLE TEMP -->
    <div v-if="false">
      <h3 class="mb-0 mt-20">Projects</h3>
      <!-- <pre>{{ groupProjectsNamespace }}</pre> -->
      <CollapsibleCard v-for="(nsProjects, namespace) in projects" :key="namespace" :title="nsProjects.clusterName" class="mb-20 mt-20" :isCollapsed="nsProjects.isOpen" @toggleCollapse="(c) => $set(nsProjects, 'isOpen', c)">
        <template #content>
          <pre>
            {{ nsProjects.items }}
          </pre>
        </template>
      </CollapsibleCard>
      <p>Memory</p>
      <pre>{{ memoryUsageTotal }} / {{  memoryTotal }}</pre>
    </div>
  </div>
</template>

<script>
import {
  parseSi, formatSi, exponentNeeded, UNITS, createMemoryValues
} from '@shell/utils/units';
import { HCI, NODE, METRIC, MANAGEMENT, LONGHORN } from '@shell/config/types';
import { allHash } from '@shell/utils/promise';
import HardwareResourceGauge from '@shell/components/HardwareResourceGauge';
import CollapsibleCard from '@shell/components/CollapsibleCard.vue'
import { harvesterService } from '../../services/api/harvester';
import { isEmpty } from '@shell/utils/object';
import metricPoller from '@shell/mixins/metric-poller';
import ExplorerProjectsNamespaces from '@shell/components/ExplorerProjectsNamespaces.vue'
const PARSE_RULES = {
  memory: {
    format: {
      addSuffix:        true,
      firstSuffix:      'B',
      increment:        1024,
      maxExponent:      99,
      maxPrecision:     2,
      minExponent:      0,
      startingExponent: 0,
      suffix:           'iB',
    }
  }
};

export default {
  name: 'ResourceView',
  mixins: [metricPoller],
  components: {
    HardwareResourceGauge,
    CollapsibleCard,
    ExplorerProjectsNamespaces
  },
  data() {
    return {
      cluster: null,
      clusters: [],
      dashboard: null,
      nodes: [],
      nodeStatus: [],
      metricNodes: [],
      nodeMetrics: [],
      projects: [],
      longhornSettings: [],
      longhornNodes: []
    }
  },
  computed: {
    hasHarvesterDashboard() {
      return this.$store.getters['management/schemaFor'](HCI.DASHBOARD);
    },

    hasHarvesterCluster() {
      return this.$store.getters['management/schemaFor'](HCI.CLUSTER);
    },

    hasHarvesterConfig() {
      return this.$store.getters['management/schemaFor'](HCI.HARVESTER_CONFIG);
    },

    storageStats() {
      const storageOverProvisioningPercentageSetting = this.longhornSettings.find(s => s.id === 'longhorn-system/storage-over-provisioning-percentage');
      const stats = this.longhornNodes.reduce((total, node) => {
        const disks = node?.spec?.disks || {};
        const diskStatus = node?.status?.diskStatus || {};

        total.used += node?.spec?.allowScheduling ? node.used : 0;

        Object.keys(disks).map((key) => {
          total.scheduled += node?.spec?.allowScheduling ? (diskStatus[key]?.storageScheduled || 0) : 0;
          total.reserved += disks[key]?.storageReserved || 0;
        });
        Object.values(diskStatus).map((diskStat) => {
          total.maximum += diskStat?.storageMaximum || 0;
        });

        return total;
      }, {
        used:      0,
        scheduled: 0,
        maximum:   0,
        reserved:  0,
        total:     0
      });

      stats.total = ((stats.maximum - stats.reserved) * Number(storageOverProvisioningPercentageSetting?.value ?? 0)) / 100;

      return stats;
    },

    cpusTotal() {
      let out = 0;

      this.metricNodes.forEach((node) => {
        out += node.cpuCapacity;
      });

      return out;
    },

    cpusUsageTotal() {
      let out = 0;

      this.metricNodes.forEach((node) => {
        out += node.cpuUsage;
      });

      return out;
    },

    memoryTotal() {
      let out = 0;

      this.metricNodes.forEach((node) => {
        out += node.memoryCapacity;
      });

      return out;
    },

    memoryUsageTotal() {
      let out = 0;

      this.metricNodes.forEach((node) => {
        out += node.memoryUsage;
      });

      return out;
    },

    cpuReserved() {
      const useful = this.nodes.reduce((total, node) => {
        return total + (node.cpuReserved ? node.cpuReserved : 0);
      }, 0);

      return {
        total: this.cpusTotal,
        useful,
      };
    },

    cpuUsed() {
      return {
        total:  this.cpusTotal,
        useful: this.metricAggregations?.cpu,
      };
    },

    ramReserved() {
      const useful = this.nodes.reduce((total, node) => {
        return total + node.memoryReserved;
      }, 0);

      return createMemoryValues(this.memoryTotal, useful);
    },

    ramUsed() {
      return createMemoryValues(this.memoryTotal, this.metricAggregations?.memory);
    },

    storageUsed() {
      const stats = this.storageStats;

      return this.createMemoryValues(stats.maximum, stats.used);
    },

    storageAllocated() {
      const stats = this.storageStats;

      return this.createMemoryValues(stats.total, stats.scheduled);
    },

    metricAggregations() {
      const nodes = this.nodes;
      const someNonWorkerRoles = this.nodes.some(node => node.hasARole && !node.isWorker);
      const metrics = this.nodeMetrics.filter((nodeMetrics) => {
        const node = nodes.find(nd => nd.id === nodeMetrics.id);

        return node && (!someNonWorkerRoles || node.isWorker);
      });
      const initialAggregation = {
        cpu:    0,
        memory: 0
      };

      if (isEmpty(metrics)) {
        return null;
      }

      return metrics.reduce((agg, metric) => {
        agg.cpu += parseSi(metric.usage.cpu);
        agg.memory += parseSi(metric.usage.memory);

        return agg;
      }, initialAggregation);
    },

    // getAllManage() {
    //   return this.$store.getters['management/all'](HCI.CLUSTER)
    // }
  },

  async fetch() {
    // const hash = await allHash({
    //   hciClusters:  this.$store.dispatch(`management/findAll`, { type: HCI.CLUSTER }),
    //   mgmtClusters: this.$store.dispatch(`management/findAll`, { type: MANAGEMENT.CLUSTER })
    // });

    const hash = {
      nodes: this.fetchClusterResources(NODE),
      nodeStatus: harvesterService.getAll(),
      metricNodes: this.fetchClusterResources(METRIC.NODE),
      longhornNodes:    this.fetchClusterResources(LONGHORN.NODES),
      longhornSettings: this.fetchClusterResources(LONGHORN.SETTINGS),
    }

    const res = await allHash(hash)

    for ( const k in res ) {
      this[k] = res[k];
    }

    const projects = await this.$store.dispatch('management/findAll', { type: MANAGEMENT.PROJECT, opt: { force: true } })
    const clusters = await this.$store.dispatch('management/findAll', { type: MANAGEMENT.CLUSTER, opt: { force: true } })
    this.projects = projects?.reduce((acc, item) => {
        const namespace = item.metadata?.namespace;
        const cluster = clusters.find((cluster) => cluster.metadata.name === namespace)
        if (!acc[namespace]) {
          acc[namespace] = {
            isOpen: true,
            clusterName: cluster.spec.displayName,
            items: [] 
          };
        }
        acc[namespace].items.push(item);
        
        return acc;
      }, {});
  },

  methods: {
    createMemoryValues(total, useful) {
      const parsedTotal = parseSi((total || '0').toString());
      const parsedUseful = parseSi((useful || '0').toString());
      const format = this.createMemoryFormat(parsedTotal);
      const formattedTotal = formatSi(parsedTotal, format);
      let formattedUseful = formatSi(parsedUseful, {
        ...format,
        addSuffix: false,
      });

      if (!Number.parseFloat(formattedUseful) > 0) {
        formattedUseful = formatSi(parsedUseful, {
          ...format,
          canRoundToZero: false,
        });
      }

      return {
        total:  Number(parsedTotal),
        useful: Number(parsedUseful),
        formattedTotal,
        formattedUseful,
        units:  this.createMemoryUnits(parsedTotal),
      };
    },

    createMemoryFormat(n) {
      const exponent = exponentNeeded(n, PARSE_RULES.memory.format.increment);

      return {
        ...PARSE_RULES.memory.format,
        maxExponent: exponent,
        minExponent: exponent,
      };
    },

    createMemoryUnits(n) {
      const exponent = exponentNeeded(n, PARSE_RULES.memory.format.increment);

      return `${ UNITS[exponent] }${ PARSE_RULES.memory.format.suffix }`;
    },

    async fetchClusterResources(type, opt = {}, store) {
      const inStore = store || this.$store.getters['currentProduct'].inStore;
      console.log(`inStore`, inStore)

      const schema = this.$store.getters[`${ inStore }/schemaFor`](type);

      if (schema) {
        try {
          const resources = await this.$store.dispatch(`${ inStore }/findAll`, { type, opt });

          return resources;
        } catch (err) {
          console.error(`Failed fetching cluster resource ${ type } with error:`, err); // eslint-disable-line no-console

          return [];
        }
      }

      return [];
    },

    async loadMetrics() {
      this.nodeMetrics = await this.fetchClusterResources(METRIC.NODE, { force: true } );
    },
  }
}
</script>

<style lang="scss" scoped>
.capacity-container {
  display: flex;
  justify-content: space-evenly;
}
</style>