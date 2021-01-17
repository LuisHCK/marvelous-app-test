module.exports = {
    siteMetadata: {
        title: 'Marvelous App',
        description:
            'Introducing the Marvelous app, a revolutionary new way to experience the Marvel Universe on any device',
        author: '@marvelousappinc',
        siteUrl: 'http://localhost:8000',
    },
    plugins: [
        'gatsby-plugin-sass',
        'gatsby-plugin-sharp',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sitemap',
        'gatsby-plugin-offline',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                icon: 'src/images/icon.png',
                short_name: `MarvelousApp`,
                name: "Marvelous App",
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                path: './src/images/',
                display: `minimal-ui`,
            },
        },
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: `images`,
                path: `${__dirname}/src/assets/img`,        
            },
            __key: 'images',
        },
    ],
}
