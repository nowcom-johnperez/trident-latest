<template>
  <span class="hover-container">
    <GithubLink v-if="value && value.length > 0" :value="favoriteUrl" class="mr-10" />
    <ButtonDropDown
      :dropdown-options="value"
      title="Github"
      @click-action="openLink"
    />
  </span>
</template>

<script>
import ButtonDropDown from './ButtonDropdown.vue';
import GithubLink from './GithubLink.vue'
export default {
  name: 'GithubDropdown',
  props: {
    value: {
      type: Array,
      required: true,
    },
    github: {
      type: Object,
      required: true
    },
    favorites: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      favoriteUrl: this.value[0],
    }
  },
  components: {
    ButtonDropDown,
    GithubLink
  },
  computed: {
    tooltip() {
      return {
        content: this.value,
        hideOnTargetClick: false
      };
    },
  },
  watch: {
    favorites () {
      this.initFavorite()
    }
  },
  methods: {
    initFavorite () {
      const f = this.favorites.find((fav) => fav.id === this.github.id)
      if (f) this.favoriteUrl = f.url
    },
    openLink(option) {
      const fav = {
        id: this.github.id,
        url: option
      }
      this.favoriteUrl = option
      this.$emit('set-favorite', fav)
      window.open(option, '_blank');
    },
  },
  mounted() {
    this.initFavorite()
  }
}
</script>