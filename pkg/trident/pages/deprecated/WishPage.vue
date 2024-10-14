<template>
  <div>
    <h1>Make a wish</h1>
    <p class="mb-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit turpis luctus luctus condimentum. Cras sollicitudin consequat arcu, et auctor felis convallis vitae. Donec ultricies nibh eget ipsum rhoncus, non tristique tortor scelerisque. Mauris ut dapibus enim. Morbi ut eleifend velit. Sed sodales enim vel augue tincidunt aliquam. Suspendisse sollicitudin finibus nulla eu gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
    <p>Cras vulputate finibus neque, nec maximus dolor varius quis. Nulla blandit congue enim, pellentesque sodales diam eleifend non. Sed imperdiet ultrices eros, non sagittis velit faucibus a. Vestibulum tempus eleifend quam et maximus. Ut vel urna non metus fermentum egestas. Maecenas nec luctus purus. Ut eget viverra mi, quis consequat dui.</p>

    <form class="mt-20" @submit.prevent="submitForm">
      <textarea name="request" v-model="request" id="request-input" cols="30" rows="15"></textarea>
      <button type="submit" class="cbtn btn-primary full-width mt-10">Send</button>
    </form>
  </div>
</template>

<script>
import routeInit from '../../mixins/init'
export default {
  name: 'WishPage',
  mixins: [routeInit],
  data () {
    return {
      request: null
    }
  },
  methods: {
    submitForm() {
      console.log(`submit`)
    }
  }
}
</script>