<template>
  <div>
    <b-card bg-variant="light">
      <div class="form-group">
        <b-td class="align-content-center fw-bold" style="font-size: 20px"> Show Order</b-td>
        <form>
          <div>
            <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Id" label-for="id">
              <b-form-input class="form-control" style="width: 50%" id="id" name="id" type="number" v-model="id"/>
            </b-form-group>
          </div>
          <b-button variant="success" v-on:click="getOrder(id)">Show</b-button>
        </form>
      </div>
    </b-card>
    <b-card bg-variant="light">
    <div v-if="showOrder">
    <table>
      <thead>
      <tr>
        <th> Id</th>
        <th> Requirements</th>
        <th> Ordered post </th>
        <th> Ordered post content</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{ order.id }}</td>
        <td>{{ order.requirement }}</td>
        <td>{{ order.service[0].title}}</td>
        <td>{{ order.service[0].content}}</td>
      </tr>
      </tbody>
    </table>
    </div>
    </b-card>
  </div>
</template>

<script>
import constants from "../../constants";
import OrderMixin from "../../mixins/OrderMixin";
import Swal from "sweetalert2";

export default {
  name: "ShowSpecificOrder",
  mixins: [OrderMixin],
  data() {
    return {
      id:null,
      order : {
        id:null,
        requirement:null,
        service: [
            'title',
            'content'
            ]
      },
      showOrder : false,
    }
  },
  methods:{
    async getOrder(id){
      this.order=await this.getOrderData(id);
      if(this.order !=null){
        this.showOrder = true;
        await Swal.fire({
          title: 'Success!',
          text: "You have successfully got specific order",
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        }
        else{
        this.showOrder = false;
      }
      }
    }
}
</script>

<style scoped>

</style>