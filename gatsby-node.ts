/* Placeholders to customize the Gatsby build process, like adding built-time data */

/* Gatsby gives plugins and site builders many APIs for building your site.
* Code in the file gatsby-node.js/gatsby-node.ts is run once in the process
* of building your site. You can use its APIs to create pages dynamically,
* add data into GraphQL, or respond to events during the build lifecycle.
*/

// Gatsby offers various hooks, if you implement the corresponding API
// - https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/

// Quick ref to available hooks
// - onCreateWebpackConfig
// - onCreateBabelConfig
// - onCreatePage
// - onCreateNode
// - createSchemaCustomization
// - createPages
// - createResolvers

import { CreateNodeArgs, GatsbyNode, SourceNodesArgs, PluginOptions, PluginCallback } from "gatsby";
import yaml from "js-yaml";
import fs from "fs";
import { UserDefinedTextData } from "./src/types";


//// PUT DATA INTO THE DATA LAYER ////

/* Instruct Gatsby to put data into the Data Layer, served by the GraphQL API */
// export const sourceNodes: GatsbyNode["sourceNodes"] = async (
//   {
//     actions: { createNode },
//     // createNodeId,
//     createContentDigest,
//   }: SourceNodesArgs,
//   options: PluginOptions,
//   callback: PluginCallback<void>
// ) => {
export const sourceNodes = async ({
  actions: { createNode },
  // createNodeId,
  createContentDigest,
}: CreateNodeArgs) => {
  try {
    // Read the YAML files, parse them, and insert them into the Data Layer (GraphQL API)

    // Read Personal, Education, Professional Data file
    const yamlData = fs.readFileSync("data.yaml", "utf8");

    // Parse Personal, Education, Professional YAML data
    const data: UserDefinedTextData = yaml.safeLoad(yamlData);

    // Read Open Source Portfolio / Projects
    const portfolioYamlData = fs.readFileSync("data-portfolio.yml", "utf8");

    // Parse Open Source Portfolio / Projects YAML data
    const portfolioData = yaml.safeLoad(portfolioYamlData);

    // "attach" the portfolio data to the main data object
    data.portfolio = portfolioData.projects;

    // insert into the Data Layer, which exposes a GraphQL API
    // create node for build time data
    createNode({
      ...data,
      // required fields
      id: "user-defined-build-time-data",
      parent: null,
      children: [],
      internal: {
        // use type to "select" GraphQL node/Query. Example below
        // query {
        //   userDefinedWebsiteData {
        //     personal
        //   }
        // }
        type: "UserDefinedWebsiteData",
        content: JSON.stringify(data),
        contentDigest: createContentDigest(data),
      },
    });

    // callback();
  } catch (error) {
    console.error("Error reading or parsing YAML file:", error);
  }
};
