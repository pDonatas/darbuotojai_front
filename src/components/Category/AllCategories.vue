<template>
  <div>
    <b-card bg-variant="light">
        <div v-if="this.categories.length > 0" class="form-group">
         <table>
           <thead>
           <tr>
             <th>Id</th>
             <th>Name</th>
             <th></th>
           </tr>
           </thead>
           <tbody>
              <tr v-for="category in this.categories" :key="category.id">
                <td>{{ category.id }}</td>
                <td>{{ category.name }}</td>
                <td>
                  <b-button variant="danger" v-on:click="deleteCategory(category.id)">Delete</b-button>
                  <b-button variant="primary" v-on:click="$router.push({name: 'Posts by category', params: {category: category.id}})">View posts</b-button>
                  <b-button variant="primary" v-on:click="$router.push({name: 'Create category posts', params: {category: category.id}})">Create post</b-button>
                </td>
              </tr>
           </tbody>
         </table>
        </div>
    </b-card>
  </div>
</template>

<script>
import constants from "../../constants";
import Swal from "sweetalert2";

export default {
  name: "AllCategories",
  data() {
    return {
      categories :[],

    }
  },
  /*computed: {
    ...mapGetters(['getCategories'])
  },
  created() {
    // Set a watcher on Vuex' mutations
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      // Rehydrate the users when an updateUsers mutation was processed inside the Vuex module
      // Here, add your namespace if your module is namespaced : yourNamespace/updateUsers
      if (mutation.type === 'setCategories') {
        this.posts = this.getCategories;
      }
    });
  },

  beforeDestroy() {
    // Unsubscribe when the component is going to be destroyed
    this.unsubscribe();
  },
  mounted() {
    this.$store.dispatch('fetchCategories');
  },*/
  mounted(){
      this.getCategories();
  },
  methods:{
    async getCategories(){
      await this.$axios.get(constants.API_URL + '/categories').then(
          response => {
            this.categories = response.data;
          })
    },
    deleteCategory(id) {
      this.$axios.delete(constants.API_URL + '/categories/' + id).then(
          response =>{
            Swal.fire({
              title: 'Success!',
              text: "You have successfully deleted a category",
              icon: 'success',
              confirmButtonText: 'Ok'
            })
            this.getCategories();
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