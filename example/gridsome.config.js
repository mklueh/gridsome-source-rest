// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
    siteName: 'Gridsome Source Rest',
    siteUrl: 'https://mklueh.github.io',
    pathPrefix: '/gridsome-source-rest',
    transformers: {
        remark: {
            externalLinksTarget: '_blank',
            externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
            plugins: []
        }
    },
    plugins: [
        {
            use: 'gridsome-source-rest',
            options: {
                endpoint: 'https://gist.githubusercontent.com/mklueh/ee707de96586f4b0776165facf9a5f00/raw/13291cecd49d8dcd072f9d252b25bf080e21f211/demo-posts-api.json'
                ,//'http://localhost:3000/posts',
                typeName: 'BlogPost'
            }
        },
        {
            use: 'gridsome-source-rest',
            options: {
                endpoint: 'https://gist.githubusercontent.com/mklueh/6a988fd01b1821acfd9277d32a70db16/raw/12d46be1d7cd51cd65862c1bf0959f078f76fc2f/demo-settings-api.json',
                //http://localhost:3000/settings
                typeName: 'settings',
                isStatic: true
            }
        },

    ],
    templates: {
        BlogPost: '/blog/:title'
    }
}
