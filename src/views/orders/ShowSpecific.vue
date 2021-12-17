<template>
  <ShowSpecificOrder></ShowSpecificOrder>
</template>

<script>
import ShowSpecificOrder from "../../components/Order/ShowSpecificOrder";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
export default {
  name: "ShowSpecific",
  components: {
    Header,
    ShowSpecificOrder,
    Layout},
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