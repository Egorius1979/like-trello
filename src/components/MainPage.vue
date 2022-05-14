<template>
  <div id="container">
    <column-page
      v-for="column in columns"
      :key="column.name"
      :column="column"
      :cards="cards.filter((card) => card.row === column.num)"
    />
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
    cards() {
      return this.$store.state.cards;
    },
  },
};
</script>

<style lang="scss">
#container {
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: 50px auto;
}
</style>
