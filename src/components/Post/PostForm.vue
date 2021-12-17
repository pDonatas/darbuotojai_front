<template>
  <div>
    <form v-on:submit.prevent="create ? createPost() : updatePost(post.slug)">
      <div class="form-group">
        <label for="title">Title</label>
        <input :disabled="view" class="form-control" id="title" name="title" type="text" v-model="post.title"/>
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea :disabled="view" class="form-control" id="content" name="content" v-model="post.content"></textarea>
      </div>
      <div v-if="this.categories.length > 0" class="form-group">
        <label for="category">Category</label>
        <select :disabled="(view || preCategory != null) && !create" class="form-control" id="category" name="category" v-model="post.category">
          <option v-for="category in this.categories" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input :disabled="view" class="form-control" id="price" name="price" type="number" step="0.01" v-model="post.price"/>
      </div>
  <!--    <div v-if="!view" class="form-group">-->
  <!--      <label for="photo">Photo</label>-->
  <!--      <input :disabled="view" class="form-control" id="photo" name="photo" type="file" accept="image/*" ref="photo"/>-->
  <!--    </div>-->
  <!--    <div v-else>-->
  <!--      <img v-if="post.img" :src="post.img" :alt="post.title" />-->
  <!--    </div>-->
      <div v-if="view && this.data !== null && this.data.user_id === this.$store.getters.user.id">
        <router-link :to="{ name: 'Edit posts', params: { slug: post.slug }}">Edit</router-link> |

        <router-link :to="{ name: 'Delete posts', params: { slug: post.slug }}">Delete</router-link>
      </div>

      <input v-if="!view" class="btn btn-primary" type="submit" :value="create ? `Create` : `Update`" />
    </form>
    <b-button v-if="view" v-b-modal.post-vote>Vote for post</b-button>

    <b-modal id="post-vote" centered title="Vote for post">
      <b-form-rating variant="success" v-model="vote.vote"></b-form-rating>
      <b-textarea class="form-control" v-model="vote.comment" placeholder="Comment"></b-textarea>
      <template #modal-footer>
        <div class="w-100">
          <b-button
              variant="success"
              size="sm"
              class="float-right"
              @click="voteForPost(post, vote)"
          >
            Submit vote
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import constants from "../../constants";
import Swal from "sweetalert2";
import axios from 'axios';
import PostMixin from "../../mixins/PostMixin";

export default {
  name: "PostForm",
  mixins: [PostMixin],
  data() {
    return {
      categories: [],
      post: {
        title: null,
        content: null,
        category: this.preCategory,
        price: 0
      },
      vote: {
        vote: 0,
        comment: ''
      },
    }
  },

  props: {
    data: {},
    view: false,
    create: false,
    preCategory: null
  },

  watch: {
    data() {
      this.post.title = this.data.title;
      this.post.content = this.data.content;
      this.post.price = this.data.price;
      this.post.category = this.data.category;
      this.post.slug = this.data.slug;
    },
  },

  computed: {
    ...mapGetters(['getCategories'])
  },

  created() {
    if (this.getCategories.length === 0) {
      // Set a watcher on Vuex' mutations
      this.unsubscribe = this.$store.subscribe((mutation, state) => {
        // Rehydrate the users when an updateUsers mutation was processed inside the Vuex module
        // Here, add your namespace if your module is namespaced : yourNamespace/updateUsers
        if (mutation.type === 'setCategories') {
          this.categories = this.getCategories;
        }
      });
    }

    this.categories = this.getCategories;
  },

  beforeDestroy() {
    if (this.unsubscribe !== undefined) {
      this.unsubscribe();
    }
  },

  methods: {
    updatePost() {
      axios.patch(constants.API_URL + '/posts/' + this.post.slug, this.post).then(
          (response) => {
            Swal.fire({
              title: 'Success!',
              text: "You have successfully updated post",
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          }
      ).catch(function (error) {
        let message = "";
        if (error.response.data.errors !== undefined) {
          let fields = Object.values(error.response.data.errors);
          fields.forEach(function (field) {
            message += field += "\n";
          })
        } else if (error.response.data.error !== undefined) {
          message = error.response.data.error;
        }

        Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      });
    },
    createPost() {
      axios.post(constants.API_URL + '/posts', this.post).then(
          (response) => {
            Swal.fire({
              title: 'Success!',
              text: "You have successfully created a post",
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          }
      ).catch(function (error) {
            let message = "";
            if (error.response.data.errors !== undefined) {
              let fields = Object.values(error.response.data.errors);
              fields.forEach(function (field) {
                message += field += "\n";
              })
            } else if (error.response.data.error !== undefined) {
              message = error.response.data.error;
            }

            Swal.fire({
              title: 'Error!',
              text: message,
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          });
    }
  }
}
</script>

<style scoped>

</style>