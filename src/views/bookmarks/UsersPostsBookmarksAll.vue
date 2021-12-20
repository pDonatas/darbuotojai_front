<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <ShowAllUsersPostsBookmarks :data="this.bookmarks" :slug_data="this.slug"></ShowAllUsersPostsBookmarks>
    </Layout>
  </div>
</template>

<script>
import ShowAllUsersPostsBookmarks from "../../components/Bookmark/ShowAllUsersPostsBookmarks";
import Layout from "../../components/Layout";
import BookmarkMixin from "../../mixins/BookmarkMixin";
export default {
  name: "UsersPostsBookmarksAll",
  components: {ShowAllUsersPostsBookmarks, Layout},
  mixins:[BookmarkMixin],
  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      },
      bookmarks: [],
      slug:null
    }
  },

  async created() {
    this.bookmarks = await this.getUsersPostBookmarks(this.$route.params.user_id,this.$route.params.slug);
    this.slug = this.$route.params.slug;
  }

}
</script>

<style scoped>

</style>