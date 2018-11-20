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
import pinboardItem from "./pinboardItem";
export default {
  data() {
    return {
      itemDetails: {}
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
      .catch(err => alert(err));
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
