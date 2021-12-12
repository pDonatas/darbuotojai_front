<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <LoginForm></LoginForm>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from '../components/Layout.vue'
import store from "../store";
import LoginForm from "../components/LoginForm";

export default {
  name: 'Login',
  components: {
    LoginForm,
    Layout
  },

  mounted() {
    if (localStorage.getItem('token') !== null) {
      this.$router.push('/');
    }
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
