<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <SpecificUsersPostsBookmark :data="this.bookmark"></SpecificUsersPostsBookmark>
    </Layout>
  </div>
</template>

<script>
import SpecificUsersPostsBookmark from "../../components/Bookmark/SpecificUsersPostsBookmark";
import Layout from "../../components/Layout";
import BookmarkMixin from "../../mixins/BookmarkMixin";
export default {
  name: "UsersPostsBookmarkSpecific",
  components: {SpecificUsersPostsBookmark,Layout},
  mixins:[BookmarkMixin],
  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      },
      bookmark: null
    }
  },

  async created() {
    this.bookmark = await this.getUsersPostsBookmarkData(this.$route.params.user_id, this.$route.params.slug, this.$route.params.id);
  }
}
</script>

<style scoped>

</style>