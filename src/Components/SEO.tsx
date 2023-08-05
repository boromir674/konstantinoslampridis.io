import React, { FC } from "react";
// import { useSiteMetadata } from "../Hooks/useSiteMetadata";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby"

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  pathname?: string;
  lang?: string;
  meta?: any[];
  children?: React.ReactNode;
}

interface ConfigSiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  keywords: string[];
}
type QueryResult = {
  site: {
    siteMetadata: ConfigSiteMetadata;
}
}
export const SEO: FC<SEOProps> = ({
  title,
  description,
  pathname,
  children,
}) => {
  // PREV Implementation
  // const {
  //   title: defaultTitle,
  //   description: defaultDescription,
  //   siteUrl,
  //   keywords: defaultKeywords,
  //   image,
  //   twitterUsername,
  // } = useSiteMetadata();
  // const seo = {
  //   title: title || defaultTitle,
  //   description: description || defaultDescription,
  //   url: `${siteUrl}${pathname || ``}`,
  //   keywords: defaultKeywords,
  //   image: `${siteUrl}${image}`,
  //   twitterUsername,
  // };

  // NEW Implementatinon
  const {
    site: {
      siteMetadata
    }
  }: QueryResult = useStaticQuery<{
    site: {
      siteMetadata: ConfigSiteMetadata
    }
  }>(graphql`
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

  const seo = {
    title: title || siteMetadata.title,
    description: description || siteMetadata.description,
    url: `${siteMetadata.siteUrl}${pathname || ``}`,
    keywords: siteMetadata.keywords,
    // image: `${siteMetadata.siteUrl}${image}`,
    // twitterUsername,
  };

  const slug = '/';
  const meta: {
    name: string;
    content: string;
  }[] = [];

  return (
    <Helmet
      htmlAttributes={{ lang: `en` }}
      title={seo.title}
      titleTemplate={`%s | ${seo.title}`}
      meta={[
        {
          name: `description`,
          content: seo.description,
        },
        {
          name: `keywords`,
          content: seo.keywords.join(`, `),
        },
        {
          property: `og:title`,
          content: seo.title,
        },
        {
          property: `og:description`,
          content: seo.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        //   {
        //     name: `twitter:card`,
        //     content: `summary`,
        //   },
        //   {
        //     name: `twitter:creator`,
        //     content: site.siteMetadata?.author || ``,
        //   },
        //   {
        //     name: `twitter:title`,
        //     content: title,
        //   },
        //   {
        //     name: `twitter:description`,
        //     content: metaDescription,
        //   },
      ].concat(meta)}
    >
      <link rel="canonical" href={`${seo.url}${slug}`} />
    </Helmet>
  );
};
