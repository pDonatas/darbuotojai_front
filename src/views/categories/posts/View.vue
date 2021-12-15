<template>
  <Layout :parameters="parameters">
    <PostForm :data="this.post" :view="true"></PostForm>
  </Layout>
</template>

<script>
import PostForm from "../../../components/Post/PostForm";
import Layout from "../../../components/Layout";
import PostMixin from "../../../mixins/PostMixin";

export default {
  name: "CategoryPostView",
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