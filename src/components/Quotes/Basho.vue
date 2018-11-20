<template>
    <div class="sub-container" id="basho-quote">   <input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
><div  v-if="toggle == 'yes'">
    <span  v-html="quote"></span><br><div class="smallish">--Basho</div>
</div></div>
</template>

<script>
// import axios from 'axios';
function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default {
    data(){
        return {
            quote: '',
            toggle: 'yes'
        }
    },
  created() {
    // axios.get('https://shinytab.herokuapp.com/quotes/chekhov').then(res => this.quote = res.data).catch(error =>console.log(error))
    this.$http.get('https://shinytab.herokuapp.com/quotes/basho').then(res => this.quote =  res.data).catch(error =>console.log(error))
   
   
  }
};
</script>

<style scoped>
div {background-color: gray;}
</style>
