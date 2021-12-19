<template>
  <div>
    <b-card bg-variant="light">
      <div class="form-group">
        <b-td class="align-content-center fw-bold" style="font-size: 20px"> Show Specific Post Order</b-td>
        <form>
          <div>
            <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Id" label-for="id">
              <b-form-input class="form-control" style="width: 50%" id="id" name="id" type="number" v-model="id"/>
            </b-form-group>
          </div>
          <div>
            <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Post" label-for="slug">
              <b-form-select class="form-control" style="width: 50%" id="slug" name="slug" v-model="slug">
                <b-form-select-option v-for="post in this.posts" :value="post.slug" :key="post.slug">{{ post.title }}</b-form-select-option>
              </b-form-select>
            </b-form-group>
          </div>
          <b-button variant="success" v-on:click="getPostOrder(id,slug)">Show</b-button>
        </form>
      </div>
    </b-card>
    <b-card bg-variant="light">
      <div v-if="showPostOrder">
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
import OrderMixin from "../../../mixins/OrderMixin";
import Swal from "sweetalert2";
import {mapGetters} from "vuex";

export default {
  name: "ShowSpecificPostOrder",
  mixins: [OrderMixin],
  data() {
    return {
      id:null,
      posts:[],
      slug:null,
      order : {
        id:null,
        requirement:null,
        service: [
          'title',
          'content'
        ]
      },
      showPostOrder : false,
    }
  },

  created() {
    this.posts = this.$store.getters.getPosts;
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      // Rehydrate the users when an updateUsers mutation was processed inside the Vuex module
      // Here, add your namespace if your module is namespaced : yourNamespace/updateUsers
      if (mutation.type === 'setPosts') {
        this.posts = this.getPosts;
      }
    });
  },

  beforeDestroy() {
    // Unsubscribe when the component is going to be destroyed
    this.unsubscribe();
  },
  mounted() {
    if (this.$store.getters.getPosts == null) {
      this.$store.dispatch('fetchPosts');
    }
  },
  methods:{
    async getPostOrder(id,slug){
      this.order=await this.getPostOrderData(id,slug);
      if(this.order !=null){
        this.showPostOrder = true;
        await Swal.fire({
          title: 'Success!',
          text: "You have successfully got specific order",
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
      else{
        this.showPostOrder = false;
      }
    }
  }
}
</script>

<style scoped>

</style>