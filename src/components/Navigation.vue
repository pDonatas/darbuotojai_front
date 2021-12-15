<template>
  <!-- Navigation-->
  <b-navbar type="light" variant="light">
  <b-navbar-nav class="navbar navbar-light bg-light static-top" >
    <div class="container">
      <b-nav-item><router-link to="/">Home</router-link> </b-nav-item>
      <b-nav-item><router-link v-if="$store.state.user.email === null" to="/login">Login</router-link></b-nav-item>
      <b-nav-item><router-link v-if="$store.state.user.email === null" to="/register">Register</router-link></b-nav-item>
      <b-nav-item><router-link v-if="$store.state.user.email !== null" to="/logout">Logout</router-link></b-nav-item>
      <b-nav-item-dropdown text="Orders">
        <b-nav-item> <router-link :to="{name: 'OrderCreate' }">Create order</router-link> </b-nav-item>
        <b-nav-item> <router-link :to="{name: 'Orders' }">Show orders</router-link> </b-nav-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Categories">
        <b-nav-item> <router-link to="/categories/create">Create category</router-link> </b-nav-item>
        <b-nav-item> <router-link to="/categories">Show categories</router-link> </b-nav-item>
      </b-nav-item-dropdown>
    </div>
  </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "Navigation"
}
</script>

<style scoped>

</style>