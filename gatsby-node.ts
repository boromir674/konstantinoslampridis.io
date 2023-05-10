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
      id: 'example-build-time-data',
      parent: null,
      children: [],
      internal: {
        type: 'Example',
        content: JSON.stringify(data),
        contentDigest: createContentDigest(data),
      },
    });
  } catch (error) {
    console.error('Error reading or parsing YAML file:', error);
  }
};


export { sourceNodes };



// LEGACY

// // const fetch = (...args) =>
// //   import(`node-fetch`).then(({ default: fetch }) => fetch(...args))

// // exports.sourceNodes = async ({
// //   actions: { createNode },
// //   createContentDigest,
// // }) => {
// //   // get data from an API or from a source at build time
// // //   const result = await fetch(`https://api.github.com/repos/gatsbyjs/gatsby`)
// // //   const resultData = await result.json()
// //     const resultData = {
// //         sections: [
// //             'Introduction',
// //             'Open Source',
// //             'Career',
// //         ],
// //         profile: {
// //             'firstName': 'Konstantinos',
// //             'lastName': 'Lampridis',
// //         },    
// //     }
// //   // create node for build time data example in the docs
// //   createNode({
// //     // nameWithOwner and url are arbitrary fields from the data
// //     sections: resultData.sections,
// //     profile: resultData.profile,
// //     // required fields
// //     id: `myData-build-time-data`,
// //     parent: null,
// //     children: [],
// //     internal: {
// //       type: `Example`,
// //       contentDigest: createContentDigest(resultData),
// //     },
// //   })
// // }

// // TODO
// // Follow this guidie to implement a custom data source plugin in a separate file and
// // configure this file to "use" the plugin
// // https://www.gatsbyjs.com/docs/tutorial/creating-a-source-plugin/part-2/

// type Section = {
//   id: number
//   name: string
// };

// export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
//   actions,
//   createNodeId,
//   createContentDigest,
// }) => {
//   const { createNode } = actions

// //   const data = await getSomeData()
//   const data = [
//     {
//         id: 1,
//         name: 'Introduction',
//     },
//     {
//         id: 2,
//         name: 'Open Source',
//     },
//     {
//         id: 3,
//         name: 'Career',
//     },
//   ]

//   data.forEach((section: Section) => {
//     const node = {
//       ...section,
//       parent: null,
//       children: [],
//       id: createNodeId(`section__${section.id}`),
//       internal: {
//         type: "Section",
//         content: JSON.stringify(section),
//         contentDigest: createContentDigest(section),
//       },
//     }

//     createNode(node)
//   })
// }


// export default sourceNodes;
