
<template>
  <div id="app">

 
    <billingsWeather v-if="billingsWeather.show"></billingsWeather>
      <chekhovQuote v-if="chekhovQuote.show"></chekhovQuote>
      <basho-quote v-if="bashoQuote.show"></basho-quote>
      <wordnikOfDay v-if="wordnikOfDay.show"></wordnikOfDay>
      <pinboard v-if="pinboard.show"></pinboard>
      <xkcd v-if="xkcd.show"></xkcd>
      <unsplash v-if="unsplash.show"></unsplash>
      <rssFeeds v-if="rssFeeds.show"></rssFeeds>
      <customPhilosophyQuote v-if="customPhilosophyQuote.show"></customPhilosophyQuote>
      <customWritingQuote v-if="customWritingQuote.show"></customWritingQuote>  
      <designQuote v-if="designQuote.show"></designQuote> 
      <programming-quote v-if="programmingQuote.show"></programming-quote> 
      <quote-of-day v-if="quoteOfDay.show"></quote-of-day>
 

   
    <div class="right">
      <button :class="{ active: billingsWeather.show, inactive: !billingsWeather.show }" @click="showHideUpdate(billingsWeather)">Billings Weather1</button>
      <button :class="{ active: rssFeeds.show, inactive: !rssFeeds.show }" @click="showHideUpdate(rssFeeds)">show me feedz</button>
      <button :class="{ active: chekhovQuote.show, inactive: !chekhovQuote.show }" @click="showHideUpdate(chekhovQuote)">Checkhov quote</button>
      <button :class="{ active: bashoQuote.show, inactive: !bashoQuote.show }" @click="showHideUpdate(bashoQuote)">Basho quote</button>
      <button :class="{ active: wordnikOfDay.show, inactive: !wordnikOfDay.show }" @click="showHideUpdate(wordnikOfDay)">Word of the day</button>
      <button :class="{ active: pinboard.show, inactive: !pinboard.show }" @click="showHideUpdate(pinboard)">Pinboard</button>
      <button :class="{ active: xkcd.show, inactive: !xkcd.show }" @click="showHideUpdate(xkcd)">xkcd</button>
      <button :class="{ active: unsplash.show, inactive: !unsplash.show }" @click="showHideUpdate(unsplash)">unsplash</button>
      <button :class="{ active: customPhilosophyQuote.show, inactive: !customPhilosophyQuote.show }" @click="showHideUpdate(customPhilosophyQuote)">Philosophy Quote</button>
      <button :class="{ active: customWritingQuote.show, inactive: !customWritingQuote.show }" @click="showHideUpdate(customWritingQuote)">Writing Quote</button>
      <button :class="{ active: designQuote.show, inactive: !designQuote.show }" @click="showHideUpdate(designQuote)">Design Quote</button>
      <button :class="{ active: programmingQuote.show, inactive: !programmingQuote.show }" @click="showHideUpdate(programmingQuote)">Programming Quote</button>
      <button :class="{ active: quoteOfDay.show, inactive: !quoteOfDay.show }" @click="showHideUpdate(quoteOfDay)">Quote of Day</button>

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
//TODO: hey dude change me to import only the bit used here
import _ from "lodash";
import unsplash from "./components/Imagistic/Unsplash"
import customPhilosophyQuote from "./components/Quotes/CustomPhilosophyQuotes"
import customWritingQuote from "./components/Quotes/CustomWritingQuotes"
import designQuote from "./components/Quotes/DesignQuote"
import programmingQuote from "./components/Quotes/ProgrammingQuote"
import quoteOfDay from "./components/Quotes/QuotesOfDay"

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
      },
      pinboard: {
        name: "pinboard",
        show: false
      },
      xkcd: {
        name: "xkcd",
        show: false
      },
      unsplash: {
        name: "unsplash",
        show: false
      },
      customPhilosophyQuote: {
        name: "customPhilosophyQuote",
        show: false
      },
      customWritingQuote: {
        name: "customWritingQuote",
        show: false
      },
      designQuote: {
        name: "designQuote",
        show: false
      },
      programmingQuote: {
        name: "programmingQuote",
        show: false
      },
      quoteOfDay: {
        name: "quoteOfDay",
        show: false
      },
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
    wordnikOfDay,
    unsplash,
    customPhilosophyQuote,
    customWritingQuote,
    designQuote,
    programmingQuote,
    quoteOfDay
  }
};
</script>

<style scoped>
.active {background-color: slateblue}
.inactive {background-color: lightslategray}
</style>
