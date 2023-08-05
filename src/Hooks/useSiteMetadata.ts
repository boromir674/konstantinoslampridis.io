/* Provides a hook to request site metadata from the GraphQL data layer. */
import { graphql, useStaticQuery } from "gatsby"

type SiteMetadata = {
    title: string
    description: string
    siteUrl: string
    keywords: string[]
    twitterUsername?: string
    image?: string
}
// * @return {SiteMetadata} Brief description of the returning value here.

/** 
* Request Site Metadata by querying the siteMetadata in the GraphQL data layer
* @summary Requests the Site Metadata by querying the site.siteMetadata
*   "object" in the GraphQL data layer. Site Metadata are automatically added
*   to the GraphQL data layer through gatsby-config file.
*/
export const useSiteMetadata = (): SiteMetadata => {
    //   twitterUsername
    //   image
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          keywords
        }
      }
    }
  `)

  return data.site.siteMetadata
}
