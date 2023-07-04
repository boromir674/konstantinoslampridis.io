import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import ExperienceItemData from "./Professional/ExperienceItemInterface";
import AppProfessionalSection from "./Professional";

type SourcePluginData = {
  userDefinedWebsiteData: {
    professional: {
      experience_items: ExperienceItemData[];
    };
  };
};

interface ProfessionalSectionProps {
  theme: {
    title: {
      textColor: string;
      backgroundColor: string;
    }
    item: {
      backgroundColor: string;
      textColor: string;
      linkColor: string;
      onHoverBackgroundColor: string;
      onHoverTextColor: string;
      onHoverTransformDuration: string;
      onHoverBackgroundColorChangeDuration: string;
    };
    containerBackground: string;
  };
}

const ProfessionalSection: React.FC<ProfessionalSectionProps> = ({ theme }) => {
  // Fetch data using the sourceNodes API and the custom createNode action
  const {
    userDefinedWebsiteData: {
      professional: { experience_items },
    },
  }: SourcePluginData = useStaticQuery(graphql`
    query {
      userDefinedWebsiteData {
        professional {
          experience_items {
            title
            company
            location
            duration
            description
            activities
            technology_tags
          }
        }
      }
    }
  `);
  return (
    <AppProfessionalSection
        data={{ experience_items }}
        theme={theme}
    />
  );
};

export default ProfessionalSection;
