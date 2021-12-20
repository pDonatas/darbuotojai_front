<template>
<div>
  <b-card bg-variant="light">
    <div v-if="bookmarks.length > 0" class="form-group">
      <table>
        <thead>
        <tr>
          <th>Id</th>
          <th>User</th>
          <th>Bookmarked post</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="bookmark in this.bookmarks" :key="bookmark.id" >
          <td>{{ bookmark.id }}</td>
          <td>{{ bookmark.user_id }}</td>
          <td>{{ bookmark.post }}</td>
          <td>
            <!--<b-button variant="info"> <router-link :to="{ name: 'UsersPostsBookmarkEdit', params:{id: bookmark.id, slug: slug, user_id: bookmark.user_id}}">Edit </router-link>  </b-button>-->
          <b-button variant="danger" v-on:click="deleteUsersPostsBookmarks(bookmark.user_id,slug, bookmark.id)">Delete</b-button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </b-card>
</div>
</template>

<script>
import UserMixin from "../../mixins/UserMixin";
import constants from "../../constants";
import Swal from "sweetalert2";
import BookmarkMixin from "../../mixins/BookmarkMixin";

export default {
  name: "ShowAllUsersPostsBookmarks",
  data() {
    return {
      bookmarks:[],
      slug:null
    }
  },
  props: {
    data: {},
    view: false,
    create: false,
    slug_data: null
  },
  watch: {
    data() {
      this.bookmarks = this.data;
      this.slug = this.slug_data;
    }
  },
  methods:{
    deleteUsersPostsBookmarks(user_id,slug, id) {
      this.$axios.delete(constants.API_URL + '/users/'+ user_id + '/posts/' + slug + '/bookmarks/' + id).then(
          response =>{
            Swal.fire({
              title: 'Success!',
              text: "You have successfully deleted a bookmark",
              icon: 'success',
              confirmButtonText: 'Ok'
            })
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
    },
  }
}
</script>

<style scoped>

</style>