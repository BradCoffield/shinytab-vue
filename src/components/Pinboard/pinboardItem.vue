<template>
    <li class="pinboardItemWrap">
  <ul>
        <li class="pinboardItemTitle"><a :href="link">{{title}} <span class="smallish italic pinboardItemTags">{{tags}}</span></a>
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
    color:inherit;
    text-decoration: none;  
}
.pinboardItemTags {
    margin-left: 1rem;
}
.pinboardItemWrap {
    margin-bottom: 1rem;
}
</style>
