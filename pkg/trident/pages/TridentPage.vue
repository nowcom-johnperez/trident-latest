<template>
  <div>
    <h1>Local Testing</h1>

    <div class="mt-10">
      <SortableTable
        :headers="main.headers" 
        :rows="main.rows" 
        :paging="true" 
        :rowActionsWidth="10" 
        :rows-per-page="main.rowsPerPage" 
        keyField="name" 
        :loading="main.loading"
        :tableActions="true"
        :rowActions="true"
      >
        <template #cell:title="{row}">
          <a href="#" @click.prevent="openSidebar(row)">{{ row.title }}</a>
        </template>
        <template #cell:ip="{row}">
          <CopyToClipboardText :text="row.ip" />
        </template>
      </SortableTable>

      <SideBar type="main" :sidebar-visible="main.sidebar.show" @close="closeSidebar">
        <Overview v-if="selectedRow" :detail="selectedRow" />
      </SideBar>
    </div>
  </div>
</template>

<script>
import CopyToClipboardText from '@shell/components/CopyToClipboardText.vue'
import SortableTable from '@shell/components/ResourceTable.vue'
import SideBar from '../components/common/SideBar.vue'
import Overview from '../components/trident/Overview.vue'
import { TRIDENT_TABLE_HEADERS } from '../config/tables'
import routeInit from '../mixins/init'
export default {
  name: 'Trident',
  mixins: [routeInit],
  components: {
    SortableTable,
    SideBar,
    Overview,
    CopyToClipboardText
  },
  data() {
    return {
      loading: false,
      main: {
        headers: [],
        rows: [],
        rowPerPage: 5,
        loading: false,
        sidebar: {
          show: false
        }
      },
      selectedRow: null,
    }
  },
  methods: {
    openSidebar (row) {
      this.selectedRow = row;
      this.main.sidebar.show = true;
    },
    closeSidebar () {
      this.main.sidebar.show = false;
    }
  },
  created() {
    this.main.headers = TRIDENT_TABLE_HEADERS

    this.main.rows = [
      {
        title: 'DC-DEV2-ATOM-01',
        description: 'Atom Dev2 Cluster 01',
        ip: '10.55.11.79',
        healthCheck: null,
        repoBranch: null,
        rancher: null
      },
      {
        title: 'DC-DEV2-MOBILE-01',
        description: 'Mobile Dev2 Cluster 01',
        ip: '10.55.11.89',
        healthCheck: null,
        repoBranch: null,
        rancher: null
      },
      {
        title: 'DC-DEV2-RND-01',
        description: 'RND Dev2 Cluster 01',
        ip: '10.55.11.91',
        healthCheck: null,
        repoBranch: null,
        rancher: null
      }
    ]
  }
}
</script>