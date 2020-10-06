<template>
  <Layout>
    <h1>gridsome-source-rest example</h1>

    <p>
      This Example shows a simple implementation of the <a href="https://github.com/mklueh/gridsome-source-rest">gridsome-source-rest</a>
      plugin.
      Posts below are fetched from GitHub Gist or a Demo REST API in the /api directory.
    </p>

    <i>
      {{ $static.metadata.settings.metaField }}
    </i>

    <div>
      <ul>
        <li v-for="post in $page.posts.edges">
          <g-link :to="post.node.path">{{ post.node.title }}</g-link>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'gridsome-source-rest example'
  }
}
</script>

<static-query>
query{
metadata{
settings{
metaField
}
}
}
</static-query>

<page-query>
query {
posts:allBlogPost {
edges {
node {
id
path
title
}
}
}
}

</page-query>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
