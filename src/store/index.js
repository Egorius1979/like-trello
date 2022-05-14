import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const uri = "https://trello.backend.tests.nekidaem.ru/api/v1";

export default new Vuex.Store({
  state: {
    jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4OTYsInVzZXJuYW1lIjoiVmFzeWEiLCJleHAiOjE2NTI1NTY3NDAsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsIm9yaWdfaWF0IjoxNjUyNTUzMTQwfQ.YsXqfx2S4vhDmXP2fJT88hLJy9mQHpg-GtXOQ8EYQSY",
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
