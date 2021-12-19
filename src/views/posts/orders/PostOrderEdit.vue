<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <PostOrderUpdateForm :data="this.order"></PostOrderUpdateForm>
    </Layout>
  </div>
</template>

<script>
import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
import PostOrderUpdateForm from "../../../components/Order/PostOrder/PostOrderUpdateForm";
import OrderMixin from "../../../mixins/OrderMixin";

export default {
  name: "PostOrderEdit",
  components: {Header, Layout, PostOrderUpdateForm},
  mixins: [OrderMixin],
  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      },
      order:{
        slug:null
      }
    }
  },
  async created() {
    this.order = await this.getPostOrderData(this.$route.params.id, this.$route.params.slug);
    this.order.slug = this.$route.params.slug;
    console.log(this.order.slug)
  }
}
</script>

<style scoped>

</style>