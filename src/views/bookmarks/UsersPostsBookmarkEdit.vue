<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <UsersPostsBookmarkUpdateForm :data="this.bookmark"></UsersPostsBookmarkUpdateForm>
    </Layout>
  </div>
</template>

<script>
import UsersPostsBookmarkUpdateForm from "../../components/Bookmark/UsersPostsBookmarkUpdateForm";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import BookmarkMixin from "../../mixins/BookmarkMixin";
export default {
  name: "UsersPostsBookmarkEdit",
  components: {UsersPostsBookmarkUpdateForm, Header, Layout},
  mixins: [BookmarkMixin],
  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      },
      bookmark: {
        slug:null
      }
    }
  },
  async created() {
    this.bookmark = await this.getUsersPostsBookmarkData(this.$route.params.user_id,this.$route.params.slug, this.$route.params.id);
    this.bookmark.slug = this.$route.params.slug
  }
}
</script>

<style scoped>

</style>