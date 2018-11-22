<template>
    <div>
        <span class="wordnik-word">
            <a :href="theLink">{{data.word}}</a>
        </span>
        <span class="wordnik-word-partofspeech">, {{data.definitions[0].partOfSpeech}}</span>
        <br>
        <span class="wordnik-word-definition">{{ data.definitions[0].text}}</span>`
    </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      theLink: ``
    };
  },
  created() {
    this.$http
      .get(
        "http://api.wordnik.com:80/v4/words.json/wordOfTheDay?api_key=9a50ee0cfb3a2ea1ce20e0ae49009a6d59203acc33cfed1c3"
      )
      .then(res => {
      
        this.data = res.data;
        this.theLink = `https://www.wordnik.com/words/${res.data.word}`;
      })
      .catch(error => alert('Wordnik',error));
  }
};
</script>
