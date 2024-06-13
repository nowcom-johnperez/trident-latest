<template>
  <div class="rebranded">
    <div class="row mb-20 full-width" style="align-items: center; justify-content: space-between;">
      <div class="col" style="text-align: center;">
        <img src="../assets/img/nowcom.jpeg" alt="NOWCOM" width="400" height="150">
      </div>
    </div>
    
    <div class="full-width">
      <K8STable />
      <Virtualization class="mt-40" />
    </div>
  </div>
</template>

<script>
import cButton from '../components/common/Button'
import K8STable from '../components/home/k8s-table'
import Virtualization from '../components/home/virtualization'
import { getVendor } from '@shell/config/private-label';
import routeInit from '../mixins/init'
export default {
  name: 'HomePage',
  mixins: [routeInit],
  components: {
    K8STable,
    Virtualization,
    cButton,
  },
  data() {
    return {
      vendor: getVendor(),
    }
  },
  methods: {
    featureRequest() {
      console.log(`featureRequest`)
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: #007bff;
}

.rebranded {
  align-items: center;
}
</style>
