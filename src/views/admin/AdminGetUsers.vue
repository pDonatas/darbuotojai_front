<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <GetUsers></GetUsers>
    </Layout>
  </div>
</template>

<script>
import GetUsers from "../../components/Admin/GetUsers";
import Layout from "../../components/Layout";
import UserMixin from "../../mixins/UserMixin";
export default {
  name: "AdminGetUsers",
  components: {GetUsers,Layout},
  mixins:[UserMixin],
  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      },
    }
  },
}
</script>

<style scoped>

</style>