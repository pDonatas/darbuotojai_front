<template>
  <div>
    <b-card bg-variant="light">
        <div v-if="this.categories.length > 0" class="form-group">
         <table>
           <thead>
           <tr>
             <th>Id</th>
             <th>Name</th>
           </tr>
           </thead>
           <tbody>
              <tr v-for="category in this.categories" :key="category.id">
                <td>{{ category.id }}</td>
                <td>{{ category.name }}</td>
              </tr>
           </tbody>
         </table>
        </div>
    </b-card>
  </div>
</template>

<script>
import constants from "../../constants";

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
      this.$axios.get(constants.API_URL + '/categories').then(
          response => {
            this.categories = response.data;
          })
  }
}
</script>

<style scoped>

</style>