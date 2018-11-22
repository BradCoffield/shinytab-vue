/* eslint-disable */ 
<template>
    <ul id="pinboard-ul">
        <pinboardItem 
         v-for="(item, index) in itemDetails"
         :key="index"
         :link="item.href"
         :title="item.description"
         :tags="item.tags"
         :description="item.extended"
         >
             
        </pinboardItem>
        <!-- <pinboardItem v-for="item in "    :item="itemDetails"></pinboardItem> -->
    </ul>
</template>

 
<script>
/* eslint-disable */
import pinboardItem from "./pinboardItem";
import { appendFile } from 'fs';
export default {
  data() {
    return {
      // itemDetails: {}
      itemDetails: []
    };
  },
  components: { pinboardItem },
  created() {
    // eslint-disable-next-line
    this.$http
      .get("http://shinytab.herokuapp.com/pinboard")
      .then(res => {
        if (res == false) {
          throw "API response is empty....";
        }
        let pinboardResults = res.data.posts;
        console.log("p", pinboardResults);
        //this grabs the 3 most recent bookmarks from pinboard results and displays them
        for (let i = 0; i < 3; i++) {
          this.itemDetails.push(pinboardResults[i]);
        }
      })
      .then(this.$http.get("http://shinytab.herokuapp.com/pinboardAll").then(res => {
        if (res == false) {
          throw "API response is empty....";
        }
        var getRandomNumbers = function(howMany, upperLimit) {
        var limit = howMany,
          amount = 1,
          lower_bound = 1,
          upper_bound = upperLimit,
          unique_random_numbers = [];
        if (amount > limit) limit = amount; //Infinite loop if you want more unique natural numbers than exist in a given range
        while (unique_random_numbers.length < limit) {
          var random_number = Math.floor(
            Math.random() * (upper_bound - lower_bound) + lower_bound
          );
          if (unique_random_numbers.indexOf(random_number) == -1) {
            unique_random_numbers.push(random_number);
          }
        }
        return unique_random_numbers;
      };
       let pinboardResults11 = res.data;
      //This is where we actually specify how many random numbers we want generated.
      var ourRandoms = getRandomNumbers(2, pinboardResults11.length);
       
      ourRandoms.forEach((num) => {
        this.itemDetails.push(pinboardResults11[num]);
      })
        //  for (let i = 0; i < 3; i++) {
        //   this.itemDetails.push(pinboardResults11[i]);
        // }
        }))
      // eslint-disable-next-line
      .catch(err => console.log(err));
  }
};
</script>
<style   scoped>
#pinboard-ul {
  background-color: aqua;
}
</style>


/* 
So, for each of that array string template with it and then append after?  like grab all databases.js in 011
I feel like the vue way to do it would be to make each thing a component and create a series of them.
 */
