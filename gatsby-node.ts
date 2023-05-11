import { CreateNodeArgs, GatsbyNode } from 'gatsby';
import yaml from 'js-yaml';
import fs from 'fs';

interface PersonalWebsiteData {
  name: string;
  email: string;
  phone: string;
  location: string;
  links: {
    name: string;
    url: string;
  }[];
  description: string;
};


// const sourceNodes : GatsbyNode["sourceNodes"] = async ({
//   actions: { createNode },
//   createNodeId,
//   createContentDigest
// }: CreateNodeArgs) => {

const sourceNodes = async ({
  actions: { createNode },
  // createNodeId,
  createContentDigest,
}: CreateNodeArgs) => {
  try {
    // Read the YAML file
    const yamlData = fs.readFileSync('data.yaml', 'utf8');

    // // Parse the YAML data
    const data: PersonalWebsiteData = yaml.safeLoad(yamlData);
    console.log('DATA');
    console.log(data);
    // create node for build time data
    createNode({
      ...data,
      // required fields
      id: 'user-defined-build-time-data',
      parent: null,
      children: [],
      internal: {
        // use type to "select" GraphQL node/Query. Example below
        // query {
        //   elaPameEdw {
        //     name
        //   }
        // }
        type: 'UserDefinedWebsiteData',
        content: JSON.stringify(data),
        contentDigest: createContentDigest(data),
      },
    });
  } catch (error) {
    console.error('Error reading or parsing YAML file:', error);
  }
};


export { sourceNodes };
