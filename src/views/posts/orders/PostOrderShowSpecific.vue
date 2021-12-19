<template>
  <ShowSpecificPostOrder></ShowSpecificPostOrder>
</template>

<script>
import ShowSpecificPostOrder from "../../../components/Order/PostOrder/ShowSpecificPostOrder"
import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
export default {
  name: "PostOrderShowSpecific",
  components: {ShowSpecificPostOrder, Header, Layout},
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