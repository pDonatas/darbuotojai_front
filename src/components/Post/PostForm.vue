<template>
  <form v-on:submit.prevent="createPost">
    <div class="form-group">
      <label for="title">Title</label>
      <input class="form-control" id="title" name="title" type="text" v-model="post.title"/>
    </div>
    <div class="form-group">
      <label for="content">Content</label>
      <textarea class="form-control" id="content" name="content" v-model="post.content"></textarea>
    </div>
    <div v-if="this.categories.length > 0" class="form-group">
      <label for="category">Category</label>
      <select class="form-control" id="category" name="category" v-model="post.category">
        <option v-for="category in this.categories" :value="category.id">{{ category.name }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <input class="form-control" id="price" name="price" type="number" step="0.01" v-model="post.price"/>
    </div>

    <input class="btn btn-primary" type="submit" value="Create" />
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import constants from "../../constants";
import Swal from "sweetalert2";
import axios from 'axios';

export default {
  name: "PostForm",
  data() {
    return {
      categories: [],
      post: {
        title: null,
        content: null,
        category: "0",
        price: 0
      }
    }
  },

  computed: {
    ...mapGetters(['getCategories'])
  },

  created() {
    // Set a watcher on Vuex' mutations
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      // Rehydrate the users when an updateUsers mutation was processed inside the Vuex module
      // Here, add your namespace if your module is namespaced : yourNamespace/updateUsers
      if (mutation.type === 'setCategories') {
        this.categories = this.getCategories;
      }
    });
  },

  beforeDestroy() {
    // Unsubscribe when the component is going to be destroyed
    this.unsubscribe();
  },

  methods: {
    createPost() {
      axios.post(constants.API_URL + '/posts', this.post).then(
          (response) => {
            Swal.fire({
              title: 'Success!',
              text: "You have successfully created a post",
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          }
      ).catch(function (error) {
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