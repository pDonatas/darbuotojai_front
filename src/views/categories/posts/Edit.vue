<template>
  <Layout :parameters="parameters">
    <PostForm :data="this.post" :pre-category="this.$route.params.category"></PostForm>
  </Layout>
</template>

<script>
import PostForm from "../../../components/Post/PostForm";
import Layout from "../../../components/Layout";
import PostMixin from "../../../mixins/PostMixin";
import CategoryMixin from "../../../mixins/CategoryMixin";

export default {
  name: "CategoryPostEdit",
  components: {PostForm, Layout},
  mixins: [PostMixin, CategoryMixin],

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
    this.category = await this.getCategoryData(this.$route.params.category);
    this.post = await this.getPostData(this.$route.params.slug);
  }
}
</script>

<style scoped>

</style>