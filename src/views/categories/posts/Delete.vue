<template>
  <Layout :parameters="parameters">
    <PostForm></PostForm>
  </Layout>
</template>

<script>
import PostForm from "../../../components/Post/PostForm";
import Layout from "../../../components/Layout";
import PostMixin from "../../../mixins/PostMixin";

export default {
  name: "CategoryPostDelete",
  components: {PostForm, Layout},
  mixins: [PostMixin],

  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      }
    }
  },

  async mounted() {
    this.post = await this.getPostData(this.$route.params.slug);
    if (this.post === undefined || this.post.user_id !== this.$store.getters.user.id) {
      await this.$router.push('/');
    }

    await this.removePost(this.$route.params.slug);
  }
}
</script>

<style scoped>

</style>