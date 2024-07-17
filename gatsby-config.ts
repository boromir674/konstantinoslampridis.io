import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  flags: {
    DEV_SSR: true,
  },
  // example query: data.site.siteMetadata.siteUrl
  siteMetadata: {
    // they help with SEO too
    // these get automatically put into the GraphQL data layer
    title: `Konstantinos Lampridis Online`,
    description: `The online professional profile of Konstantinos Lampridis'. In this website, one can view Konstantinos Lampridis' contact information, Curicculum Vitae (CV), and Open Source Projects Portfolio.`,
    siteUrl: `https://konstantinoslampridis.io`,
    keywords: [
      "konstantinos lampridis",
      "lampridis",
      "cv",
      "resume",
      "portfolio",
      "contact",
      "online",
      "professional",
      "career",
      "professional career",
      "profile",
      "open source",
      "projects",
      "software",
      "engineer",
      "developer",
      "software engineer",
      "software developer",
      "full stack",
      "full stack developer",
      "full stack engineer",
      "devops engineer",
      "ai",
      "artificial intelligence",
      "python",
    ],

    // twitterUsername: `@todo-username`,
    // image: `/a-brand-or-sth-icon.png`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,

  ////////// Gatsby plugins //////////
  plugins: [
    `gatsby-plugin-emotion`,
    // in case you have a graphql service to provide data you can configure as example below:
    // {
    //   resolve: `gatsby-source-graphql`,
    //   options: {
    //     typeName: `GitHub`,
    //     fieldName: `github`,
    //     url: `https://api.github.com/graphql`,  // a url to a graphql server (ie could be strapi))
    //     headers: {
    //       Authorization: `Bearer your-github-token`,
    //     },
    //   },
    // }

    // Add support for integrating with the '' plugin
    // See https://www.gatsbyjs.com/plugins/gatsby-plugin-react-svg/#:~:text=The%20following%20configuration%20uses%20svg,process%20SVGs%20from%20everywhere%20else.&text=From%20now%20on%20you%20can,svg%22%3B%20%2F%2F%20...

    //   {
    //   resolve: "gatsby-plugin-react-svg",
    //   options: {
    //     rule: {
    //       include: /static/
    //     }
    //   }
    // }

    ////// SEO //////
    // TODO: use vanilla feature of Gatsby to manipulate the <head> and put SEO metadata
    `gatsby-plugin-react-helmet`, // a wrapper component for SEO

    ////// SITE MAP Generator from single source of truth //////
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        // since we develop an SPA we have only 1 Page with Content to display
        // And since the page's url can be retrieved from
        // site.siteMetadata.siteUrl (see 'siteMetadata' above)
        // we can ommit the 'query' key and use the default
        //   query: `
        //   {
        //     allSitePage {
        //       nodes {
        //         path
        //       }
        //     }
        //     allWpContentNode(filter: {nodeType: {in: ["Post", "Page"]}}) {
        //       nodes {
        //         ... on WpPost {
        //           uri
        //           modifiedGmt
        //         }
        //         ... on WpPage {
        //           uri
        //           modifiedGmt
        //         }
        //       }
        //     }
        //   }
        // `,
        // for the same reason we can use the default value (function) for 'resolveSiteUrl'
        // resolveSiteUrl: () => siteUrl,

        // 'resolvePages' should leverage the data.allSitePage.edges object
        // list to define how to extract pages

        // at the moment of writing, the below GraphQL query

        // allSitePage {
        //   nodes {
        //     path
        //   }
        // }

        // gets from the Data Layer an object as below:

        // "data": {
        //   "allSitePage": {
        //     "nodes": [
        //       {
        //         "path": "/dev-404-page/"
        //       },
        //       {
        //         "path": "/404/"
        //       },
        //       {
        //         "path": "/404.html"
        //       },
        //       {
        //         "path": "/"
        //       }
        //     ]
        //   }
        // },

        // resolvePages: ({
        //   allSitePage: { nodes: allPages },
        //   allWpContentNode: { nodes: allWpNodes },
        // }) => {
        //   const wpNodeMap = allWpNodes.reduce((acc, node) => {
        //     const { uri } = node
        //     acc[uri] = node

        //     return acc
        //   }, {})

        //   return allPages.map(page => {
        //     return { ...page, ...wpNodeMap[page.path] }
        //   })
        // },

        serialize: ({
          path,
          modifiedGmt,
        }: {
          path: string;
          modifiedGmt: any;
        }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          };
        },
      },
    },

    // Utilities for testing Gatsby sites, such as testing GraphQL query-dependent Components
    // "gatsby-plugin-testing",  // TODO: plug in only when Testing

    // // WEBPACK BUNDLE ANALYZER - Gatsby Plugin
    // // ability for interactive bundle size exploration
    // {
    //   resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
    //   options: {
    //     // run bundle exploration server on `gatsby develop`
    //     devMode: true,
    //     analyzerMode: "server",
    //     analyzerPort: "8888",
    //     analyzerHost: "0.0.0.0",
    //     defaultSizes: "gzip"
    //   },
    // },


    ////////// PLUGIN gatsby-plugin-manifest //////////

    // Generate a manifest file for the site and favicon's for various devices
    // https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/
    // combine with gatsby-plugin-offline to declare Service Workers in the manifest

    // Chromium-based browsers, including Google Chrome, Samsung Internet, and Microsoft Edge, require that the manifest includes the following members:
    // name or short_name
    // icons must contain a 192px and a 512px icon
    // start_url
    // display and/or display_override
    // prefer-related-application must be false or not present

    // Notes:
    // - A manifest with Service Workers (to help run in offline/bad-connection situations)
    //   is a PWA prerequisite
    // - A favicon helps eliminate console 404 errors and makes the site look more professional
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Konstantinos Lampridis`,
        short_name: `K. Lampridis`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        // https://web.dev/articles/add-manifest#display
        // 'standalone', 'fullscreen', 'minimal-ui', 'browser'
        display: `standalone`,
        // generates favicons at different implicit sizes
        // one of formats: JPEG, PNG, WebP, TIFF, GIF or SVG
        icon: `static/favicon.png`, // This path is relative to the root of the site.
        // Cache busting for icons
        cache_busting_mode: `none`, // `query`(default), `name`, or `none`
      },
    },

    ////////// PLUGIN gatsby-plugin-offline //////////
    // fix dependencies and update gatsby to newer before trying this plugin
    // {
    //   resolve: `gatsby-plugin-offline`,
    //   options: {
    //     precachePages: [`/`],
    //     // workboxConfig: {
    //     //   importWorkboxFrom: `cdn`,
    //     // },
    //     workboxConfig: {
    //       // below needs cache_busting_mode: `none` from gatsby-plugin-manifest
    //       globPatterns: ['**/icon*.png']
    //    }
 
    //   },
    // },

  ],
};

export default config;
