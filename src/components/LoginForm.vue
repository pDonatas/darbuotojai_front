<template>
  <div>
    <form v-on:submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">Email</label>
        <input class="form-control" id="email" name="email" type="email" v-model="user.email"/>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input class="form-control" id="password" name="password" type="password" v-model="user.password"/>
      </div>

      <input class="btn btn-primary" type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "LoginForm",
  data() {
    return {
      user: {
        email: null,
        password: null
      }
    }
  },

  methods: {
    loginUser: async function() {
      await this.$axios.post("http://localhost/api/login", this.user).then(
          (response) => {
            //Because we are getting only token we need to refetch data
            localStorage.setItem('token', response.data.token);

            this.$store.dispatch('fetchData');

            Swal.fire({
              title: 'Success!',
              text: "You have successfully logged in",
              icon: 'success',
              confirmButtonText: 'Ok'
            });

            this.$router.push('/');
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