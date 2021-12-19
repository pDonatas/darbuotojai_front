<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <AllUsersPostsBookmarks></AllUsersPostsBookmarks>
      <UsersPostsBookmarkShowSpecific></UsersPostsBookmarkShowSpecific>
    </Layout>
  </div>
</template>

<script>
import AllUsersPostsBookmarks from "../../components/Bookmark/AllUsersPostsBookmarks";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import UsersPostsBookmarkShowSpecific from "./UsersPostsBookmarkShowSpecific";
export default {
  name: "UsersPostsBookmarksShowAll",
  components: {UsersPostsBookmarkShowSpecific, Layout, Header,AllUsersPostsBookmarks},
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