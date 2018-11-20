<template>
  <div id="app">
    <div class="left">
      <!-- <editing-test thing="hihhhhh"></editing-test> -->
      <billingsWeather v-if="showbillingsWeather"></billingsWeather>
      <chekhovQuote v-if="showChekhovQuote"></chekhovQuote>
      <basho-quote></basho-quote>
      <wordnikOfDay></wordnikOfDay>
      <pinboard></pinboard>
      <xkcd></xkcd>
      <rssFeeds v-if="showrssFeeds"></rssFeeds>
    </div>
    <div class="right">
      <button @click="showbillingsWeather = !showbillingsWeather">Billings Weather</button>
      <button @click="showrssFeeds = !showrssFeeds">show me feedz</button>
      <button @click="showChekhovQuote = !showChekhovQuote">Checkhov quote</button>
      <button @click="addData"></button>
    </div>
  </div>
</template>

<script>
import Firebase from "firebase";
require("firebase/firestore");

var config = {
  apiKey: process.env.FIREBASE_APIKEY,
  
  authDomain: "shinytabvue.firebaseapp.com",
  databaseURL: "https://shinytabvue.firebaseio.com",
  projectId: "shinytabvue",
  storageBucket: "shinytabvue.appspot.com",
  messagingSenderId: "790342025768"
};
var firebaseApp = Firebase.initializeApp(config);
const firestore = firebaseApp.firestore();
const settings = {  timestampsInSnapshots: true };
firestore.settings(settings);

import ChekhovQuote from "./components/Quotes/Chekhov";
import rssFeeds from "./components/rssFeeds";
import BashoQuote from "./components/Quotes/Basho";
import xkcd from "./components/RSS/xkcd";
import billingsWeather from "./components/billingsWeather";
import pinboard from "./components/Pinboard/pinboard";
import wordnikOfDay from "./components/Wordy/wordnik-of-day";

export default {
  firestore: function() {
    return {
      persons: firestore.collection("persons")
    };
  },
  methods: {
    addData: function() {
      this.$firestore.persons.add({
        firstname: "Amrani",
        lastname: "Houssain"
      });
    }
  },
  data: function() {
    return {
      showrssFeeds: false,
      showbillingsWeather: true,
      showChekhovQuote: false
    };
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
