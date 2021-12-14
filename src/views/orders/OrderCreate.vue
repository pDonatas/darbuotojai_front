<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <OrderForm></OrderForm>
    </Layout>
  </div>
</template>

<script>
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import OrderForm from "../../components/Order/OrderForm";

export default {
  name: "OrderCreate",
  components: {
    Header,
    OrderForm,
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
  }
}
</script>

<style scoped>

</style>