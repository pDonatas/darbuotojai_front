<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <ShowAllPostOrders :data="this.orders"></ShowAllPostOrders>
    </Layout>
  </div>
</template>

<script>
import Layout from "../../../components/Layout";
import ShowAllPostOrders from "../../../components/Order/PostOrder/ShowAllPostOrders";
import OrderMixin from "../../../mixins/OrderMixin";
export default {
  name: "PostOrderAll",
  components: {ShowAllPostOrders,Layout},
  mixins:[OrderMixin],
  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      },
      orders: []
    }
  },

  async created() {
    this.orders = await this.getPostOrders(this.$route.params.slug);
  }
}
</script>

<style scoped>

</style>