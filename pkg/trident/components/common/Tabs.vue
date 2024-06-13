<template>
  <div class="tabs">
      <button v-for="(tab, index) in list" :key="index" class="tab" :class="{ 'active': current === index }" @click="setActive(index)">{{ tab }}</button>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
      list: {
          type: Array,
          required: true
      },
      current: {
          type: Number,
          required: true
      }
  },
  methods: {
      setActive(index) {
          this.$emit('set-active', index)
      }
  }
}
</script>