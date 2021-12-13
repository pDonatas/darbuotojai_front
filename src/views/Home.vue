<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <Post v-if="posts.length > 0" v-for="post in posts" :post="post" v-bind:key="post.id"></Post>
      <div v-else>
        There are no posts currently. <router-link :to="{name: 'Create posts'}">Create new</router-link>
      </div>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from '@/components/Layout.vue'
import Post from "../components/Post";
import constants from "../constants";
import {mapGetters} from "vuex";

export default {
  name: 'Home',
  components: {
    Post,
    Layout
  },
  data() {
    return {
      posts: [],
      parameters: {
        nav: true,
        head: true,
        icons: true,
        main: true,
        testimonials: true,
        callToAction: true,
        footer: true
      }
    }
  },

  computed: {
    ...mapGetters(['getPosts'])
  },

  mounted() {
    this.$store.dispatch('fetchPosts');
  },

  created() {
    // Set a watcher on Vuex' mutations
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      // Rehydrate the users when an updateUsers mutation was processed inside the Vuex module
      // Here, add your namespace if your module is namespaced : yourNamespace/updateUsers
      if (mutation.type === 'setPosts') {
        this.posts = this.getPosts;
      }
    });
  },

  beforeDestroy() {
    // Unsubscribe when the component is going to be destroyed
    this.unsubscribe();
  },
}
</script>
