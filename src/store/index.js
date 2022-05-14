import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "my-app",
  storage: window.localStorage,
});

const uri = "https://trello.backend.tests.nekidaem.ru/api/v1";

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    jwt: "",
    cards: [],
  },
  getters: {},
  mutations: {
    setJwt(state, data) {
      state.jwt = data.token;
      console.log(state.jwt);
    },
    setCard(state, card) {
      state.cards = [...state.cards, card];
      console.log(state.cards);
    },
  },
  actions: {
    login({ commit }, payload) {
      axios
        .post(`${uri}/users/login/`, payload)
        .then((res) => commit("setJwt", res.data));
    },
    addTodo({ state, commit }, payload) {
      const headers = {
        Authorization: `JWT ${state.jwt}`,
      };
      axios
        .post(`${uri}/cards/`, payload, { headers })
        .then((res) => commit("setCard", res.data));
    },
  },
  modules: {},
});
