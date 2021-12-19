<template>
  <div>
    <b-card bg-variant="light">
      <div class="form-group">
        <form v-on:submit.prevent="updateCategory">
          <div>
            <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Name" label-for="name">
              <b-form-input class="form-control" style="width: 50%" id="name" name="name" type="text" v-model="category.name"/>
            </b-form-group>
          </div>
          <b-button variant="success" type="submit">Update</b-button>
        </form>
      </div>
    </b-card>
  </div>
</template>

<script>
import constants from "../../constants";
import Swal from "sweetalert2";

export default {
  name: "UpdateForm",
  data() {
    return {
      category:
          {
            id: null,
            name: null
          }
    }
  },
  props: {
    data: {},
    view: false,
    create: false
  },
  watch: {
    data() {
      this.category.id = this.data.id;
      this.category.name = this.data.name;
    }
  },
  methods: {
    updateCategory() {
      console.log(this.category.id);
      this.$axios.patch(constants.API_URL + '/categories/' + this.category.id, this.category).then(
          (response) => {
            this.$store.dispatch('fetchCategories');
            Swal.fire({
              title: 'Success!',
              text: "You have successfully updated a category",
              icon: 'success',
              confirmButtonText: 'Ok'
            });
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