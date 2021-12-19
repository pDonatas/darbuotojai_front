<template>
  <div>
    <b-card bg-variant="light">
      <div class="form-group">
        <b-td class="align-content-center fw-bold" style="font-size: 20px"> User Post Bookmarks</b-td>
        <form>
          <div v-if="this.users.length > 0">
            <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="User" label-for="user_id">
              <b-form-select class="form-control" style="width: 50%" id="user_id" name="user_id" v-model="user_id" >
                <b-form-select-option v-for="user in this.users" :value="user.id" :key="user.id">{{ user.name }}</b-form-select-option>
              </b-form-select>
            </b-form-group>
          </div>
          <div>
            <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Post" label-for="slug">
              <b-form-select class="form-control" style="width: 50%" id="slug" name="slug" v-model="slug">
                <b-form-select-option v-for="post in this.posts" :value="post.slug" :key="post.slug">{{ post.title }}</b-form-select-option>
              </b-form-select>
            </b-form-group>
          </div>
          <b-button variant="success" v-on:click="getUsersPostBookmarks(user_id,slug)">Show</b-button>
        </form>
      </div>
    </b-card>
    <b-card bg-variant="light">
      <div v-if="showUsersPostsBookmarks && bookmarks.length > 0" class="form-group">
        <table>
          <thead>
          <tr>
            <th>Id</th>
            <th> User </th>
            <th> Bookmarked post </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="bookmark in this.bookmarks" :key="bookmark.id" >
            <td>{{ bookmark.id }}</td>
            <td>{{ bookmark.user_id }}</td>
            <td>{{ bookmark.post }}</td>
            <td>
             <!-- <b-button variant="info"> <router-link :to="{ name: 'UsersPostsBookmarkEdit', params:{id: bookmark.id, slug: slug, user_id: bookmark.user_id}}">Edit </router-link>-->  </b-button>
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
import {mapGetters} from "vuex";
import UserMixin from "../../mixins/UserMixin";
import constants from "../../constants";
import Swal from "sweetalert2";

export default {
  name: "AllUsersPostsBookmarks",
  data() {
    return {
      users :[],
      posts:[],
      bookmarks:[],
      slug : null,
      user_id:null,
      showUsersPostsBookmarks : false
    }
  },
  mixins:[UserMixin],

  created() {
    this.posts = this.$store.getters.getPosts;
    // Set a watcher on Vuex' mutations
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      // Rehydrate the users when an updateUsers mutation was processed inside the Vuex module
      // Here, add your namespace if your module is namespaced : yourNamespace/updateUsers
      if (mutation.type === 'setPosts') {
        this.posts = this.getPosts;
      }
    });
  },

  beforeDestroy() {
    // Unsubscribe when the component is going to be destroyed
    this.unsubscribe();
  },
  mounted() {
    if (this.$store.getters.getUsers == null) {
      this.users = this.getUsers()
    }

    this.users = this.$store.getters.getUsers;
  },
  methods: {
    async getUsersPostBookmarks(user_id, slug) {
      await this.$axios.get(constants.API_URL + '/users/'+ user_id +'/posts/' + slug + '/bookmarks').then(
          response => {
            this.bookmarks = response.data;
          })
      if(this.bookmarks.length > 0)
      {
        this.showUsersPostsBookmarks = true;
        await Swal.fire({
          title: 'Success!',
          text: "You have successfully got bookmarks",
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
      else{
        this.showUsersPostsBookmarks = false;
        await Swal.fire({
          title: 'Error!',
          text: "Bookmarks don't exist",
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      }
    },
    deleteUsersPostsBookmarks(user_id,slug, id) {
      this.$axios.delete(constants.API_URL + '/users/'+ user_id + '/posts/' + slug + '/bookmarks/' + id).then(
          response =>{
            Swal.fire({
              title: 'Success!',
              text: "You have successfully deleted a bookmark",
              icon: 'success',
              confirmButtonText: 'Ok'
            })
            this.showUsersPostsBookmarks =false;
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