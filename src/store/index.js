import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
Vue.use(vuex)

export default new vuex.Store({
  state: {
    user: {
      username: null,
      email: null,
      token: null
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setToken(state, token) {
      state.user.token = token;
    }
  },
  getters: {
    user: state => state.user
  },
  actions: {
    logoutUser() {
      this.user = {};
    },

    fetchData() {
      axios.get('http://localhost/api/user/profile').then(
          (response) => {
            console.log(response);
            this.state.user = response.data;
          }
      )
    }
  },
  modules: {
  }
})
