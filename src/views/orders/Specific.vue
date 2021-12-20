<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <SpecificOrder :data="this.order"></SpecificOrder>
    </Layout>
  </div>
</template>

<script>
import Layout from "../../components/Layout";
import OrderMixin from "../../mixins/OrderMixin";
import SpecificOrder from "../../components/Order/SpecificOrder";

export default {
  name: "Specific",
  components: {SpecificOrder,Layout},
  mixins:[OrderMixin],
  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      },
      order: null
    }
  },

  async created() {
    this.order = await this.getOrderData(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>