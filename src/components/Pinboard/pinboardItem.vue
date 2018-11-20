<template>
    <li class="pinboardItemWrap">
  <ul>
        <li class="pinboardItemTitle"><a :href="link">{{title}}</a>
        </li> <li>{{description}}</li>
        <li class="pinboardItemTags">  {{tags}}</li>
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
    color: #333;
}
.pinboardItemTags {
    margin-left: 1rem;
}
.pinboardItemWrap {
    margin-bottom: 1rem;
}
</style>
