<template>
  <div>
    <TopNav />

    <div class="pt-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopNav from '../components/TopNav'
export default {
  name: 'DefaultLayout',
  layout: 'plain',
  components: {
    TopNav
  },
  data() {
    return {
    }
  },
}
</script>