<template>
  <div>
    <b-card bg-variant="light">
      <div class="form-group">
        <form v-on:submit.prevent="updateUserPostBookmark()">
          <div>
            <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Post" label-for="post">
              <b-form-input class="form-control" style="width: 50%" id="post" name="post" type="number" v-model="post"/>
            </b-form-group>
          </div>
          <b-button variant="success" type="submit">Update</b-button>
          <b-button variant="danger" to="/users/posts/bookmarks">Cancel</b-button>
        </form>
      </div>
    </b-card>
  </div>
</template>

<script>
import constants from "../../constants";
import Swal from "sweetalert2";

export default {
  name: "UsersPostsBookmarkUpdateForm",
  data() {
    return {
      bookmark :
          {
            id: null,
            slug: null,
            user_id:null
          },
      post:null

    }
  },
  props: {
    data: {},
    view: false,
    create: false
  },
  watch: {
    data() {
      this.bookmark.id = this.data.id;
      this.bookmark.slug = this.data.slug;
      this.bookmark.user_id = this.data.user_id;
    }
  },
  methods: {
    updateUserPostBookmark() {
      this.$axios.patch(constants.API_URL + '/users/'+ this.bookmark.user_id +'/posts/'+ this.bookmark.slug +'/bookmarks/' + this.bookmark.id, this.post).then(
          (response) => {
            Swal.fire({
              title: 'Success!',
              text: "You have successfully updated an bookmark",
              icon: 'success',
              confirmButtonText: 'Ok',
            }).then((onConfirm) => {
              this.$router.push({name: 'UsersPostsBookmarksShowAll'});
            });
          }
      )
          .catch(function (error) {
            let message = "";
            if (error.response.data.errors !== undefined) {
              let fields = Object.values(error.response.data.errors);
              fields.forEach(function (field) {
                message += field += "\n";
              })
            } else if (error.response.data.error !== undefined) {
              message = error.response.data.error;
            }

            Swal.fire({
              title: 'Error!',
              text: message,
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          });
    }
  }
}
</script>

<style scoped>

</style>