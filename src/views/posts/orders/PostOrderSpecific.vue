<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <SpecificPostOrder :data="this.order"></SpecificPostOrder>
    </Layout>
  </div>
</template>

<script>
import SpecificPostOrder from "../../../components/Order/PostOrder/SpecificPostOrder";
import Layout from "../../../components/Layout";
import OrderMixin from "../../../mixins/OrderMixin";
export default {
  name: "PostOrderSpecific",
  components: {SpecificPostOrder, Layout},
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
    this.order = await this.getPostOrderData(this.$route.params.id, this.$route.params.slug);
  }
}
</script>

<style scoped>

</style>