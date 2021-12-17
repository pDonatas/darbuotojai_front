<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <AllOrders></AllOrders>
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

export default {
  name: "Orders",
  components: {
    OrderCreate,
    ShowSpecific,
    AllOrders,
    Header,
    Layout
  },
  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      }

    }
  },

}
</script>

<style scoped>

</style>