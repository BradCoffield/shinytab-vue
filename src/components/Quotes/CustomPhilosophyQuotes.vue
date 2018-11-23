<template>
    <div class="sub-container">
        <div class="philosophy-quote-quote">{{quoteItself}}</div><div class="philosophy-quote-person smallish">{{author}}</div>
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
    this.$http.get('https://shinytab.herokuapp.com/quotes/philosophy').then(res => {
        console.log(res.data); this.quoteItself = res.data.quote; this.author = res.data.author}).catch((params) => {
        console.log(params)
    })
    
    }
}
</script>
<style scoped>
    .smallish {margin-left:1rem;}
</style>

