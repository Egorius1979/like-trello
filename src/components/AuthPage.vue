<template>
  <form @submit.prevent="verify">
    <label for="login"> логин: </label>
    <input
      autofocus
      id="login"
      type="text"
      placeholder="ваш логин"
      v-model="login"
    />
    <label for="pass"> пароль: </label>
    <input id="pass" type="password" placeholder="*****" v-model="password" />
    <button type="submit">отправить</button>
    {{ error }}
  </form>
</template>

<script>
export default {
  name: "AuthPage",
  data() {
    return {
      login: "",
      password: "",
      error: "",
    };
  },
  methods: {
    verify() {
      if (!this.login || !this.password) {
        this.error = "Заполните все поля";
        return;
      }
      if (!/^[\w.@+-]+$/.test(this.login)) {
        this.error = "неверный формат";
        return;
      }
      this.$store.dispatch("login", {
        username: this.login,
        password: this.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 300px;
  margin: 0 auto;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    text-align: left;
  }

  input,
  button {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
  }
  input {
    margin: 0px auto 20px;
    outline: none;
    border: none;
    font-size: 1rem;
    box-sizing: border-box;

    &::placeholder {
      font-style: italic;
    }
  }

  button {
    background-color: #60467e;
    color: white;
    font-size: 1.3rem;
    border: 1px solid black;
    cursor: pointer;
    letter-spacing: 0.1rem;
    margin-top: 10px;

    &:hover {
      border: none;
      box-shadow: 1px 1px 2px #00ff7f;
    }

    &:active {
      position: relative;
      top: 1px;
      left: 1px;
      box-shadow: none;
      opacity: 0.8;
      border: 1px solid black;
    }
  }
}
</style>
