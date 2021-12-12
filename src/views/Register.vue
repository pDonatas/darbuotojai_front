<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <RegisterForm></RegisterForm>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from '../components/Layout.vue'
import store from "../store";
import RegisterForm from "../components/RegisterForm";

export default {
  name: 'Login',
  components: {
    RegisterForm,
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
