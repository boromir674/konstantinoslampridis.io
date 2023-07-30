import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  flags: {
    DEV_SSR: true
  },
  siteMetadata: {
    title: `Konstantinos Lampridis Online`,
    description: `The online professional profile of Konstantinos Lampridis'. In this website, one can view Konstantinos Lampridis' contact information, Curicculum Vitae (CV), and Open Source Projects Portfolio.`,
    // twitterUsername: `@todo-username`,
    // image: `/a-brand-or-sth-icon.png`,
    siteUrl: `https://konstantinoslampridis.io`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
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
  ],
}

export default config;
