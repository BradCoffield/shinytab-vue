<template>
    <div>
  
               <img src="https://source.unsplash.com/random" width="275" @click="isImageModalActive = true">
            
            <b-modal :active.sync="isImageModalActive">
                <p class=" "  >
                       <img  src="https://source.unsplash.com/random" alt="">
                </p>
            </b-modal>

      
    </div>
</template>
<script>
export default {
     data(){
        return {
             
             isImageModalActive: false,
        }
}}
</script>
