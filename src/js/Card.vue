<script>
export default {
  props: {
    values: Object,
    cards: Object,
    classes: String
  },
  data() {
    return {
      flipped: false,
    }
  },
  methods: {
    flipCard() {
      this.$emit('flipped', {number: this.values.number, index: this.values.index});
    },
  }
}
</script>

<template>
  <div @click="flipCard" :class="classes">
    <div class="card__number">
      {{ this.values.number }}
    </div>
  </div>
</template>