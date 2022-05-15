<template>
  <div>
    <button @click="logout">Выйти</button>
    {{ error }}
    <div class="container">
      <column-page
        v-for="column in columns"
        :key="column.name"
        :column="column"
      />
    </div>
  </div>
</template>

<script>
import ColumnPage from "./ColumnPage.vue";
export default {
  components: { ColumnPage },
  name: "MainPage",
  data() {
    return {
      columns: [
        { num: "0", name: "ON-HOLD", color: "#f97d42" },
        { num: "1", name: "IN-PROGRESS", color: "#2593c0" },
        { num: "2", name: "NEEDS-REVIEW", color: "#f4cf44" },
        { num: "3", name: "APPROVED", color: "#00ba61" },
      ],
    };
  },
  computed: {
    error() {
      return this.$store.state.error;
    },
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
.container {
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  margin: 10px auto;
  @media (min-width: 425px) {
    width: 70%;
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    width: 90%;
    margin: 30px auto;
  }
  @media (min-width: 1024px) {
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin: 50px auto;
  }
  @media (min-width: 1440px) {
    width: 70%;
  }
}
</style>
