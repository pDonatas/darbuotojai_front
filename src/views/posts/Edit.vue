<template>
  <Layout :parameters="parameters">
    <PostForm :pre-post="this.post"></PostForm>
  </Layout>
</template>

<script>
import Layout from "../../components/Layout";
import PostForm from "../../components/Post/PostForm";
import PostMixin from "../../mixins/PostMixin";

export default {
  name: "PostEdit",
  components: {PostForm, Layout},
  mixins: [PostMixin],

  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      },

      post: null,
    }
  },

  async created() {
    this.post = await this.getPostData(this.$route.params.slug);
  }
}
</script>

<style scoped>

</style>