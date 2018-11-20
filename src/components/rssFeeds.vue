<template>
    <div>
       
          <div id="rss-feeds"></div>
    </div>
</template>

<script>
export default {
  created() {
      // could be called whichFeeds. Each number ultimately corresponds to a route and a specific feed/
    let howManyFeeds = [ 3, 2, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    howManyFeeds.forEach(num => {
      
        this.$http
          .get(`https://shinytab.herokuapp.com/rss/${num}`)
          .then(res =>{ let data = res.data;
        var d1 = document.getElementById("rss-feeds");
        d1.insertAdjacentHTML(
          "beforeend",
          `<div class="rss-feed-group"><div class="rss-feed-link"><a href="${
            data.link
          }" target="_blank">${
            // `<div class="rss-feed-group sub-container"><div class="rss-feed-link"><a href="${data.link}" target="_blank">${
            data.title
          }</a></div><div class="rss-feed-feedname smallish">${
            data.site
          }</div></div>`
        );})
          .catch(err => console.log(err));
       
       
    })
    
    
    // (function() {
    //   // could be called whichFeeds. Each number ultimately corresponds to a route and a specific feed/

    //   howManyFeeds.forEach(num => {
    //     function reqListener() {
    //       var data = JSON.parse(this.responseText);

    //       if (data.site == "xkcd.com") {
    //       } else {
    //         var d1 = document.getElementById("rss-feeds");
    //         d1.insertAdjacentHTML(
    //           "beforeend",
    //           `<div class="rss-feed-group"><div class="rss-feed-link"><a href="${
    //             data.link
    //           }" target="_blank">${
    //             // `<div class="rss-feed-group sub-container"><div class="rss-feed-link"><a href="${data.link}" target="_blank">${
    //             data.title
    //           }</a></div><div class="rss-feed-feedname smallish">${
    //             data.site
    //           }</div></div>`
    //         );
    //       }
    //     }
    //     var oReq = new XMLHttpRequest();
    //     oReq.addEventListener("load", reqListener);
    //     oReq.open("GET", `https://shinytab.herokuapp.com/rss/${num}`);
    //     oReq.send();
    //   });
    // })();
  }
};
</script>

<style>
</style>
