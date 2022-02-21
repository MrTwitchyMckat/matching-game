<script>
// Utilities and APIs
import getNumbers from './api/numbers';
import generateValues from './utilities/generateValues';

// Components
import Card from './Card.vue';

// Vue stuff
export default {
  data() {
    return {
      values: [],
      flippedCards: 0,
      attempts: 0,
      best: 0,
      currentValue: {},
      PreviousValue: {},
      activeCards: [],
      correctCards: [],
      win: false
    }
  },
  components: {
    Card
  },
  methods: {
    async setValues() {
      const url = 'https://raw.githubusercontent.com/terakeet/candidate-assignment-software-frontend/main/src/data/data.json'; 
      this.values = await generateValues(getNumbers(url));
    },
    handleFlip(values) {
      if (!this.correctCards.includes(values.index) &&
          !this.activeCards.includes(values.index)) {
        this.flippedCards++;
        if (this.flippedCards == 2) {
          this.flippedCards = 0;
          this.attempts++;
          this.previousValue = this.currentValue;
          this.currentValue = values;
          this.activeCards.push(this.currentValue.index);
          setTimeout(this.checkValues, 1000);
        } else {
          this.currentValue = values;
          this.activeCards.push(values.index);
        }
      }
    },
    checkValues() {
      if (this.currentValue.number == this.previousValue.number) {
        this.correctCards.push(this.currentValue.index, this.previousValue.index);
        this.activeCards = [];
        this.currentValue = {};
        this.previousValue = {};
        this.checkWin();
      } else {
        this.activeCards = [];
        this.currentValue = {};
        this.previousValue = {};
      }
    },
    getClasses(index) {
      if (this.activeCards.includes(index)) {
        return 'card active';
      } else if (this.correctCards.includes(index)) {
        return 'card correct';
      } else {
        return 'card';
      }
    },
    checkWin() {
      if (this.values.length == this.correctCards.length) {
        const bestAttempt = localStorage.getItem('bestAttempt');
        if (bestAttempt != null && bestAttempt > this.attempts) {
          localStorage.setItem('bestAttempt', this.attempts);
        }
        if (bestAttempt == null) {
          localStorage.setItem('bestAttempt', this.attempts);
        }
        this.best = localStorage.getItem('bestAttempt');
        this.win = true;
      }
    },
    reset() {
      this.setValues();
      this.flippedCards = 0;
      this.attempts = 0;
      this.currentValue = {};
      this.previousValue = {};
      this.activeCards = [];
      this.correctCards = [];
      this.win = false;
    }
  },
  beforeMount() {
    this.setValues();
  },
  mounted() {
    this.best = localStorage.getItem('bestAttempt');
  }
}
</script>

<template>
  <div class="container">
    <div v-if="!win" class="attempts">
      <div class="attempts__headline">
        Attempts: <span v-if="attempts">{{ attempts }}</span>
      </div>
      <div v-if="best" class="attempts__best">
        Best: {{ best }}
      </div>
    </div>
    <div v-if="!win" class="cards">
      <card v-for="(value, index) in values"
        @flipped="handleFlip" :key="index"
        :values="{number: value, index: index}"
        :classes="getClasses(index)"
      ></card>
    </div>
    <div v-if="win" class="win">
      <div class="win__message">
        <h1>You Matched em' All!</h1>
      </div>
      <div class="win__gif">
        <iframe src="https://giphy.com/embed/1GTZA4flUzQI0" width="100%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      </div>
      <div class="win__attempts">
        <div class="win__current">
          <h2>Attempts: {{ attempts }}</h2>
        </div>
        <div v-if="best" class="win__best">
          <h2>Best: {{ best }}</h2>
        </div>
      </div>
      <div class="try-again">
        <button class="button" @click="reset">Try Again?</button>
      </div>
    </div>
  </div>
</template>
