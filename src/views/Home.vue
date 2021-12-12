<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <img alt="Vue logo" src="../assets/logo.png">
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from '@/components/Layout.vue'

export default {
  name: 'Home',
  components: {
    Layout
  },
  data() {
    return {
      parameters: {
        nav: true,
        head: true,
        icons: true,
        main: true,
        testimonials: true,
        callToAction: true,
        footer: true
      }
    }
  }
}
</script>
