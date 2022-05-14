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
    setCards(state, card) {
      state.cards = [...state.cards, card];
      console.log(state.cards);
    },
    deleteCard(state, id) {
      state.cards = state.cards.filter((card) => card.id !== id);
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
        .then((res) => commit("setCards", res.data));
    },
    removeTodo({ state, commit }, id) {
      const headers = {
        Authorization: `JWT ${state.jwt}`,
      };
      axios.delete(`${uri}/cards/${id}`, { headers });
      return commit("deleteCard", id);
    },
  },
  modules: {},
});
