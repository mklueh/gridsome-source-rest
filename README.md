#  Gridsome REST Source Plugin

[![npm](https://img.shields.io/npm/v/gridsome-source-rest.svg)](https://www.npmjs.com/package/gridsome-source-rest)

Pull data from any **REST API** as a source for your [Gridsome](https://gridsome.org/) site.

The demo below is very simple and shows how to pull data from GitHub Gist or from a dummy REST server.
It is however possible to pull data from literally anywhere with it, for example: **Twitter, eBay, Amazon, Facebook, Instagram** and so on.

### [Demo](https://mklueh.github.io/gridsome-source-rest/)

If you need frequent data updates check if your REST provider supports webhooks that can
trigger your site build or schedule your builds frequently.


## Install

- `yarn add gridsome-source-rest`
- `npm install gridsome-source-rest --save`

## Getting Started


```js
module.exports = {
  plugins: [
    {
      use: "gridsome-source-rest",
      options: {
        debug: false,
        axiosConfig: undefined,
        endpoint: "http://your-api/posts",
        typeName: "BlogPost",
        isStatic: false,
        isCollection: true,
        responseInterceptor: undefined
      }
    }
  ]
};
```

In your **templates** use something like this

```
<page-query>
    query {
      allBlogPost {
        edges {
          node {
            id
            title
            author
          }
        }
      }
    }
</page-query>
```

       
## Options

#### debug

- Type: `boolean`

Enables log messages

#### typeName

- Type: `string` _required_

The collection where our REST API data is stored. Depending on **isStatic / isCollection**
this will either be a **standalone collection** or used as a **name property** in **metadata**

#### endpoint

- Type: `string` _required_

REST API endpoint that will be used to fetch data

#### axiosConfig

- Type: `object` 

Axios config that can be passed and used for example to handle authentication of
a private REST API

#### isCollection

- Type: `[boolean]`
- Default: true

Stores fetched data in a new collection created with **typeName**

#### isStatic

- Type: `[boolean]`
- Default: false

Stores fetched data in the global metadata object. In case your data model is an 
**array**, it will be stored with **typeName** as property

#### responseInterceptor

- Type: `[function]`

Interceptor function that receives the API response and let´s you modify it on the fly
before data is getting added to the Gridsome collection


Based on [axios](https://github.com/axios/axios) and allows setting axios configurations, which allows you to even use authenticated APIs.
