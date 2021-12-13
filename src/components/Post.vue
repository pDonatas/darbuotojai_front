<template>
  <div class="post">
    <router-link :to="'/posts/' + post.slug"><img :src="post.image" :alt="post.title" class="img-thumbnail"></router-link>
    <div class="heading">{{ post.title }}</div>
    <div class="sub-text">{{ post.subtext }}</div>
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
    }
  }
}
</script>

<style scoped>

</style>