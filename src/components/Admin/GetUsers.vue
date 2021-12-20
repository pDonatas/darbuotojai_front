<template>
  <div>
    <b-card bg-variant="light">
      <div v-if="this.$store.getters.getUsers !== null && this.$store.getters.getUsers.length > 0" class="form-group">
        <b-td class="align-content-center fw-bold" style="font-size: 20px"> Users</b-td>
        <table>
          <thead>
          <tr>
            <th>Id</th>
            <th> Name</th>
            <th> Email </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <b-button variant="success" v-on:click="verifyUser(user.id)">Verify</b-button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import constants from "../../constants";
import Swal from "sweetalert2";
import {mapGetters} from "vuex";
import UserMixin from "../../mixins/UserMixin";

export default {
  name: "GetUsers",
  mixins:[UserMixin],
  data() {
    return {
      users :[],
    }
  },

  mounted() {
    /*if (this.$store.getters.getUsers == null) {
      this.users = this.getUsers()
    }*/

    this.users = this.$store.getters.getUsers;
  },

  beforeDestroy() {
    if (this.unsubscribe !== undefined) {
      this.unsubscribe();
    }
  },
  methods:{
    verifyUser(id) {
      axios.get(constants.API_URL + 'admin/verify/user/' + id).then(
          response =>{
            Swal.fire({
              title: 'Success!',
              text: "You have successfully verified a user",
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