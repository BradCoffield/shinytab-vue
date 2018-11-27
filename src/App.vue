
<template>
  <div id="app">
<div class="columns" style="padding:3rem;" >
  <!-- <div class="column  "></div>
  <div class="column  "></div> -->
  <div class="column  ">
    <div class="box custom">
      <billingsWeather v-if="billingsWeather.show"></billingsWeather>
      
    </div>  
 
    <div class="box custom">
      <chekhovQuote v-if="chekhovQuote.show"></chekhovQuote>
    </div>
      <basho-quote v-if="bashoQuote.show"></basho-quote>
      <wordnikOfDay v-if="wordnikOfDay.show"></wordnikOfDay>
     
      
      <customPhilosophyQuote v-if="customPhilosophyQuote.show"></customPhilosophyQuote>
      <customWritingQuote v-if="customWritingQuote.show"></customWritingQuote>  
      <designQuote v-if="designQuote.show"></designQuote> 
      <programming-quote v-if="programmingQuote.show"></programming-quote> 
      <quote-of-day v-if="quoteOfDay.show"></quote-of-day>
   
      
      </div> 
      <div class="column is-5">
 <div class="box custom-3">
     
   <rssFeeds v-if="rssFeeds.show"></rssFeeds>
 </div>
 <hr class="fancy-hr">
  <div class="box custom-3">
    <pinboard v-if="pinboard.show"></pinboard>
  </div>
      </div>


  <div class="column right-side is-3 ">  
    <div class="box custom">
      <xkcd v-if="xkcd.show"></xkcd>
    </div>
    <div class="box custom">
      <unsplash v-if="unsplash.show"></unsplash>
    </div>
      
  </div> 
</div>
 
    
    
     
 

    <button class="button is-small"
            @click="isSettingsModalActive = true">
            Settings
        </button>
    
   <b-modal :active.sync="isSettingsModalActive">
            <div class="box ">
                <p>Turn shit on and off</p>
                <ul id="settings">
                  <li>
                    <button  class="button is-small"  :class="{ 'is-white': billingsWeather.show, 'is-dark': !billingsWeather.show }" @click="showHideUpdate(billingsWeather)">Billings Weather1</button>
                  </li>
      <li>
        <button class="button is-small" :class="{  'is-white': rssFeeds.show, 'is-dark': !rssFeeds.show }" @click="showHideUpdate(rssFeeds)">show me feedz</button>
      </li>
      <li>
        <button class="button is-small" :class="{  'is-white': chekhovQuote.show, 'is-dark': !chekhovQuote.show }" @click="showHideUpdate(chekhovQuote)">Checkhov quote</button>
      </li>
      <li>
        <button class="button is-small" :class="{  'is-white': bashoQuote.show, 'is-dark': !bashoQuote.show }" @click="showHideUpdate(bashoQuote)">Basho quote</button>
      </li>
      <li>
        <button class="button is-small" :class="{  'is-white': wordnikOfDay.show, 'is-dark': !wordnikOfDay.show }" @click="showHideUpdate(wordnikOfDay)">Word of the day</button>
      </li>
      <li>
        <button class="button is-small" :class="{  'is-white': pinboard.show, 'is-dark': !pinboard.show }" @click="showHideUpdate(pinboard)">Pinboard</button>
      </li>
      <li>
        <button class="button is-small" :class="{  'is-white': xkcd.show, 'is-dark': !xkcd.show }" @click="showHideUpdate(xkcd)">xkcd</button>
      </li>
      <li>
        <button class="button is-small" :class="{  'is-white': unsplash.show, 'is-dark': !unsplash.show }" @click="showHideUpdate(unsplash)">unsplash</button>
      </li>
      <li>
        <button class="button is-small" :class="{  'is-white': customPhilosophyQuote.show, 'is-dark': !customPhilosophyQuote.show }" @click="showHideUpdate(customPhilosophyQuote)">Philosophy Quote</button>
      </li>
      <li>
        <button class="button is-small" :class="{  'is-white': customWritingQuote.show, 'is-dark': !customWritingQuote.show }" @click="showHideUpdate(customWritingQuote)">Writing Quote</button>
      </li>
      <li>
        <button class="button is-small" :class="{  'is-white': designQuote.show, 'is-dark': !designQuote.show }" @click="showHideUpdate(designQuote)">Design Quote</button>
      </li>
      <li>
        <button class="button is-small" :class="{  'is-white': programmingQuote.show, 'is-dark': !programmingQuote.show }" @click="showHideUpdate(programmingQuote)">Programming Quote</button>
      </li>
      <li>
        <button class="button is-small" :class="{  'is-white': quoteOfDay.show, 'is-dark': !quoteOfDay.show }" @click="showHideUpdate(quoteOfDay)">Quote of Day</button>
      </li>
                </ul>
            </div>
        </b-modal>

   

  
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
import unsplash from "./components/Imagistic/Unsplash";
import customPhilosophyQuote from "./components/Quotes/CustomPhilosophyQuotes";
import customWritingQuote from "./components/Quotes/CustomWritingQuotes";
import designQuote from "./components/Quotes/DesignQuote";
import programmingQuote from "./components/Quotes/ProgrammingQuote";
import quoteOfDay from "./components/Quotes/QuotesOfDay";
import snackbar from "./components/buefy/Snackbar";

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
      isSettingsModalActive: false,
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
          console.log("thisdataelshow", this.$data[el].show);
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
    quoteOfDay,
    snackbar
  }
};
</script>

<style scoped>
#settings li {
  margin-bottom: 0.5rem;
}
.right-side div {
  margin: 1rem 0px;
}
.box.custom {
  background-color: #323e4f;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%232b2e31' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  color: #fff5cd;
}
/* .box.custom {
  background: #323e4f;
  color: #fff5cd;
} */
.box.custom-2 {
  background: #323e4f
}
.box.custom-3 {
  background: #18191a;
  border: 1px solid #7957d5;
}

.fancy-hr {background-color: #ffb610;}
</style>



