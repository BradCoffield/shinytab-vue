<template>
  <div id="app">
    <div class="left">
      <!-- <editing-test thing="hihhhhh"></editing-test> -->
      <billings-weather v-if="showbillingsWeather"></billings-weather>
      <chekhov-quote></chekhov-quote>
      <basho-quote></basho-quote>
      <wordnikOfDay></wordnikOfDay>
      <pinboard></pinboard>
      <xkcd></xkcd>
      <rss-feeds v-if="showrssFeeds"></rss-feeds>
    </div>
    <div class="right">
      <button @click="showbillingsWeather = !showbillingsWeather">Billings Weather</button>
      <button @click="showrssFeeds = !showrssFeeds">show me feedz</button>
    </div>
  </div>
</template>

<script>
import ChekhovQuote from "./components/Quotes/Chekhov";
import rssFeeds from "./components/rssFeeds";
import BashoQuote from "./components/Quotes/Basho";
import xkcd from "./components/RSS/xkcd";
import billingsWeather from "./components/billingsWeather";
import pinboard from "./components/Pinboard/pinboard";
import wordnikOfDay from "./components/Wordy/wordnik-of-day"

export default {
  data: function() {
    return { showrssFeeds: true, showbillingsWeather: true };
  },
  /* 
HEY MAYBE I CAN V-FOR OVER THE BELOW AND LIKE DYNAMICALLY BUILD BUTTON COMPONENTS THAT REFER
*/
  components: {
    ChekhovQuote,
    rssFeeds,
    BashoQuote,
    xkcd,
    billingsWeather,
    pinboard,
    wordnikOfDay
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
.left {
  float: left;
}
.right {
  float: right;
}
</style>
