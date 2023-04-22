import type { GatsbyNode } from "gatsby";

// const fetch = (...args) =>
//   import(`node-fetch`).then(({ default: fetch }) => fetch(...args))

// exports.sourceNodes = async ({
//   actions: { createNode },
//   createContentDigest,
// }) => {
//   // get data from an API or from a source at build time
// //   const result = await fetch(`https://api.github.com/repos/gatsbyjs/gatsby`)
// //   const resultData = await result.json()
//     const resultData = {
//         sections: [
//             'Introduction',
//             'Open Source',
//             'Career',
//         ],
//         profile: {
//             'firstName': 'Konstantinos',
//             'lastName': 'Lampridis',
//         },    
//     }
//   // create node for build time data example in the docs
//   createNode({
//     // nameWithOwner and url are arbitrary fields from the data
//     sections: resultData.sections,
//     profile: resultData.profile,
//     // required fields
//     id: `myData-build-time-data`,
//     parent: null,
//     children: [],
//     internal: {
//       type: `Example`,
//       contentDigest: createContentDigest(resultData),
//     },
//   })
// }

// TODO
// Follow this guidie to implement a custom data source plugin in a separate file and
// configure this file to "use" the plugin
// https://www.gatsbyjs.com/docs/tutorial/creating-a-source-plugin/part-2/

type Section = {
  id: number
  name: string
};

export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

//   const data = await getSomeData()
  const data = [
    {
        id: 1,
        name: 'Introduction',
    },
    {
        id: 2,
        name: 'Open Source',
    },
    {
        id: 3,
        name: 'Career',
    },
  ]

  data.forEach((section: Section) => {
    const node = {
      ...section,
      parent: null,
      children: [],
      id: createNodeId(`section__${section.id}`),
      internal: {
        type: "Section",
        content: JSON.stringify(section),
        contentDigest: createContentDigest(section),
      },
    }

    createNode(node)
  })
}


export default sourceNodes;
