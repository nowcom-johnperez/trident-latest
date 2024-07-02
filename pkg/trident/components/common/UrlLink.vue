<template>
  <span v-clean-tooltip="tooltip" class="hover-container">
      <router-link :to="url" target="_blank" rel="noopener noreferrer" class="underline">
        <slot></slot>
      </router-link>
  </span>
</template>

<script>
export default {
  name: 'IconLink',
  props: {
      url: {
          type: String,
          required: true,
      }
  },
  computed: {
      tooltip() {
          return {
              content: this.url,
              hideOnTargetClick: false
          };
      }
  }
}
</script>

<style lang="scss" scoped>
.underline {
  text-decoration: underline;
}
</style>