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
interface UserDefinedTextData {
  personal: PersonalWebsiteData,
  education: {
    name: string;
    location: string;
    degree: string;
    thesis_title: string;
    date: string;
    tags: string[];
  }[];
  professional: {
    experience_items: {
      title: string;
      company: string
      location: string;
      duration: string;
      description: string;
      activities: string[];
      technology_tags: string[];
    }[];
  };
};


const sourceNodes = async ({
  actions: { createNode },
  // createNodeId,
  createContentDigest,
}: CreateNodeArgs) => {
  try {
    // Read the YAML file
    const yamlData = fs.readFileSync('data.yaml', 'utf8');

    // // Parse the YAML data
    const data: UserDefinedTextData = yaml.safeLoad(yamlData);
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
        //   userDefinedWebsiteData {
        //     personal
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
