<template>
   <!-- <div class="sub-container" id="xkcd"></div> -->
   <!-- <div id="xkcd-wrap" class="image is-128x128" v-html="imgDescription" @click="isImageModalActive = true">  </div>-->
       <div>
           <h3>{{imgTitle}}</h3>
           <div @click="isImageModalActive = true" v-html="imgDescription" class="xkcd modal-pic  ">
               
           </div>
            <b-modal :active.sync="isImageModalActive">
                <p class=" " v-html="imgDescription">
                     
                </p>
            </b-modal>
       </div>
</template>
<script>
 
export default {
    data(){
        return {
            imgUrl: '',
            imgDescription: '',
            imgTitle:'',
             isImageModalActive: false,
        }
    },
    created(){
          this.$http
          .get(`https://shinytab.herokuapp.com/rss/0`)
          .then(res => {
            let data = res.data;
            console.log('yo xkcd',data);
            this.imgUrl = data.link;
            this.imgDescription = data.description;
            this.imgTitle = data.title
           
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
<style lang="scss" scoped>
.xkcd {
    width: 275px;
    max-width: 100%;
}
</style>
