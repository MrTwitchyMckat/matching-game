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
    // Set the values array to a randomized array based on numbers from api.
    async setValues() {
      const numbers = await getNumbers();
      this.values = generateValues(numbers);
    },
    // Invoked by clicking a card
    handleFlip(cardValues) {
      // Only do stuff if the card isn't already active or already correct. 
      // Checking activeCards.length stops users from selecting more than 2 cards at once
      if (!this.correctCards.includes(cardValues.index) &&
          !this.activeCards.includes(cardValues.index) &&
          this.activeCards.length < 2) {
          this.activeCards.push(cardValues.index); // push index of clicked card to active cards
        if (this.activeCards.length === 2) {
          this.attempts++; // if second card is clicked that means 1 attempt has been made
          setTimeout(this.checkValues, 1000); // Check if numbers match. Also add a delay so user can see both cards.
        }
      }
    },
    // This checks if the two numbers of the cards match
    checkValues() {
      if (this.values[this.activeCards[0]] == this.values[this.activeCards[1]]) {
        this.correctCards.push(this.activeCards[0], this.activeCards[1]); // Pass index of correct cards to correctCards
        this.checkWin(); 
      }
      this.activeCards = []; // Reset active cards
    },
    // This function generates relevant classes to cards
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
    // Checks to see if the game has been won yet
    checkWin() {
      if (this.values.length == this.correctCards.length) {
        const bestAttempt = localStorage.getItem('bestAttempt') ?? 0;
        // Set a best attempt if one has not been made
        if (bestAttempt === 0) {
          localStorage.setItem('bestAttempt', this.attempts);
        }
        // Updates best attempt if current attempt is better 
        if (bestAttempt > this.attempts) {
          localStorage.setItem('bestAttempt', this.attempts);
        }
        this.best = localStorage.getItem('bestAttempt');
        this.win = true;
      }
    },
    // Reset all values on try again. 
    reset() {
      this.setValues();
      this.attempts = 0;
      this.activeCards = [];
      this.correctCards = [];
      this.win = false;
    }
  },
  beforeMount() {
    // Set some basic values before mount. 
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
