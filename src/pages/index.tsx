import type { HeadFC } from "gatsby";
import BuildTimeTitle from "../Components/TitleElement";

import IndexPage from "../Components/App2";

//////// FONT AWESOME configuration ////////

// See https://stackoverflow.com/questions/56334381/why-my-font-awesome-icons-are-being-displayed-big-at-first-and-then-updated-to-t
// See https://github.com/FortAwesome/react-fontawesome/issues/134

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';

// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false; /* eslint-disable import/first */


//////// BODY <body> element ////////

// DECLARE what element tree to put in the <body> of html (index) page
export default IndexPage;


//////// TITLE <title> element ////////

// since we use gatsby as static site generator
// we set the <title> html element text to the user name at build time assuming
// it is extracted in the GraphQL layer

// the HeadFC Component allows to alter the <head> html element or insert elements in it

// ADD the <title> element in the <head> of the html document
export const Head: HeadFC = () => <BuildTimeTitle />;
