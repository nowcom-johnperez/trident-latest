<template>
  <span class="hover-container">
    <a :href="value" target="_blank" rel="noopener noreferrer">
      <i class="fa fa-github fa-2x placholder-icon" v-clean-tooltip="tooltip" style="cursor: pointer;" ></i>
    </a>
  </span>
</template>

<script>
export default {
  name: 'GithubLink',
  props: {
    value: {
      type: String,
      required: true,
    }
  },
  computed: {
    tooltip() {
      return {
        content: this.value,
        hideOnTargetClick: false
      };
    }
  }
}
</script>