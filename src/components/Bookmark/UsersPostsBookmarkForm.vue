<template>
  <div>
    <b-card bg-variant="light">
      <form v-on:submit.prevent="createUsersPostsBookmark(user.id,slug)">
        <b-td class="align-content-center fw-bold" style="font-size: 20px"> Create user post bookmark</b-td>
        <div v-if="this.users.length > 0">
          <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="User" label-for="user_id">
            <b-form-select class="form-control" style="width: 50%" id="user_id" name="user_id" v-model="user.id" >
              <b-form-select-option v-for="user in this.users" :value="user.id" :key="user.id">{{ user.name }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </div>
        <div v-if="this.posts.length > 0">
          <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Post" label-for="slug">
            <b-form-select class="form-control" style="width: 50%" id="slug" name="slug" v-model="slug">
              <b-form-select-option v-for="post in this.posts" :value="post.slug" :key="post.slug">{{ post.title }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </div>
        <input class="btn btn-primary" type="submit" value="Create bookmark" />
      </form>
    </b-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import constants from "../../constants";
import Swal from "sweetalert2";
import UserMixin from "../../mixins/UserMixin";

export default {
  name: "UsersPostsBookmarkForm",
  data() {
    return {
      posts: [],
      users : [],
      user:{
        id:null
      },
      slug:null
    }

  },
  mixins:[UserMixin],
  computed: {
    ...mapGetters(['getPosts'])
  },
  created() {
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
    this.$store.dispatch('fetchPosts');
    this.users = this.getUsers();
  },
  methods: {
    createUsersPostsBookmark(user_id,slug) {
      this.$axios.post(constants.API_URL + '/users/' + user_id + '/posts/' + slug + '/bookmarks').then(
          (response) => {
            Swal.fire({
              title: 'Success!',
              text: "You have successfully created a bookmark",
              icon: 'success',
              confirmButtonText: 'Ok'
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
  },
}
</script>

<style scoped>

</style>