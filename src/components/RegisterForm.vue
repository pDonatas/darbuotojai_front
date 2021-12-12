<template>
  <div>
    <form v-on:submit.prevent="registerUser">
      <div class="form-group">
        <label for="name">Name</label>
        <input class="form-control" id="name" name="name" type="text" v-model="user.name"/>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input class="form-control" id="email" name="email" type="email" v-model="user.email"/>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input class="form-control" id="password" name="password" type="password" v-model="user.password"/>
      </div>

      <div class="form-group">
        <label for="confirm_password">Confirm password</label>
        <input class="form-control" id="confirm_password" name="confirm_password" type="password" v-model="user.confirm_password"/>
      </div>

      <input class="btn btn-primary" type="submit" value="Register" />
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
    registerUser: function() {
      axios.post("http://localhost/api/register", this.user).then(
          (response) => {
            this.$store.commit('setUser', response.data.user);

            Swal.fire({
              title: 'Success!',
              text: "You have successfully registered",
              icon: 'success',
              confirmButtonText: 'Ok'
            });

            this.$router.push('/');
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