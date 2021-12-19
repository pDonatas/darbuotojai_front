<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <UsersPostsBookmarkForm></UsersPostsBookmarkForm>
    </Layout>
  </div>
</template>

<script>
import UsersPostsBookmarkForm from "../../components/Bookmark/UsersPostsBookmarkForm";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
export default {
  name: "UsersPostsBookmarkCreate",
  components: {UsersPostsBookmarkForm, Layout, Header},
  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      }
    }
  },
}
</script>

<style scoped>

</style>