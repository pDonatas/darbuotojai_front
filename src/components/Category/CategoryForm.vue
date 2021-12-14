<template>
  <div>
    <b-card bg-variant="light">
      <form v-on:submit.prevent="createCategory" ref="category_form">
        <div>
          <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Name" label-for="name">
            <b-form-input class="form-control" style="width: 50%" id="name" name="name" type="text" v-model="category.name"/>
          </b-form-group>
        </div>
        <input class="btn btn-primary" type="submit" value="Create category" />
      </form>
    </b-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import constants from "../../constants";

export default {
  name: "CategoryForm",
  data() {
    return {
      category: {
        name: null
      }
    }

  },
  methods: {
    createCategory: async function () {
      await this.$axios.post(constants.API_URL + '/categories', this.category).then(
          (response) => {
            Swal.fire({
              title: 'Success!',
              text: "You have successfully created a category",
              icon: 'success',
              confirmButtonText: 'Ok'
            });

            this.$refs.category_form.reset();
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