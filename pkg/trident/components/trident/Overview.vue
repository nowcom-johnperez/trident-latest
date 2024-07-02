<template>
  <div>
    <h3>{{ detail.title }}</h3>

    <Tabs class="mt-10" :list="tabList" :current="currentTab" @set-active="changeTab" />

    <div class="tab-content-container mt-10">
        <div class="tab-content" :class="{ 'show': currentTab === 0 }">
          <!-- Overview -->
          <Details :details="detail" />
          
        </div>

        <div class="tab-content" :class="{ 'show': currentTab === 1 }">
          <ul class="ip-listing">
            <li v-for="ip in detail.nodeIP.slice(0, 3)" :key="`${ip}-${detail.metadata.namespace}`">
              <CopyToClipboardText :text="ip" />
            </li>
          </ul>
          <!-- Runs -->
          <!-- <Runs /> -->
        </div>

        <!-- <div class="tab-content" :class="{ 'show': currentTab === 2 }"> -->
          <!-- Audit Log -->
          <!-- <p>Audit Log</p> -->
        <!-- </div> -->
    </div>
  </div>
</template>

<script>
import CopyToClipboardText from '@shell/components/CopyToClipboardText.vue'
  import Tabs from '../common/Tabs'
  import Details from './tabs/Details.vue'
  // import Runs from './tabs/Runs.vue'
  export default {
    name: 'Overview',
    components: {
      Tabs,
      Details,
      CopyToClipboardText
    },
    props: {
      detail: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        currentTab: 0, // Initial tab
        tabList: ['Overview', 'Node IP'],
      }
    },
    methods: {
      changeTab(tabIndex) {
        this.currentTab = tabIndex;
      },
    }
  }
</script>