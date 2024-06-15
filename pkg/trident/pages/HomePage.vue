<template>
  <div class="rebranded">
    <div class="row mb-20 full-width" style="align-items: center; justify-content: space-between;">
      <div class="col" style="text-align: center;">
        <img src="../assets/img/nowcom.jpeg" alt="NOWCOM" width="400" height="150">
      </div>
    </div>

    <div class="col span-12 pl-50 pr-50">
      <Banner
        data-testid="changelog-banner"
        color="info whats-new"
      >
        <div style="margin-right: auto;">
          {{ t('home.seeWhatsNew') }}
        </div>
        <router-link to="/Network/c/_/roadmap" class="hand"><span v-clean-html="t('home.whatsNewLink')" /></router-link>
      </Banner>
    </div>
    
    <div class="full-width">
      <K8STable />
      <Virtualization class="mt-40" />
    </div>

    <div class="mt-10">
      <cButton class="cbtn btn-primary" @click="fRequest.show = true">
        <i class="fa fa-star fa-pulse mr-10"></i> Make a wish!
      </cButton>
    </div>

    <Modal size="lg" v-if="fRequest.show">
      <template #header>
        <div class="row">
          <div style="margin-right: auto;">
            <h1 class="mb-0">
              <i class="fa fa-star fa-pulse mr-10"></i> Make a wish!
            </h1>
          </div>
          <div>
            <cButton class="btn-x-modal" @click="fRequest.show = false">
              <i class="x-icon fa fa-close fa-lg"></i>
            </cButton>
          </div>
        </div>
      </template>
      <template v-slot:content>
        <p class="mb-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit turpis luctus luctus condimentum. Cras sollicitudin consequat arcu, et auctor felis convallis vitae. Donec ultricies nibh eget ipsum rhoncus, non tristique tortor scelerisque. Mauris ut dapibus enim. Morbi ut eleifend velit. Sed sodales enim vel augue tincidunt aliquam. Suspendisse sollicitudin finibus nulla eu gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
        <WishForm />
      </template>
    </Modal>
  </div>
</template>

<script>
import cButton from '../components/common/Button'
import K8STable from '../components/home/k8s-table'
import Virtualization from '../components/home/virtualization'
import { Banner } from '@components/Banner';
import { getVendor } from '@shell/config/private-label';
import routeInit from '../mixins/init'
import Modal from '../components/common/Modal.vue';
import WishForm from '../components/forms/wish-form.vue';
export default {
  name: 'HomePage',
  mixins: [routeInit],
  components: {
    K8STable,
    Virtualization,
    cButton,
    Banner,
    Modal,
    WishForm
  },
  data() {
    return {
      vendor: getVendor(),
      fRequest: {
        show: false,
      }
    }
  },
  methods: {
    featureRequest() {
      this.fRequest.show = true
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
