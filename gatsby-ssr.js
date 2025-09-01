/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 * These will run during the build process.
 */

// Set HTML attributes that should be present on every page
export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({
    // we have observed that Helmet "fail" to put the lang attribute on the html element, so we do it here
    lang: "en",
  });
};
