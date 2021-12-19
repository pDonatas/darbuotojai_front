<template>
  <div>
    <b-card bg-variant="light">
      <div class="form-group">
        <b-td class="align-content-center fw-bold" style="font-size: 20px"> Show Specific Post Order</b-td>
        <form>
          <div>
            <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Id" label-for="id">
              <b-form-input class="form-control" style="width: 50%" id="id" name="id" type="number" v-model="id"/>
            </b-form-group>
          </div>
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
          <b-button variant="success" v-on:click="getUserPostBookmark(user_id,slug,id)">Show</b-button>
        </form>
      </div>
    </b-card>
    <b-card bg-variant="light">
      <div v-if="showUsersPostsBookmarks" class="form-group">
        <table>
          <thead>
          <tr>
            <th>Id</th>
            <th> User </th>
            <th> Bookmarked post </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{ bookmark.id }}</td>
            <td>{{ bookmark.user_id }}</td>
            <td>{{ bookmark.post }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Swal from "sweetalert2";
import BookmarkMixin from "../../mixins/BookmarkMixin";
import UserMixin from "../../mixins/UserMixin";

export default {
  name: "ShowSpecificUsersPostsBookmark",
  mixins: [BookmarkMixin,UserMixin],
  data() {
    return {
      id:null,
      posts:[],
      users:[],
      slug:null,
      user_id:null,
      bookmark : {
        id:null,
        post:null,
        user_id: null
      },
      showUsersPostsBookmarks : false,
    }
  },
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
  methods:{
    async getUserPostBookmark(user_id,slug,id){
      this.bookmark=await this.getUsersPostsBookmarkData(user_id,slug,id);
      if(this.bookmark !=null){
        this.showUsersPostsBookmarks = true;
        await Swal.fire({
          title: 'Success!',
          text: "You have successfully got specific bookmark",
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
      else{
        this.showUsersPostsBookmarks = false;
      }
    }
  }
}
</script>

<style scoped>

</style>