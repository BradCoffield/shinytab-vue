<template>
    <div class="sub-container">
        <div class="design-quote-quote" v-html="quoteItself"></div><div class="design-quote-person smallish">{{author}}</div>
    </div>  
</template>
<script>
export default {
     data(){
        return{
            quoteItself: "",
            author:""
        }
    },
    created(){
    this.$http.get('https://shinytab.herokuapp.com/quotes/on-design').then(res => {
        console.log(res.data); this.quoteItself = res.data.quote; this.author = res.data.author}).catch((params) => {
        console.log(params)
    })
    
    }


}
</script>
</script>
<style scoped>
    .smallish {margin-left:1rem;}
</style>
