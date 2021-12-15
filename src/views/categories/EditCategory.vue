<template>
  <div class="home">
    <Layout :parameters="this.parameters">
      <UpdateForm :data="this.category"></UpdateForm>
    </Layout>
  </div>
</template>

<script>
import UpdateForm from "../../components/Category/UpdateForm";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import CategoryMixin from "../../mixins/CategoryMixin";
export default {
  name: "EditCategory",
  components: {
    Header,
    UpdateForm,
    Layout},
  mixins: [CategoryMixin],
  data() {
    return {
      parameters: {
        nav: true,
        main: true,
        footer: true
      },
      category : null
    }
  },
  async created() {
    this.category = await this.getCategoryData(this.$route.params.id);
    console.log(this.category);
  }
}
</script>

<style scoped>

</style>