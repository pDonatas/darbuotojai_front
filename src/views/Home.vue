<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <Post v-if="posts.length > 0" v-for="post in posts" :post="post" v-bind:key="post.id"></Post>
      <div v-if="posts.length === 0">
        There are no posts currently.
      </div>
      <router-link :to="{name: 'Create posts'}">Create new</router-link>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from '@/components/Layout.vue'
import Post from "../components/Post";
import constants from "../constants";
import {mapGetters} from "vuex";
import PostMixin from "../mixins/PostMixin";

export default {
  name: 'Home',
  components: {
    Post,
    Layout
  },
  mixins: [PostMixin],

  data() {
    return {
      parameters: {
        nav: true,
        head: true,
        icons: true,
        main: true,
        testimonials: true,
        callToAction: true,
        footer: true
      },

      posts: [],
    }
  },

  mounted() {
    this.$store.dispatch('fetchPosts');
  },

  async created() {
    this.posts = await this.getPosts();
  },
}
</script>
