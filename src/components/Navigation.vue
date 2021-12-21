<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="/">Workers system</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="nav-link" :to="{name: 'Home'}">Home</b-nav-item>
          <b-nav-item class="nav-link" v-if="$store.state.user.email === null" :to="{ name: 'Login'}">Login</b-nav-item>
          <b-nav-item class="nav-link" v-if="$store.state.user.email === null" :to="{ name: 'Register'}">Register</b-nav-item>
          <b-nav-item class="nav-link" v-if="$store.state.user.email !== null" :to="{ name: 'Logout' }">Logout</b-nav-item>
          <b-nav-item-dropdown class="nav-link" v-if="$store.state.user.type > 0" text="Orders">
            <b-nav-item class="nav-link" :to="{name: 'OrderCreate' }">Create order</b-nav-item>
            <b-nav-item class="nav-link" :to="{name: 'Orders' }">Show orders </b-nav-item>
            <b-nav-item class="nav-link" :to="{name: 'PostOrderShowAll' }">Show post orders</b-nav-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown class="nav-link" v-if="$store.state.user.type > 0" text="Categories">
            <b-nav-item class="nav-link" to="/categories/create">Create category</b-nav-item>
            <b-nav-item class="nav-link" to="/categories">Show categories </b-nav-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown class="nav-link" v-if="$store.state.user.type > 0" text="Bookmarks">
            <b-nav-item class="nav-link" :to="{name: 'UsersPostsBookmarkCreate' }">Create user post bookmark</b-nav-item>
            <b-nav-item class="nav-link" :to="{name: 'UsersPostsBookmarksShowAll' }">Show user post bookmarks</b-nav-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown class="nav-link" v-if="$store.state.user.type === 2" text="Admin">
            <b-nav-item class="nav-link" :to="{name: 'AdminGetUsers' }">Verified and waiting users</b-nav-item>
          </b-nav-item-dropdown>
            <b-nav-item class="nav-link disabled"v-if="$store.state.user.type >= 0">Current user: {{$store.state.user.name}}</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navigation"
}
</script>

<style scoped>

</style>