import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    // they help with SEO too
    // these get automatically put into the GraphQL data layer
    title: `Konstantinos Lampridis Online`,
    description: `The online professional profile of Konstantinos Lampridis'. In this website, one can view Konstantinos Lampridis' contact information, Curicculum Vitae (CV), and Open Source Projects Portfolio.`,
    siteUrl: `https://konstantinoslampridis.io`,
    keywords: ['konstantinos lampridis', 'lampridis', 'cv', 'resume', 'portfolio', 'contact', 'online', 'professional', 'career', 'professional career', 'profile', 'open source', 'projects', 'software', 'engineer', 'developer', 'software engineer', 'software developer', 'full stack', 'full stack developer', 'full stack engineer', 'devops engineer', 'ai', 'artificial intelligence', 'python'],

    // twitterUsername: `@todo-username`,
    // image: `/a-brand-or-sth-icon.png`,
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
    `gatsby-plugin-react-helmet`,  // a wrapper component for SEO
  ],
};

export default config;
