<template>
  <div>
    <nav>
      <router-link to="/login">Войти</router-link> |
      <router-link to="/reg">Регистрация</router-link>
    </nav>
    <form @submit.prevent="verify">
      <label for="login">
        логин:
        <span :class="{ required: isNotRegistered }">*</span>
      </label>
      <input
        autofocus
        id="login"
        type="text"
        placeholder="ваш логин"
        v-model="login"
      />
      <template v-if="isNotRegistered">
        <label for="email">e-mail: </label>
        <input
          id="email"
          type="text"
          placeholder="адрес электронной почты"
          v-model="email"
        />
      </template>
      <label for="pass">
        пароль:
        <span :class="{ required: isNotRegistered }">*</span>
      </label>
      <input id="pass" type="password" placeholder="*****" v-model="password" />
      <button type="submit">отправить</button>
      <div class="error">{{ error || loginError }}</div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AuthPage",
  data() {
    return {
      login: "",
      password: "",
      email: "",
      error: "",
      isNotRegistered: this.$route.name === "registration",
    };
  },
  methods: {
    verify() {
      if (!this.login || !this.password) {
        this.error = "Заполните все поля";
        return;
      }
      if (!/^[\w.@+-]+$/.test(this.login)) {
        this.error = "неверный формат логина";
        return;
      }
      if (!/.{8,}/gim.test(this.password)) {
        this.error = "пароль не менее 8 символов";
        return;
      }
      if (this.email && !/^.+@.+\..{2,}$/gim.test(this.email)) {
        this.error = "неверный формат email";
        return;
      }
      this.error = "";

      if (this.isNotRegistered) {
        this.$store.dispatch("registration", {
          username: this.login,
          email: this.email,
          password: this.password,
        });
        return;
      }
      this.$store.dispatch("login", {
        username: this.login,
        password: this.password,
      });
    },
  },
  computed: {
    loginError() {
      return this.$store.state.loginError;
    },
    token() {
      return this.$store.state.jwt;
    },
  },
  watch: {
    token() {
      if (this.token && !this.loginError) {
        this.$router.push("/");
      }
    },
    $route() {
      if (this.$route.name === "login") {
        this.isNotRegistered = false;
      } else this.isNotRegistered = true;
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

  span {
    visibility: hidden;
  }

  .required {
    visibility: visible;
    color: red;
    font-size: 95%;
    top: -2px;
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
      margin-bottom: 2px;
    }

    &:active {
      top: 1px;
      left: 1px;
      box-shadow: none;
      opacity: 0.8;
      border: 1px solid black;
      margin-bottom: 0;
    }
  }

  .error {
    margin: 10px auto;
  }
}
</style>
