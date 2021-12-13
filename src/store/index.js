import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import constants from "../constants";
Vue.use(vuex)

export default new vuex.Store({
  state: {
    user: {
      username: null,
      email: null,
      token: null
    },

    posts: [],
    categories: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setToken(state, token) {
      state.user.token = token;
    },

    setCategories(state, categories) {
      state.categories = categories
    },

    setPosts(state, posts) {
      state.posts = posts
    }
  },
  getters: {
    user: state => state.user,
    getCategories: state => state.categories,
    getPosts: state => state.posts
  },
  actions: {
    logoutUser() {
      this.user = {};
    },

    fetchData() {
      axios.get(constants.API_URL + '/user/profile').then(
          (response) => {
            this.state.user = response.data;
          }
      )
    },

    async fetchCategories({commit}) {
      if (localStorage.getItem('token')) {
        await axios.get(constants.API_URL + '/categories').then(
            (response) => {
              commit('setCategories', response.data)
            }
        )
      }
    },

    async fetchPosts({commit}) {
      if (localStorage.getItem('token')) {
        await axios.get(constants.API_URL + '/posts').then(
            (response) => {
              commit('setPosts', response.data.posts);
              this.state.dispatch('fetchCategories');
            }
        )
      }
    }
  },
  modules: {
  }
})
