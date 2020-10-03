import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    user: null
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.user = { ...user };
    }
  },
  actions: {
    async getUsers({ commit }, formData) {
      try {
        const data = await axios.get('http://localhost:4000/api/users/', {
          params: { ...formData }
        });
        commit('setUsers', data.data.users);
      } catch (err) {
        console.log(err);
      }
    },
    async getUserById({ commit }, id) {
      try {
        const data = await axios.get(`http://localhost:4000/api/users/${id}`);
        commit('setUser', data.data.user);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  },
  getters: {
    users: s => s.users,
    user: s => s.user
  },
  modules: {
  }
});
