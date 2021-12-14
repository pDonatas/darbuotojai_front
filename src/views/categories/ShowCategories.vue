<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      Categories
    </Layout>
  </div>
</template>

<script>
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";
import Layout from "../../components/Layout";

export default {
  name: "ShowCategories",
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

<style scoped>

</style>