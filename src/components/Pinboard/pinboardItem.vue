<template>
    <li class="pinboardItemWrap">
  <ul>
        <li class="pinboardItemTitle"><a :href="link">{{title}} </a><span class="smallish italic pinboardItemTags">{{tags}}</span>
        </li> <li class="mediumish">{{description}}</li>
         
        </ul>  
        
    </li>
</template>
<script>
export default {
    props: ['link', 'title', 'tags', 'description']
    
}
</script>

<style scoped>
.pinboardItemTitle a {
   
    text-decoration: none;  
}
.pinboardItemTags {
    margin-left: 1rem;
    font-size: .8rem
}
.pinboardItemWrap {
    margin-bottom: 1rem;
}
.mediumish {
    font-size: 12px;
    margin-left: 1rem;
}
</style>
