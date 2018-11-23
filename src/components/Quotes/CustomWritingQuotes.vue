<template>
    <div class="sub-container">
        <div class="custom-writing-quote-quote">{{quoteItself}}</div><div class="custom-writing-quote-person smallish">{{author}}</div>
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
    this.$http.get('https://shinytab.herokuapp.com/quotes/writing').then(res => {
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

