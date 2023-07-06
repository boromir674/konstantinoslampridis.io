import type { HeadFC } from "gatsby";
import BuildTimeTitle from "../Components/TitleElement";

// import IndexPage from "../Components/App";

import IndexPage from "../Components/App2";

// BODY element
// DECLARE what element tree to put in the <body> of html (index) page
export default IndexPage;


// TITLE element

// since we use gatsby as static site generator
// we set the <title> html element text to the user name at build time assuming
// it is extracted in the GraphQL layer

// the HeadFC Component allows to alter the <head> html element or insert elements in it

// ADD the <title> element in the <hear> of the html document
export const Head: HeadFC = () => <BuildTimeTitle />;
