<template>
    <div class="sub-container" id="chekhov-quote">   <div   ><span    v-html="quote"></span><br><div class="smallish">--Chekhov</div></div></div>
</template>

<script>
// import axios from 'axios';
function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default {
  data() {
    return {
      quote: "",
      toggle: "yes"
    };
  },
  created() {
    this.$http
      .get("https://shinytab.herokuapp.com/quotes/chekhov")
      .then(res => (this.quote = res.data))
      .catch(error => console.log(error));
    // this.$http.get('https://shinytab.herokuapp.com/quotes/chekhov').then(res => this.quote = decodeHtml(res.data)).catch(error =>console.log(error))
  }
};
</script>

<style scoped>
 
</style>
