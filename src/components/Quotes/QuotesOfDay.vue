<template>
    <div class="sub-container">
        <div class="quote-of-day-quote" v-html="quoteItself"></div><div class="quote-of-day-person smallish">{{author}}</div>
    </div>  
</template>
<script>
export default {
  data() {
    return {
      quoteItself: "",
      author: ""
    };
  },
  created() {
    /**
     * So, I want to create an array with all the params i might want, like for the endpoints
     * and randomly select one and make the call to that
     */

    //returns a random number from a range
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let heyEndpoints = ["inspire", "art", "life"];
    // heyEndpoints = ["inspire", "art", "management", "life", "funny", "love", "students"];

    this.$http
      .get(`http://shinytab.herokuapp.com/quotes/of-day/${heyEndpoints[getRandomIntInclusive(0, heyEndpoints.length - 1)]}`)
      .then(res => {
        console.log(res.data);
        this.quoteItself = res.data.quote;
        this.author = res.data.author;
      })
      .catch(params => {
        console.log(params);
      });
  }
};
</script>
 
<style scoped>
.smallish {
  margin-left: 1rem;
}
</style>
