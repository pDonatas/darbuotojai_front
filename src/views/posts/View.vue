<template>
  <Layout :parameters="parameters">
    <PostForm :data="this.post" :view="true"></PostForm>
    <template v-slot:subcontent><ul class="list-unstyled"><Vote v-for="vote in votes" :post="post" :vote="vote" :key="vote.id"></Vote></ul></template>
  </Layout>
</template>

<script>
import Layout from "../../components/Layout";
import PostForm from "../../components/Post/PostForm";
import PostMixin from "../../mixins/PostMixin";
import Vote from "../../components/Vote/Vote";
import VotesMixin from "../../mixins/VotesMixin";

export default {
  name: "PostView",
  components: {Vote, PostForm, Layout},
  mixins: [PostMixin, VotesMixin],

  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      },

      post: null,
      votes: [],
    }
  },

  async created() {
    this.post = await this.getPostData(this.$route.params.slug);
    this.votes = await this.getPostVotes(this.post);
  }
}
</script>

<style scoped>

</style>