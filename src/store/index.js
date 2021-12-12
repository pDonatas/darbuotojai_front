import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
