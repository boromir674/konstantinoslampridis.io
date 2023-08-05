import React, { FC } from "react";
import { useSiteMetadata } from "../Hooks/useSiteMetadata";
import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  pathname?: string;
  lang?: string;
  meta?: any[];
  children?: React.ReactNode;
}

export const SEO: FC<SEOProps> = ({
  title,
  description,
  pathname,
  children,
}) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    keywords: defaultKeywords,
    image,
    twitterUsername,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
    keywords: defaultKeywords,
    image: `${siteUrl}${image}`,
    twitterUsername,
  };

  //   return (
  //     <>
  //       <title>{seo.title}</title>
  //       <meta name="description" content={seo.description} />
  //       {/* <meta name="image" content={seo.image} /> */}
  //       {/* <meta name="twitter:card" content="summary_large_image" />
  //       <meta name="twitter:title" content={seo.title} />
  //       <meta name="twitter:url" content={seo.url} />
  //       <meta name="twitter:description" content={seo.description} />
  //       <meta name="twitter:image" content={seo.image} />
  //       <meta name="twitter:creator" content={seo.twitterUsername} /> */}
  //       {/* <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>" /> */}
  //       {/* <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>" /> */}
  //       {children}
  //     </>
  //   )
  const meta: {
    name: string;
    content: string;
  }[] = [];

  return (
    <Helmet
      title={seo.title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
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
    />
  );
};
