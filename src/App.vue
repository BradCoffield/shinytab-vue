
<template>
  <div id="app">
    <div class="left">
      <!-- <editing-test thing="hihhhhh"></editing-test> -->
      <billingsWeather v-if="billingsWeather.show"></billingsWeather>
      <chekhovQuote v-if="chekhovQuote.show"></chekhovQuote>
      <basho-quote v-if="bashoQuote.show"></basho-quote>
      <wordnikOfDay v-if="wordnikOfDay.show"></wordnikOfDay>
      <pinboard></pinboard>
      <xkcd></xkcd>
      <rssFeeds v-if="rssFeeds.show"></rssFeeds>
    </div>
    <div class="right">
      <button @click="showHideUpdate(billingsWeather)">Billings Weather1</button>
      <button @click="showHideUpdate(rssFeeds)">show me feedz</button>
      <button @click="showHideUpdate(chekhovQuote)">Checkhov quote</button>
      <button @click="showHideUpdate(bashoQuote)">Basho quote</button>
      <button @click="showHideUpdate(wordnikOfDay)">Word of the day</button>
    </div>
  </div>
</template>

<script>
/* #region  */
import Firebase from "firebase";
require("firebase/firestore");
import ChekhovQuote from "./components/Quotes/Chekhov";
import rssFeeds from "./components/rssFeeds";
import BashoQuote from "./components/Quotes/Basho";
import xkcd from "./components/RSS/xkcd";
import billingsWeather from "./components/billingsWeather";
import pinboard from "./components/Pinboard/pinboard";
import wordnikOfDay from "./components/Wordy/wordnik-of-day";
import _ from "lodash";

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
/* #endregion */

export default {
  data: function() {
    return {
      billingsWeather: {
        name: "billingsWeather",
        show: true
      },
      chekhovQuote: {
        name: "chekhovQuote",
        show: false
      },
      rssFeeds: {
        name: "rssFeeds",
        show: true
      },
      bashoQuote: {
        name: "bashoQuote",
        show: true
      },
      wordnikOfDay: {
        name: "wordnikOfDay",
        show: false
      }
    };
  },
  created() {
    console.log(_.keysIn(this.$data));
    let ourStuff = _.keysIn(this.$data);
    ourStuff.forEach(el => {
      console.log(el);
      //so this doesn't work but I think I'm close. Its reaching out to allComponents and getting each one. And then logging the value of each one based on the name of el
      // now I need to figure out is how to get those values and place them into the .show value of them in the data object.
      // this.$firestore.fsComponents.doc("allComponents").get().then((doc) => {console.log(doc.data()[el]);
      this.$firestore.fsComponents
        .doc("allComponents")
        .get()
        .then(doc => {
          console.log('thisdataelshow', this.$data[el].show);
          this.$data[el].show = doc.data()[el];
        });
    });
  },
  methods: {
    showHideUpdate: function(el) {
      //what I want to do here is check the value from the database and invert it and put that in the data here which the component itself is watching

      //This selects the specific field of our record, based on the data passed from the button.
      let dbThing = this.fsComponents[0][el.name];

      //This whatever the value is in the database, switch it and save to variable.
      let changeTo = dbThing ? false : true;
      //change the appropriate data here in vue, which will update component's visibility bc of v-if on the component
      el.show = changeTo;
      //change the value in the database as well
      // OKAY SO THIS SUCCESSFULLY TARGETS THAT
      // this.$firestore.fsComponents.doc("allComponents").update({chekhovQuote: changeTo});

      //This works with the variable name!!!
      this.$firestore.fsComponents
        .doc("allComponents")
        .update({ [el.name]: changeTo });
    }
  },
  firestore: function() {
    return {
      fsComponents: firestore.collection("components")
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
