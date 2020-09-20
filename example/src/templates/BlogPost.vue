<template>
  <layout>
    <g-link to="/">Back</g-link>
    <div style="padding-bottom: 20px;">
      {{ $page.blogPost.title }}
      <a target="_blank" :href="$page.blogPost.link">{{ $page.blogPost.link }}</a>
    </div>
  </layout>
</template>

<script>
export default {
  name: "BlogPost"
}
</script>


<page-query>
query Post ($path: String) {
blogPost (path: $path) {
id
path
title
link
}
}

</page-query>

<style scoped>

</style>
