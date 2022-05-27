<template>
  <div class="container">
    <header-page></header-page>
    <div class="error">{{ error }}</div>
    <div class="grid">
      <column-page
        v-for="column in columns"
        :key="column.name"
        :column="column"
      />
    </div>
  </div>
</template>

<script>
import HeaderPage from "./HeaderPage.vue";
import ColumnPage from "./ColumnPage.vue";
export default {
  components: { ColumnPage, HeaderPage },
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
  mounted() {
    if (!this.$store.state.jwt) {
      this.$router.push({ name: "login" });
    }
  },
  computed: {
    error() {
      return this.$store.state.error;
    },
  },
};
</script>

<style lang="scss">
.container {
  margin: 10px auto;
  @media (min-width: 575.98px) {
    max-width: 100%;
  }
  @media (min-width: 767.98px) {
    max-width: 720px;
  }
  @media (min-width: 991.98px) {
    max-width: 800px;
  }
  @media (min-width: 1024px) {
    max-width: 1024px;
  }
  @media (min-width: 1439.98px) {
    max-width: 1280px;
  }

  .grid {
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr;
    grid-column-gap: 32px;
    margin: 10px auto;
    max-width: 350px;
    @media (min-width: 575.98px) {
      grid-template-columns: 1fr 1fr;
      max-width: 100%;
    }
    @media (min-width: 767.98px) {
      margin-bottom: 30px;
    }
    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    @media (min-width: 1439.98px) {
      margin-bottom: 50px;
    }
  }

  .error {
    margin: 10px;
    color: #ffefd5;
  }
}
</style>
