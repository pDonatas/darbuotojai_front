<template>
  <Layout :parameters="parameters">
    <Post v-if="posts.length > 0" v-for="post in posts" :post="post" :edit="post.user_id === $store.getters.user.id" v-bind:key="post.id"></Post>
  </Layout>
</template>

<script>
import PostForm from "../../../components/Post/PostForm";
import Layout from "../../../components/Layout";
import PostMixin from "../../../mixins/PostMixin";
import Post from "../../../components/Post";

export default {
  name: "CategoryPostIndex",
  components: {Post, PostForm, Layout},
  mixins: [PostMixin],

  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      },

      posts: null,
    }
  },

  async created() {
    this.posts = await this.fetchPostsByCategory(this.$route.params.category);
  }
}
</script>

<style scoped>

</style>