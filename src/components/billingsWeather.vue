<template>
    <div class="sub-container" id="dark-sky"><ul v-html="weather"></ul>
    <div id="alerttt">{{alerttt}}</div></div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      weather: ``,
      alerttt: ``
    };
  },
  created() {
    this.$http
      .get("https://shinytab.herokuapp.com/weather")
      .then(res => {
        let data = res.data;
        if (data.alerts != undefined) {
          this.alerttt = data.alerts.title;
        } 
        

        this.weather = `<li><span class="bold">Now: </span>${data.currently.summary}, ${Math.floor(
        data.currently.temperature
      )}</li><li><span class="bold">Today: </span>${data.daily.data[0].summary} ${Math.floor(
        data.daily.data[0].temperatureHigh
      )}/${Math.floor(data.daily.data[0].temperatureLow)}</li>

        <li><span class="bold">Tomorrow: </span>${data.daily.data[1].summary} ${Math.floor(
        data.daily.data[1].temperatureHigh
      )}/${Math.floor(data.daily.data[1].temperatureLow)}</li>`;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style >
  #alerttt{
    background-color: purple;
    color: white;
    font-weight: bold;
}
.bold {font-weight: bold; }
#dark-sky {font-size: .9rem;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif  }
</style>
