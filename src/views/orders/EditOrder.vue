<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <UpdateForm :data="this.order"></UpdateForm>
    </Layout>
  </div>
</template>

<script>
import UpdateForm from "../../components/Order/UpdateForm";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import OrderMixin from "../../mixins/OrderMixin";
export default {
  name: "EditOrder",
  components: {
    Header,
    UpdateForm,
    Layout},
  mixins: [OrderMixin],
    data() {
      return {
        parameters: {
          nav: true,
          main: true,
          footer: true
        },
        order : null
      }
    },
    async created() {
      this.order = await this.getOrderData(this.$route.params.id);
    }
}
</script>

<style scoped>

</style>