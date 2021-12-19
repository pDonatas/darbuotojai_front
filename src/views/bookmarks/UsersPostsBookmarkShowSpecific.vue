<template>
<ShowSpecificUsersPostsBookmark></ShowSpecificUsersPostsBookmark>
</template>

<script>
import ShowSpecificUsersPostsBookmark from "../../components/Bookmark/ShowSpecificUsersPostsBookmark";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
export default {
  name: "UsersPostsBookmarkShowSpecific",
  components: {ShowSpecificUsersPostsBookmark, Header, Layout},
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