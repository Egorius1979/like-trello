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
    error: "",
    loginError: "",
  },
  getters: {},
  mutations: {
    SET_JWT(state, data) {
      if (state.error) {
        state.error = "";
      }
      state.loginError = "";
      state.jwt = data.token;
    },
    SET_CARDS(state, card) {
      state.cards = [...state.cards, card];
    },
    DELETE_CARD(state, id) {
      state.cards = state.cards.filter((card) => card.id !== id);
    },
    SET_ERROR(state, err) {
      if (err) {
        state.loginError = "";
        state.error = "Авторизуйтесь, ваша сессия завершилась";
        return;
      }
      state.error = "";
      state.loginError = "Неверный логин или пароль";
    },
    CHANGE_DROPPED_CARD(state, payload) {
      state.cards = state.cards.map((card) => {
        if (card.id === payload.cardId) {
          card.row = payload.row;
        }
        return card;
      });
    },
    logout(state) {
      state.jwt = "";
      // state.cards = [];
      state.error = "";
      state.loginError = "";
    },
  },
  actions: {
    login({ commit }, payload) {
      axios
        .post(`${uri}/users/login/`, payload)
        .then((res) => commit("SET_JWT", res.data))
        .catch(() => commit("SET_ERROR", null));
    },
    addTodo({ state, commit }, payload) {
      const headers = {
        Authorization: `JWT ${state.jwt}`,
      };
      axios
        .post(`${uri}/cards/`, payload, { headers })
        .then((res) => commit("SET_CARDS", res.data))
        .catch((e) => commit("SET_ERROR", e));
    },
    removeTodo({ commit, state }, id) {
      const headers = {
        Authorization: `JWT ${state.jwt}`,
      };
      axios
        .delete(`${uri}/cards/${id}`, { headers })
        .then(() => commit("DELETE_CARD", id))
        .catch((e) => commit("SET_ERROR", e));
    },
    chanceDroppedCard({ commit }, payload) {
      commit("CHANGE_DROPPED_CARD", payload);
    },
  },
  modules: {},
});
