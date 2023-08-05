import type { HeadFC } from "gatsby";
import { SEO } from "../Components/SEO"
import IndexPage from "../Components/App2";


//////// BODY <body> element ////////

// DECLARE what element tree to put in the <body> of html (index) page
export default IndexPage;


//////// HEAD <head> element ////////

// the HeadFC Component allows to alter the <head> html element or insert elements in it

// ADD content of the <head> element mostly used for metadata nd SEO
export const Head: HeadFC = () => <SEO />;
