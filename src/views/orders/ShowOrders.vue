<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <AllOrders :data="this.orders"></AllOrders>
      <ShowSpecific></ShowSpecific>
    </Layout>
  </div>
</template>

<script>
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import AllOrders from "../../components/Order/AllOrders";
import ShowSpecific from "./ShowSpecific";
import OrderCreate from "./OrderCreate";
import OrderMixin from "../../mixins/OrderMixin";

export default {
  name: "Orders",
  components: {
    OrderCreate,
    ShowSpecific,
    AllOrders,
    Header,
    Layout
  },
  mixins:[OrderMixin],
  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      },
      orders:[]

    }
  },
  async created() {
    this.orders = await this.getOrders();
  }
}
</script>

<style scoped>

</style>