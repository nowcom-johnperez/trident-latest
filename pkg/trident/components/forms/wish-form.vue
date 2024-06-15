<template>
  <form class="mt-20" @submit.prevent="submitForm">
    <input type="text" v-model="subject" placeholder="What do you want?" class="mb-10">
    <textarea name="request" v-model="request" id="request-input" cols="30" rows="5" placeholder="Let us know in more detailed description"></textarea>
    <button type="submit" class="cbtn btn-primary full-width mt-10" :disabled="!request || loading">
      <span v-if="loading">
        <i class="fa fa-spinner fa-spin mr-10"></i> Sending...
      </span>
      <span v-else>Send</span>
    </button>
  </form>
</template>

<script>
import { wishService } from '../../services/api/wish';

export default {
  name: 'WishForm',
  data () {
    return {
      loading: false,
      subject: null,
      request: null
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/v3User']
    },
  },
  methods: {
    async submitForm() {
      if (!this.request) return
      try {
        this.loading = true
        const payload = {
          apiVersion: "packetlifter.dev/v1",
          kind: "MakeWish",
          metadata: {
            name: this.subject
          },
          spec: {
            name: this.subject,
            description: this.request,
          }
        };

        await wishService.makeAwish(payload);
        this.loading = false
        this.subject = null
        this.request = null
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    }
  }
}
</script>