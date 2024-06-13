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
          <!-- Runs -->
          <Runs />
        </div>

        <div class="tab-content" :class="{ 'show': currentTab === 2 }">
          <!-- Audit Log -->
          <p>Audit Log</p>
        </div>
    </div>
  </div>
</template>

<script>
  import Tabs from '../common/Tabs'
  import Details from './tabs/Details.vue'
  import Runs from './tabs/Runs.vue'
  export default {
    name: 'Overview',
    components: {
      Tabs,
      Details,
      Runs
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
        tabList: ['Overview', 'Runs', 'Audit Log'],
      }
    },
    methods: {
      changeTab(tabIndex) {
        this.currentTab = tabIndex;
      },
    }
  }
</script>