<template>
  <div class="runs-container">
    <div class="runs-right">
      <cButton class="cbtn btn-light">
        <span class="fa fa-github fa-lg mr-5"></span> Connect to GitHub
      </cButton>
    </div>
    
  </div>
</template>

<script>
import cButton from '../../common/Button.vue'
export default {
  name: 'Runs',
  components: {
    cButton
  }
}
</script>

<style lang="scss" scoped>
  .runs-container {
    .runs-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
</style>