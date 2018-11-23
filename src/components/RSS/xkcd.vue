<template>
   <div class="sub-container" id="xkcd"></div>
</template>
<script>
 
export default {
    created(){
          this.$http
          .get(`https://shinytab.herokuapp.com/rss/0`)
          .then(res => {
            let data = res.data;
           
            let xk = document.getElementById("xkcd");
            xk.insertAdjacentHTML(
              "beforeend",
              `<a href="#xkcd-big"><span>${data.description}</span></a>
        
    <div class="lightbox" id="xkcd-big">
    <div class="box">
        <a class="close" href="#">X</a>
        <p class="title">${data.title}</p>
        <div class="content">
        <a href="${data.link}" target="_blank">
         
        ${data.description}</a>
            <!-- Your content here -->
        </div>
    </div>
</div>
        `
            );
          })
          .catch(err => console.log(err));
    }
}
</script>
