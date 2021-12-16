<template>
  <div>
    <b-card bg-variant="light">
      <div class="form-group">
        <form v-on:submit.prevent="updateOrder">
          <div>
            <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Requirements" label-for="requirements">
              <b-form-input class="form-control" style="width: 50%" id="requirements" name="requirements" type="text" v-model="order.requirements"/>
            </b-form-group>
          </div>
            <b-button variant="success" type="submit">Update</b-button>
            <b-button variant="danger" to="/orders">Cancel</b-button>
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
      order :
          {
            id: null,
            requirements: null
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
      this.order.id = this.data.id;
      this.order.requirements = this.data.requirement;
    }
  },
  methods: {
    updateOrder() {
          this.$axios.patch(constants.API_URL + '/orders/' + this.order.id, this.order).then(
          (response) => {
            Swal.fire({
              title: 'Success!',
              text: "You have successfully updated an order",
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