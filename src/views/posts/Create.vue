<template>
  <Layout :parameters="parameters">
    <PostForm :create="true"></PostForm>
  </Layout>
</template>

<script>
import Layout from "../../components/Layout";
import PostForm from "../../components/Post/PostForm";
export default {
  name: "PostCreate",
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