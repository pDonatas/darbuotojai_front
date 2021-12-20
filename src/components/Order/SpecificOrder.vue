<template>
<div>
  <b-card bg-variant="light">
    <div>
      <table>
        <thead>
        <tr>
          <th> Id</th>
          <th> Requirements</th>
          <th> Ordered post </th>
          <th> Ordered post content</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ order.id }}</td>
          <td>{{ order.requirement }}</td>
          <td>{{ order.service[0].title}}</td>
          <td>{{ order.service[0].content}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </b-card>
</div>
</template>

<script>
import OrderMixin from "../../mixins/OrderMixin";

export default {
  name: "SpecificOrder",
  data() {
    return {
      order : {
        id:null,
        requirement:null,
        service: [
          'title',
          'content'
        ]
      },
    }
  },
  props: {
    data: {},
    view: false,
    create: false
  },
  watch: {
    data() {
      this.order = this.data.order;
    }
  },
}
</script>

<style scoped>

</style>