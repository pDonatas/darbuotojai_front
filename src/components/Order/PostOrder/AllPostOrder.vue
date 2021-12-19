<template>
  <div>
    <b-card bg-variant="light">
      <div class="form-group">
        <b-td class="align-content-center fw-bold" style="font-size: 20px"> Post Orders</b-td>
        <form>
          <div>
            <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Post" label-for="slug">
            <b-form-select class="form-control" style="width: 50%" id="slug" name="slug" v-model="slug">
              <b-form-select-option v-for="post in this.posts" :value="post.slug" :key="post.slug">{{ post.title }}</b-form-select-option>
            </b-form-select>
            </b-form-group>
          </div>
          <b-button variant="success" v-on:click="getPostOrders(slug)">Show</b-button>
        </form>
      </div>
    </b-card>
    <b-card bg-variant="light">
      <div v-if="showPostOrders && orders.length > 0" class="form-group">
        <table>
          <thead>
          <tr>
            <th>Id</th>
            <th> Requirements</th>
            <th> Ordered post </th>
            <th> Ordered post content</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="order in this.orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.requirement }}</td>
            <td>{{ order.service[0].title }}</td>
            <td>{{ order.service[0].content }}</td>
            <td>
              <b-button variant="info"> <router-link :to="{ name: 'PostOrderEdit', params:{id: order.id, slug: slug}}">Edit </router-link>  </b-button>
              <b-button variant="danger" v-on:click="deletePostOrder(slug, order.id)">Delete</b-button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>

<script>
import constants from "../../../constants";
import {mapGetters} from "vuex";
import Swal from "sweetalert2";

export default {
  name: "AllPostOrder",
  data() {
    return {
      orders :[],
      posts:[],
      slug : null,
      showPostOrders : false
    }
  },

  created() {
    // Set a watcher on Vuex' mutations
    this.posts = this.$store.getters.getPosts;
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

  methods: {
    async getPostOrders(slug) {
      await this.$axios.get(constants.API_URL + '/posts/' + slug + '/orders').then(
          response => {
            this.orders = response.data.orders;
          })
      if(this.orders.length > 0)
      {
        this.showPostOrders = true;
        await Swal.fire({
          title: 'Success!',
          text: "You have successfully got orders",
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
      else{
        this.showPostOrders = false;
        await Swal.fire({
          title: 'Error!',
          text: "Orders don't exist",
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      }
    },
    deletePostOrder(slug, id) {
      this.$axios.delete(constants.API_URL + '/posts/' + slug + '/orders/' + id).then(
          response =>{
            Swal.fire({
              title: 'Success!',
              text: "You have successfully deleted an order",
              icon: 'success',
              confirmButtonText: 'Ok'
            })
            this.showPostOrders =false;
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