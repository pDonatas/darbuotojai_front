<template>
  <div class="home">
    <Layout :parameters="this.parameters">
     <PostOrderForm :slug="this.slug"></PostOrderForm>
    </Layout>
  </div>
</template>

<script>
import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
import PostOrderForm from "../../../components/Order/PostOrder/PostOrderForm";

export default {
  name: "PostOrderCreate",
  components: {
    PostOrderForm,
    Header,
    Layout
  },
  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      },
      slug:null
    }
  },
  created() {
    this.slug = this.$route.params.slug;
  }
}
</script>

<style scoped>

</style>