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
      attempts: 0,
      best: 0,
      activeCards: [],
      correctCards: [],
      win: false,
      disabled: false,
    }
  },
  components: {
    Card
  },
  methods: {
    async setValues() {
      const numbers = await getNumbers();
      this.values = generateValues(numbers);
    },
    handleFlip(cardValues) {
      if (!this.correctCards.includes(cardValues.index) &&
          !this.activeCards.includes(cardValues.index) &&
          this.activeCards.length < 2) {
          this.activeCards.push(cardValues.index);
        if (this.activeCards.length === 2) {
          this.attempts++;
          setTimeout(this.checkValues, 1000);
        }
      }
    },
    checkValues() {
      if (this.values[this.activeCards[0]] == this.values[this.activeCards[1]]) {
        this.correctCards.push(this.activeCards[0], this.activeCards[1]);
        this.activeCards = [];
        this.checkWin();
      }
      this.activeCards = [];
    },
    getClasses(index) {
      let classes = ['card'];
      if (this.activeCards.includes(index)) {
        classes.push('active');
      }
      if (this.correctCards.includes(index)) {
        classes.push('correct');
      }
      return classes.join(' ');
    },
    checkWin() {
      if (this.values.length == this.correctCards.length) {
        const bestAttempt = localStorage.getItem('bestAttempt') ?? 0;
        if (bestAttempt === 0) {
          localStorage.setItem('bestAttempt', this.attempts);
        }
        if (bestAttempt > this.attempts) {
          localStorage.setItem('bestAttempt', this.attempts);
        }
        this.best = localStorage.getItem('bestAttempt');
        this.win = true;
      }
    },
    reset() {
      this.setValues();
      this.attempts = 0;
      this.activeCards = [];
      this.correctCards = [];
      this.win = false;
    }
  },
  beforeMount() {
    this.setValues();
    this.best = localStorage.getItem('bestAttempt');
  },
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
        @flipped="handleFlip"
        :key="index"
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
