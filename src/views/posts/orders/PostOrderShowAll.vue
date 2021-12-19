<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <AllPostOrder></AllPostOrder>
      <PostOrderShowSpecific></PostOrderShowSpecific>
    </Layout>
  </div>
</template>

<script>
import AllPostOrder from "../../../components/Order/PostOrder/AllPostOrder";
import PostOrderShowSpecific from "./PostOrderShowSpecific";
import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
export default {
  name: "PostOrderShowAll",
  components: {Header, Layout,PostOrderShowSpecific, AllPostOrder},
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