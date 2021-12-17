<template>
  <b-card>
    <b-media tag="li" style="text-align: left;">
      <template #aside>
        <b-img blank blank-color="#abc" width="64" alt="placeholder"></b-img>
      </template>
      <h5 class="mt-0 mb-1">{{ vote.user.name }} {{ vote.vote }} stars</h5>
      <div v-if="vote.user.id === this.$store.getters.user.id" style="float: right">
        <b-button variant="danger" v-on:click="deleteVote(vote, post)">Delete</b-button>

        <b-button variant="primary" v-b-modal="'post-vote' + vote.id">Edit</b-button>

        <b-modal :id="'post-vote' + vote.id" centered title="Vote for post">
          <b-form-rating variant="success" v-model="vote.vote"></b-form-rating>
          <b-textarea class="form-control" v-model="vote.comment" placeholder="Comment"></b-textarea>
          <template #modal-footer>
            <div class="w-100">
              <b-button
                  variant="success"
                  size="sm"
                  class="float-right"
                  @click="editVote(vote, post)"
              >
                Submit vote
              </b-button>
            </div>
          </template>
        </b-modal>
      </div>
      <p class="mb-0">
        {{ vote.comment }}
      </p>
    </b-media>
  </b-card>
</template>

<script>
import VotesMixin from "../../mixins/VotesMixin";

export default {
  name: "Vote",
  props: {
    vote: {
      vote: 0,
      comment: '',
      user: {
        id: 0
      }
    },
    post: {
      id: 0
    }
  },
  mixins: [VotesMixin]
}
</script>

<style scoped>

</style>