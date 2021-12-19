<template>
  <div>
    <b-card bg-variant="light">
      <form v-on:submit.prevent="createPostOrder(slug)">
        <b-td class="align-content-center fw-bold" style="font-size: 20px"> Create post order</b-td>
        <div>
          <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Requirements" label-for="requirements">
            <b-form-input class="form-control" style="width: 50%" id="requirements" name="requirements" type="text" v-model="order.requirements"/>
          </b-form-group>
        </div>
        <input class="btn btn-primary" type="submit" value="Create order" />
      </form>
    </b-card>
  </div>
</template>

<script>
import constants from "../../../constants";
import Swal from "sweetalert2";

export default {
  name: "PostOrderForm",
  data() {
    return {
      order: {
        requirements: null
      },
      slug: null,
    }

  },
  props: {
    slug: {},
    view: false,
    create: false
  },
  watch: {
    data() {
      this.slug = this.slug.slug;
    }
  },
  methods: {
    createPostOrder(slug) {
      this.$axios.post(constants.API_URL + '/posts/' + slug +'/orders', this.order).then(
          (response) => {
            Swal.fire({
              title: 'Success!',
              text: "You have successfully created an order",
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((onConfirm) => {
              this.$router.push({name: 'PostOrderShowAll'});
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
  },
}
</script>

<style scoped>

</style>