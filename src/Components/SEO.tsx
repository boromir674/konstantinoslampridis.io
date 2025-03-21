import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby"

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

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  pathname?: string;
  lang?: string;
  meta?: any[];
  children?: React.ReactNode;
}
const SEO: FC<SEOProps> = ({
  title,
  description,
  pathname,
  children,
}) => {

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

  // TODO: read schema from props
  const schema = {
    "@context": "http://schema.org/",
    "@type": "Person",
    "name": "Konstantinos Lampridis",
    "jobTitle": "Software Engineer",
    "url": "https://konstantinoslampridis.io",
    "sameAs": [
      "https://www.linkedin.com/in/konstantinos-lampridis"
    ],
    "email": "k.lampridis@hotmail.com",
    "telephone": "+1234567890",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Thessaloniki",
      "addressCountry": "Greece"
    }
  };

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
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// try to force server side render once
const renderedSEOElement = <SEO />

const SEOWrapper = () => renderedSEOElement;

export default SEOWrapper;
