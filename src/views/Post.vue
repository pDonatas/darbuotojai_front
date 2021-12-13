<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      Posts
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from '../components/Layout.vue'
import store from "../store";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";

export default {
  name: 'Post',
  components: {
    Header,
    LoginForm,
    Layout
  },


  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      }
    }
  }
}
</script>
