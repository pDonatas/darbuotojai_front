import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import constants from "../constants";
import {loader} from "./modules/loader";
Vue.use(vuex)

export default new vuex.Store({
  state: {
    user: {
      username: null,
      email: null,
      token: null
    },

    posts: null,
    categories: null,
    orders: null,
    users: null
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
    },

    setOrders(state, orders) {
      state.orders = orders
    },

    setUsers(state, users) {
      state.users = users;
    }
  },
  getters: {
    user: state => state.user,
    getCategories: state => state.categories,
    getPosts: state => state.posts,
    getOrders: state => state.orders,
    getUsers: state => state.users
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

    async fetchPosts({commit, dispatch}) {
      if (localStorage.getItem('token')) {
        await axios.get(constants.API_URL + '/posts').then(
            (response) => {
              commit('setPosts', response.data.posts);
              dispatch('fetchCategories');
            }
        )
      }
    },

    async fetchOrders({commit}) {
      if (localStorage.getItem('token')) {
        await axios.get(constants.API_URL + '/orders').then(
            (response) => {
              commit('setOrders', response.data.orders)
            }
        )
      }
    },

  },

  modules: {
    loader
  }
})
