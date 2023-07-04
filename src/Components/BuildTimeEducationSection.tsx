import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { Education } from "./Education";


interface EducationItemUserTextData {
  name: string;
  location: string;
  degree: string;
  date: string;
  thesis_title: string;
  topics: string[];
}

type QueryEducationResult = {
  userDefinedWebsiteData: {
    education: EducationItemUserTextData[];
  };
};

interface BuildTimeEducationSectionProps {
  theme: EducationSectionTheme;
}

interface EducationItemTheme {
  backgroundColor: string;
  textColor: string;
  linkColor: string;
  onHoverBackgroundColor: string;
  onHoverTextColor: string;
  // onHoverTransitionDelay: string;
  onHoverTransformDuration: string;
  onHoverBackgroundColorChangeDuration: string;
}

interface EducationSectionTheme {
  item: EducationItemTheme;
}

const BuildTimeEducationSection: React.FC<BuildTimeEducationSectionProps> = (props) => {
  const {
    userDefinedWebsiteData: { education },
  } = useStaticQuery<QueryEducationResult>(graphql`
    query {
      userDefinedWebsiteData {
        education {
          name
          location
          degree
          thesis_title
          date
          topics
        }
      }
    }
  `);

  return (
    <Education
    theme={props.theme}
      data={education.map((item: EducationItemUserTextData, index: number) => ({
        degree_title: item.degree,
        university_name: item.name,
        location: item.location,
        duration: item.date,
        thesis_title: item.thesis_title,
        topics: item.topics,
      }))}
    />
  );
};

export default BuildTimeEducationSection;
