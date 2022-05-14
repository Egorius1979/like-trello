<template>
  <div id="column">
    <div :style="{ backgroundColor: column.color }">
      {{ column.name }}
    </div>
    <div id="card" v-for="card in cards" :key="card.id">
      <p>id: {{ card.id }}</p>
      <p>{{ card.text }}</p>
    </div>
    <textarea
      name="todo"
      rows="10"
      placeholder="Ввести заголовок для этой карточки"
      v-model="todoText"
      v-show="isAdded"
    />
    <div id="add-field">
      <div class="add" :class="{ 'active-add': isAdded }" @click="add">
        <span>+</span> Добавить карточку
      </div>
      <button @click="remove" v-show="isAdded">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColumnPage",
  props: { column: Object, cards: Array },
  data() {
    return {
      isAdded: false,
      todoText: "",
    };
  },
  methods: {
    add() {
      if (this.isAdded) {
        this.$store.dispatch("addTodo", {
          row: this.column.num,
          text: this.todoText,
        });
        this.isAdded = false;
        this.todoText = "";
        return;
      }
      this.isAdded = true;
    },
    remove() {
      this.isAdded = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#column {
  width: 100%;
  margin: 0 10px;
  text-align: left;

  & > div:not(#add-field),
  textarea {
    padding: 10px;
  }

  textarea {
    border: 10px solid #272930;
    background: #535353;
    color: white;
    width: 100%;
    resize: none;
    box-sizing: border-box;
    outline: none;
    font-size: 1rem;
    &::placeholder {
      color: #a9a9a9;
    }
  }

  #card {
    background: #000;
    border: 10px solid #272930;
  }
  #add-field {
    background: #272930;
    display: flex;
    font-size: 1.2rem;

    .add {
      width: 70%;
      border: 10px solid #272930;
      padding: 10px 0 0;
      background: #272930;
      color: gray;
      cursor: pointer;
    }
    .active-add {
      background: #535353;
      color: #a9a9a9;
      padding: 15px 0;

      span {
        opacity: 0;
      }
    }

    button {
      width: 30%;
      padding: 0;
      color: #a9a9a9;
      background: inherit;
      border: none;
      font-size: 20px;
    }
  }
}
</style>
