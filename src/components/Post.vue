<template>
  <div class="post">
    <router-link :to="'/posts/' + post.slug"><b-img blank blank-color="#abc" width="128" alt="placeholder"></b-img></router-link>
    <div class="heading">{{ post.title }}</div>
    <div class="sub-text">{{ post.subtext }}</div>
    <div v-if="edit">
      <b-button variant="danger" v-on:click="$router.push({name: 'Delete posts by category', params: {category: post.category, slug: post.slug}})">Delete</b-button>
      <b-button variant="warning" v-on:click="$router.push({name: 'Edit posts by category', params: {category: post.category, slug: post.slug}})">Edit</b-button>
      <b-button variant="primary" v-on:click="$router.push({name: 'View posts by category', params: {category: post.category, slug: post.slug}})">View</b-button>
    </div>
    <b-button variant="success" v-on:click="$router.push({name: 'PostOrderCreate', params: {slug: post.slug}})">Order</b-button>
  </div>
</template>

<script>
export default {
  name: "Post",

  props: {
    post: {
      slug: null,
      image: null,
      title: null,
      subtext: null
    },
    edit: false
  }
}
</script>

<style scoped>

</style>