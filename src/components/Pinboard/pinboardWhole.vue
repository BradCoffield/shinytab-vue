<template>
    <div></div>
</template>

<script>
import pinboardItem from "./pinboardItem";
export default {
  data() {
    return {
      goal:
        "Display random entries and always also the most recent 3 entries, or somesuch. Which means I'm going to have to create a new route etc on the server."
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
        this.itemDetails = pinboardResults;
        // console.log(pinboardResults.length);

        // eslint-disable-next-line
        // console.log(pinboardResults)
      })
      // eslint-disable-next-line
      .catch(err => alert('Pinboard',err));
  }
};
</script>
