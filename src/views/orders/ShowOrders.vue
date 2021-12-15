<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <AllOrders></AllOrders>
    </Layout>
  </div>
</template>

<script>
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import AllOrders from "../../components/Order/AllOrders";

export default {
  name: "Orders",
  components: {
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