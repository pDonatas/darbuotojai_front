<template>
  <div>
    <b-card bg-variant="light">
      <div v-if="this.orders.length > 0" class="form-group">
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
            <td>{{ order.service[0].title}}</td>
            <td>{{ order.service[0].content}}</td>
            <td>
              <b-button variant="info"> <router-link :to="{ name: 'EditOrder', params:{id: order.id}}">Edit </router-link>  </b-button>
              <b-button variant="danger" v-on:click="deleteOrder(order.id)">Delete</b-button>
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
  name: "AllOrders",
  data() {
    return {
      orders :[],
    }
  },
  mounted(){
    this.getOrders();
  },
  methods:{
    async getOrders(){
      await this.$axios.get(constants.API_URL + '/orders').then(
          response => {
            this.orders = response.data.orders;

          })
    },
    deleteOrder(id) {
      this.$axios.delete(constants.API_URL + '/orders/' + id).then(
          response =>{
            Swal.fire({
              title: 'Success!',
              text: "You have successfully deleted an order",
              icon: 'success',
              confirmButtonText: 'Ok'
            })
            this.getOrders();
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