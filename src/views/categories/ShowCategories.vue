<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <AllCategories></AllCategories>
    </Layout>
  </div>
</template>

<script>
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import AllCategories from "../../components/Category/AllCategories";

export default {
  name: "ShowCategories",
  components: {
    Header,
    AllCategories,
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