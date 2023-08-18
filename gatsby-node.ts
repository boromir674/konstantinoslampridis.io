/* Provides nodes, which instruct gatsby to put data into the Data Layer*/
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
    id: string;
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
  portfolio: {
    title: string;
    development_period: string;
    status: string;
    description: string;
    source_code_repo: string;
    release: {
      artifact_type: string;
      version: string;
      name: string;
    }[];
    tags: string[];
  }[];
};


const sourceNodes = async ({
  actions: { createNode },
  // createNodeId,
  createContentDigest,
}: CreateNodeArgs) => {
  try {
    // Read the YAML files

    // Personal, Education, Professional Data
    const yamlData = fs.readFileSync('data.yaml', 'utf8');

    // Parse the YAML data
    const data: UserDefinedTextData = yaml.safeLoad(yamlData);
    
    // Open Source Portfolio / Projects
    const portfolioYamlData = fs.readFileSync('data-portfolio.yml', 'utf8');
    const portfolioData = yaml.safeLoad(portfolioYamlData);
    console.log('DEBUG', portfolioData)
    
    data.portfolio = portfolioData.projects;

    console.log('DATA');
    console.log(data);
    
    // insert into the Data Layer, which exposes a GraphQL API
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
