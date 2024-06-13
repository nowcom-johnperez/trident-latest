<template>
  <div>
    <h1>Dev Tools</h1>

    <div class="mt-10">
      <SortableTable
        :headers="main.headers" 
        :rows="main.rows" 
        :paging="true" 
        :rowActionsWidth="10" 
        :rows-per-page="main.rowsPerPage" 
        keyField="name" 
        :loading="main.loading"
      >
        <template #cell:title="{row}">
          <a href="#" @click.prevent="openSidebar(row)">{{ row.title }}</a>
        </template>
        <template #cell:dev2url="{row}">
          <span v-if="row.dev2url" class="row">
            <IconLink :value="row.dev2url" class="mr-20" />
            <CopyToClipboard class="cbtn" :text="row.dev2url" />
          </span>
          <span v-else>-</span>
        </template>
        <template #cell:int0url="{row}">
          <span v-if="row.int0url" class="row">
            <IconLink :value="row.int0url" class="mr-20" />
            <CopyToClipboard class="cbtn" :text="row.int0url" />
          </span>
          <span v-else>-</span>
        </template>
        <template #cell:prodUrl="{row}">
          <span v-if="row.prodUrl" class="row">
            <IconLink :value="row.prodUrl" class="mr-20" />
            <CopyToClipboard class="cbtn" :text="row.prodUrl" />
          </span>
          <span v-else>-</span>
        </template>
      </SortableTable>

      <SideBar type="main" :sidebar-visible="main.sidebar.show" @close="closeSidebar">
        <Overview v-if="selectedRow" :detail="selectedRow" />
      </SideBar>
    </div>
  </div>
</template>

<script>
import SortableTable from '@shell/components/ResourceTable.vue'
import SideBar from '../components/common/SideBar.vue'
import Overview from '../components/trident/Overview.vue'
import { DEV_TOOLS_TABLE_HEADERS } from '../config/tables'
import IconLink from '../components/common/IconLink.vue';
import CopyToClipboard from '@shell/components/CopyToClipboard.vue'
import routeInit from '../mixins/init'
export default {
  name: 'DevToolsPage',
  mixins: [routeInit],
  components: {
    SortableTable,
    SideBar,
    Overview,
    IconLink,
    CopyToClipboard
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
    this.main.headers = DEV_TOOLS_TABLE_HEADERS

    this.main.rows = [
      {
        title: 'BlazeMeter',
        dev2url: null,
        int0url: null,
        prodUrl: "https://auth.blazemeter.com/auth/realms/blazect/protocol/saml/clients/blazemeter#/accounts/493736/workspaces/494942/dashboard",
      },
      {
        title: 'BrowserStack',
        dev2url: null,
        int0url: null,
        prodUrl: "https://live.browserstack.com/dashboard#os=android&os_version=6.0&device=Google+Nexus+6&device_browser=chrome&zoom_to_fit=true&full_screen=true&url=https%3A%2F%2Fapp.dealercenter.net%2Fapps%2Fshell%2Freports%2Fcustom%2Finventoryreport%2Ffacebook-marketplace%3FreportId%3D-1174&speed=1",
      },
    ]
  }
}
</script>