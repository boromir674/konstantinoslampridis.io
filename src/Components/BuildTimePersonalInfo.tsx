import React, { useCallback } from "react";
import { graphql, useStaticQuery } from "gatsby";
import PersonalInfo from "./PersonalInfo";

interface PersonalInfoProps {
  name: string;
  email: string;
  github: string;
  gitlab: string;
  linkedin: string;
}

const BuildTimePersonalInfo: React.FC = () => {
  // Fetch data using the sourceNodes API and the custom createNode action
  const data = useStaticQuery(graphql`
    query PersonalWebsiteData{
        example {
            personal {
              name
            }
        }
    }
  `);

//   const data = useStaticQuery(graphql`
//     query {
//       example {
//         personal {
//           name
//           email
//           phone
//           location
//           links {
//             name
//             url
//           }
//           description
//         }
//       }
//     }
//   `);
//   return (
//     <PersonalInfo
//       {data.allRepository.nodes.map((repo) => {
//         return (
//           <p key={repo.name}>
//             {repo.name} -- {repo.stargazerCount}
//           </p>
//         );
//       })}
//     </main>
//   );
    return (
        <a>{data.example.personal.name}</a>
    //   <PersonalInfo
    //       name={data.allRepository.personal.name}
    //       email={data.exampleYaml.personal.email}
    //       github={data.exampleYaml.personal.links[0].url}
    //       gitlab={data.exampleYaml.personal.links[1].url}
    //       linkedin={data.exampleYaml.personal.links[2].url}
    //   />
    );
};

export default BuildTimePersonalInfo;
