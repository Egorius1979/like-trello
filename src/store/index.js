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
    SET_CARDS(state, cards) {
      if (state.error) {
        state.error = "";
      }
      state.cards = cards;
    },
    DELETE_CARD(state, id) {
      if (state.error) {
        state.error = "";
      }
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
    LOG_OUT(state) {
      state.jwt = "";
      state.cards = [];
      state.error = "";
      state.loginError = "";
    },
  },
  actions: {
    registration({ commit, dispatch }, payload) {
      axios
        .post(`${uri}/users/create/`, payload)
        .then((res) => commit("SET_JWT", res.data))
        .then(() => dispatch("getCards"))
        .catch(() => commit("SET_ERROR", null));
    },
    login({ commit, dispatch }, payload) {
      axios
        .post(`${uri}/users/login/`, payload)
        .then((res) => commit("SET_JWT", res.data))
        .then(() => dispatch("getCards"))
        .catch(() => commit("SET_ERROR", null));
    },
    addTodo({ state, commit, dispatch }, payload) {
      const headers = {
        Authorization: `JWT ${state.jwt}`,
      };
      axios
        .post(`${uri}/cards/`, payload, { headers })
        .then(() => dispatch("getCards"))
        .catch((e) => commit("SET_ERROR", e));
    },
    removeTodo({ commit, dispatch, state }, id) {
      const headers = {
        Authorization: `JWT ${state.jwt}`,
      };
      axios
        .delete(`${uri}/cards/${id}`, { headers })
        .then(() => dispatch("getCards"))
        .catch((e) => commit("SET_ERROR", e));
    },
    changeDroppedCard({ commit, dispatch, state }, payload) {
      const headers = {
        Authorization: `JWT ${state.jwt}`,
      };
      axios
        .patch(`${uri}/cards/${payload.cardId}`, payload.updatedCard, {
          headers,
        })
        .then(() => dispatch("getCards"))
        .catch((e) => commit("SET_ERROR", e));
    },
    getCards({ commit, state }) {
      const headers = {
        Authorization: `JWT ${state.jwt}`,
      };
      axios
        .get(`${uri}/cards/`, { headers })
        .then((res) => commit("SET_CARDS", res.data))
        .catch((e) => commit("SET_ERROR", e));
    },
  },
  modules: {},
});
