<template>
  <div id="app">
    <div class="left">
      <!-- <editing-test thing="hihhhhh"></editing-test> -->
      <billingsWeather v-if="showbillingsWeather"></billingsWeather>
      <chekhovQuote v-if="chekhovQuote.show"></chekhovQuote>
      <basho-quote></basho-quote>
      <wordnikOfDay></wordnikOfDay>
      <pinboard></pinboard>
      <xkcd></xkcd>
      <rssFeeds v-if="showrssFeeds"></rssFeeds>
    </div>
    <div class="right">
      <button @click="showbillingsWeather = !showbillingsWeather">Billings Weather1</button>
      <button @click="showHideUpdate(chekhovQuote)">Billings Weather</button>
      <button @click="showrssFeeds = !showrssFeeds">show me feedz</button>
      <button @click="chekhovQuote.show = !chekhovQuote.show">Checkhov quote</button>
      <button @click="addData">hi</button>
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
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

import ChekhovQuote from "./components/Quotes/Chekhov";
import rssFeeds from "./components/rssFeeds";
import BashoQuote from "./components/Quotes/Basho";
import xkcd from "./components/RSS/xkcd";
import billingsWeather from "./components/billingsWeather";
import pinboard from "./components/Pinboard/pinboard";
import wordnikOfDay from "./components/Wordy/wordnik-of-day";

export default {
  data: function() {
    return {
      showrssFeeds: false,
      showbillingsWeather: true,
       
      chekhovQuote: {
        name: "chekhovQuote",
        show: false
      }
    };
  },
  methods: {
    addData: function() {
     /* this works to update a specific field in allComponents
        this.$firestore.fsComponents.doc('allComponents').update({
          chekhovQuote: true
        })  */ 
        return 'hi'
    },
    showHideUpdate: function(el) {
       //what I want to do here is check the value from the database and invert it and put that in the data here which the component itself is watching
            
      //This selects the specific field of our record, based on the data passed from the button. 
      let dbThing = this.fsComponents[0][el.name];
      let theName = el.name;
     //This whatever the value is in the database, switch it and save to variable.
      let changeTo = dbThing ? false : true;
      //change the appropriate data here in vue, which will update component's visibility bc of v-if on the component
      el.show = changeTo;
      //change the value in the database as well
      // OKAY SO THIS SUCCESSFULLY TARGETS THAT
      // this.$firestore.fsComponents.doc("allComponents").update({chekhovQuote: false})

      let thing = `this.$firestore.fsComponents.doc("allComponents").update({${theName}: false})`;
      thing();
     
      
    }
  },
  firestore: function() {
    return {
      fsComponents: firestore.collection("components"),
       
    };
  },

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

<style scoped>
</style>
