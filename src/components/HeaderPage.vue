<template>
  <header>
    <button class="exit-btn" @click="logout">Выйти</button>
    <div class="b-menu" @click="menuHandler">
      <div class="b-icon">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <button v-show="isOpened" @click="logout" class="b-btn">Выйти</button>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderPage",
  data() {
    return {
      isOpened: false,
    };
  },
  methods: {
    logout() {
      this.$store.commit("LOG_OUT");
      this.$router.push("/login");
    },
    menuHandler() {
      this.isOpened = !this.isOpened;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  min-height: 40px;
  background: wheat;
  margin-top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .exit-btn,
  .b-menu {
    margin-right: 20px;
  }

  .exit-btn,
  .b-icon,
  .b-btn {
    cursor: pointer;
  }

  .exit-btn {
    padding: 5px 15px;
    background-color: #60467e;
    color: #fff;
    border-radius: 5px;
    display: none;
    @media (min-width: 575.98px) {
      display: inline;
    }
  }

  .b-menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    @media (min-width: 575.98px) {
      display: none;
    }
  }

  .b-icon {
    div {
      width: 35px;
      height: 5px;
      background-color: black;
      margin: 6px 0;
    }
  }
  .b-btn {
    display: block;
    margin: 20px 0;
    background: inherit;
    border: none;
    padding: 0;
    font-size: 1rem;
    &:hover {
      text-shadow: 1px 1px 2px black;
    }
  }
}
</style>
