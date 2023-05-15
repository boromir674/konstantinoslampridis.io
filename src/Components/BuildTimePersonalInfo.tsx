import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import PersonalInfo from "./PersonalInfo";
import Education from './Education';

interface PersonalInfoProps {
  name: string;
  email: string;
  github: string;
  gitlab: string;
  linkedin: string;
  links: {
    name: string;
    url: string;
  }[];
};

type SourcePluginData = {
  userDefinedWebsiteData: {
    personal: PersonalInfoProps;
  }
};

const BuildTimePersonalInfo: React.FC = () => {
  // Fetch data using the sourceNodes API and the custom createNode action
  const { userDefinedWebsiteData: { personal } }: SourcePluginData = useStaticQuery(graphql`
    query {
      userDefinedWebsiteData {
        personal {
          name
          email
          phone
          location
          links {
            name
            url
          }
          description
        }
      }
    }
  `);

    return (
      <>
        <PersonalInfo
            name={personal.name}
            email={personal.email}
            github={personal.links[0].url}
            gitlab={personal.links[1].url}
            linkedin={personal.links[2].url}
        />
        <Education />
      </>
    );
};

export default BuildTimePersonalInfo;
