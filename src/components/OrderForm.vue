<template>
  <div>
    <form v-on:submit.prevent="createOrder">
      <div class="form-group">
        <label for="requirements">Requirements</label>
        <input class="form-control" id="requirements" name="requirements" type="text" v-model="order.requirements"/>
      </div>
      <!--
      <div class="form-group">
        <label for="slug">Slug</label>
        <input class="form-control" id="slug" name="slug" type="text" v-model="order.slug"/>
      </div>
      -->

      <div v-if="this.posts.length > 0" class="form-group">
        <label for="slug">Post</label>
        <select class="form-control" id="slug" name="slug" v-model="order.slug">
          <option v-for="post in this.posts" :value="post.slug">{{ post.title }}</option>
        </select>
      </div>
      <input class="btn btn-primary" type="submit" value="Create order" />
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import constants from "../constants";
import {mapGetters} from "vuex";

export default {
  name: "OrderForm",
  data() {
    return {
      posts:[],
      order: {
        requirements: null,
        slug: null
      }
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
  },
  methods:{
    createOrder: async function() {
      await this.$axios.post(constants.API_URL + '/orders', this.order).then(
          (response) => {


            Swal.fire({
              title: 'Success!',
              text: "You have successfully created an order",
              icon: 'success',
              confirmButtonText: 'Ok'
            });

            this.order = "";

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