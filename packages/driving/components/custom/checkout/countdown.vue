<script>
export default {
  // Daily sale countdown, with a little help from http://fareez.info/
  // https://gist.github.com/Ichag/697ba6f4a22a25fb18d7b5568bf054b6

  data() {
    return {
      isActive: true,
      now: Math.trunc(new Date().getTime() / 1000), // Right Now
      date: Math.trunc(new Date().setHours(24, 0, 0, 0) / 1000) //Midnight
    };
  },
  computed: {
    seconds() {
      return (this.date - this.now) % 60;
    },
    minutes() {
      return Math.trunc((this.date - this.now) / 60) % 60;
    },
    hours() {
      return Math.trunc((this.date - this.now) / 60 / 60) % 24;
    }
  },
  created() {
    window.setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000);
      let distance = this.date - this.now;
      if (distance > 0 && this.hours <= 16 && !this.isActive) {
        this.isActive = true;
      } else if (this.hours > 16 || distance <= 0) {
        this.isActive = false;
      }
    }, 1000);
  },
  methods: {
    twoDigits(value) {
      if (value.toString().length <= 1) {
        return "0" + value.toString();
      }
      return value.toString();
    }
  }
};
</script>

<style lang="scss">
@import "~@core/assets/sass/functions";
@import "~@core/assets/sass/variables";
@import "~@core/assets/sass/mixins";

.countdown-container {
  background: theme-color("dark");
  color: $white;
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  padding: $spacer/4 $spacer;
  position: relative;
  border-radius: $spacer/4;
  display: none;
  &.active {
    display: block !important;
    // Arrow
    &:after {
      left: 100%;
      top: 50%;
      border: solid transparent;
      content: "";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
      border-left-color: theme-color("dark");
      border-width: $spacer/2;
      margin-top: -$spacer/2;
    }
  }

  .countdown-label {
    color: theme-color("notice");
    font-size: map-get($headings-font-sizes, "h6");
    font-weight: bold;
    line-height: $spacer;
    text-transform: uppercase;
    text-align: left;
  }
  .timer {
    font-size: $font-size-xs;
    .number {
      display: block;
      font-size: map-get($headings-font-sizes, "h4") !important;
      font-weight: bold;
      line-height: $spacer * 1.5;
      padding: 0;
      margin: 0;
    }
  }
}

@include media-breakpoint-down(md) {
  .countdown-label {
    font-size: $font-size-xs !important;
  }
  .number {
    font-size: map-get($headings-font-sizes, "h5") !important;
  }
  .timer {
    font-size: $font-size-xxs !important;
  }
}
</style>

<template>
<div class="countdown-container" :class="{ active : isActive }">
  <div class="align-items-center d-flex text-center justify-content-between" v-if="isActive">
  <div class="countdown-label">Sale<br/>Ends:</div>
  <div class="hours timer">
    <span class="hours-number number">{{ hours }}</span> Hours
  </div>
  <div class="mins timer">
    <span class="mins-number number" v-html="twoDigits(minutes)"></span> Minutes
  </div>
  <div class="seconds timer">
    <span class="seconds-number number" v-html="twoDigits(seconds)"></span> Seconds
  </div>
</div>
</div>
</template>
