<template>
  <Layout :parameters="parameters">
    <PostForm :create="true" :pre-category="$route.params.category"></PostForm>
  </Layout>
</template>

<script>

import PostForm from "../../../components/Post/PostForm";
import Layout from "../../../components/Layout";

export default {
  name: "CategoryPostCreate",
  components: {PostForm, Layout},

  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      }
    }
  },

  mounted() {
    this.$store.dispatch('fetchCategories');
  }
}
</script>

<style scoped>

</style>