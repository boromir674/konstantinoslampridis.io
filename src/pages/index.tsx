import React from "react";
import type { HeadFC } from "gatsby";
import IndexPage from "../Components/App";
import BuildTimeTitle from '../Components/TitleElement';

// BODY element
// DECLARE what element tree to put in the <body> of html (index) page
export default IndexPage;

// TITLE element

// since we use gatsby as static site generator
// we set the <title> html element text to the user name at build time assuming
// it is extracted in the GraphQL layer



// type BuildTimeSourcePluginDataGraphQLData = {
//   userDefinedWebsiteData: {
//     personal: {
//       name: string;
//     };
//   };
// };


// const {
//   userDefinedWebsiteData: {
//     personal: { name },
//   },
// } = useStaticQuery<BuildTimeSourcePluginDataGraphQLData>(graphql`
//   query {
//     userDefinedWebsiteData {
//       personal {
//         name
//       }
//     }
//   }
// `);

// DECLARE the 'content' of the <title> element of the html (index) page
export const Head: HeadFC = () => <BuildTimeTitle/>;
// export const Head: HeadFC = () => <title>{name}</title>;
