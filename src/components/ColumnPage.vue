<template>
  <div
    class="column"
    @dragover.prevent
    @drop.prevent="onColumnDrop($event, column.num)"
  >
    <div :style="{ backgroundColor: column.color }">
      {{ column.name }} ({{ amount }})
    </div>
    <div
      class="card"
      v-for="card in cards"
      :key="card.id"
      draggable="true"
      @dragstart="onDragStart($event, card)"
      @dragover.prevent="onDragOver($event)"
      @dragleave="onDragLeave($event)"
      @drop.prevent="onDrop($event, card)"
    >
      <button @click="remove(card.id)">X</button>
      <div><span>id:</span> {{ card.id }}</div>
      <p>{{ card.text }}</p>
    </div>
    <textarea
      name="todo"
      rows="10"
      placeholder="Ввести заголовок для этой карточки"
      v-model="todoText"
      v-show="isAdded"
    />
    <div class="add-field">
      <div class="add" :class="{ 'active-add': isAdded }" @click="add">
        <span>+</span> Добавить карточку
      </div>
      <button @click="cancel" v-show="isAdded">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColumnPage",
  props: {
    column: Object,
  },

  data() {
    return {
      isAdded: false,
      todoText: "",
      // currentCard: {},
    };
  },
  computed: {
    cards() {
      return this.$store.state.cards.filter(
        (card) => card.row === this.column.num
      );
    },
    amount() {
      return this.cards.length;
    },
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
    cancel() {
      this.isAdded = false;
    },
    remove(id) {
      this.$store.dispatch("removeTodo", id);
    },
    onDragStart(e, currentCard) {
      const dt = e.dataTransfer;
      dt.setData("cardId", String(currentCard.id));
      dt.setData("CardText", currentCard.text);
    },
    onDrop(e, card) {
      const dt = e.dataTransfer;
      const cardId = +dt.getData("cardId");
      const cardText = dt.getData("CardText");
      const newCard = {
        row: card.row,
        seq_num: card.seq_num,
        text: cardText,
      };
      this.$store.dispatch("changeDroppedCard", { cardId, newCard });
      e.target.style.opacity = "1";
    },
    onDragOver(e) {
      if (e.target.className === "card") {
        e.target.style.opacity = "0.5";
      }
    },
    onDragLeave(e) {
      e.target.style.opacity = "1";
    },
    onColumnDrop(e, row) {
      if (!this.amount) {
        const dt = e.dataTransfer;
        const cardId = +dt.getData("cardId");
        const cardText = dt.getData("CardText");
        const newCard = {
          row,
          seq_num: 0,
          text: cardText,
        };
        this.$store.dispatch("changeDroppedCard", { cardId, newCard });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.column {
  width: 100%;
  margin: 0 20px;
  text-align: left;

  > div:not(.add-field),
  textarea {
    padding: 10px;
  }

  textarea,
  .card span {
    color: #fff;
  }

  textarea {
    border: 10px solid #272930;
    background: #535353;
    width: 100%;
    resize: none;
    box-sizing: border-box;
    outline: none;
    font-size: 1rem;
    &::placeholder {
      color: #a9a9a9;
    }
  }

  .card,
  .card button {
    color: #a9a9a9;
  }

  .card {
    position: relative;
    background: #000;
    border: 10px solid #272930;
    overflow-wrap: break-word;

    button {
      position: absolute;
      top: 5px;
      right: 0;
      background: inherit;
      border: none;
    }
  }
  .add-field {
    background: #272930;
    display: flex;
    font-size: 1.2rem;

    .active-add,
    button {
      color: #a9a9a9;
    }

    .add {
      width: 70%;
      border: 10px solid #272930;
      padding: 10px 0 0;
      background: #272930;
      color: gray;
      cursor: pointer;
      text-align: left;
    }
    .active-add {
      background: #535353;
      padding: 15px 0;
      text-align: center;

      span {
        display: none;
      }
    }

    button {
      width: 30%;
      padding-left: 20px;
      background: inherit;
      border: none;
      font-size: 20px;
      text-align: left;
    }
  }
  .addField {
    height: 50px;
  }
}
</style>
