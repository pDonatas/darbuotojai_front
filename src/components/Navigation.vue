<template>
  <!-- Navigation-->
  <nav class="navbar navbar-light bg-light static-top">
    <div class="container">
      <router-link to="/">Home</router-link>
      <router-link v-if="$store.state.user.email === null" to="/login">Login</router-link>
      <router-link v-if="$store.state.user.email === null" to="/register">Register</router-link>
      <router-link v-if="$store.state.user.email !== null" to="/logout">Logout</router-link>
      <router-link to="/posts">Posts</router-link>
      <router-link to="/orders">Orders</router-link>
      <router-link to="/categories">Categories</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation"
}
</script>

<style scoped>

</style>