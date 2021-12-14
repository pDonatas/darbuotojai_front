<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <CategoryForm></CategoryForm>
    </Layout>
  </div>
</template>

<script>
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import CategoryForm from "../../components/Category/CategoryForm";

export default {
  name: "CategoryCreate",
  components: {
    Header,
    CategoryForm,
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