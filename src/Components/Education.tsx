import React from 'react';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from "gatsby"
import AppTag from './AppTag';

const EducationContainer = styled.div`
  margin-top: 20px;
`;

// const EducationItem = styled.div`
//   margin-bottom: 20px;
// `;

const UniversityTitle = styled.h3`
  margin-bottom: 5px;
`;

const Location = styled.p`
  font-size: 16px;
  color: #888;
  margin-top: 5px;
`;

const DegreeTitle = styled.h4`
  margin-bottom: 5px;
`;

const StudiesDuration = styled.span`
  font-style: italic;
  margin-bottom: 10px;
`;

const ThesisTitle = styled.p`
  margin-bottom: 5px;
`;

const TopicTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  // margin-top: 10px;
`;

interface EducationItemUserTextData {
  name: string;
  location: string;
  degree: string;
  date: string;
  thesis_title: string;
  topics: string[];
}

interface EducationItemProps {
  university: string;
  degree: string;
  duration: string;
  thesis: string;
  topics: string[];
  location: string;
}

const EducationItem: React.FC<EducationItemProps> = ({
  university,
  degree,
  duration,
  thesis,
  topics,
  location,
}) => {
  return (
    <EducationContainer>
      <UniversityTitle>{university}</UniversityTitle>
      <Location>{location}</Location>
      <DegreeTitle>{degree}</DegreeTitle>
      <StudiesDuration>{duration}</StudiesDuration>
      <ThesisTitle>Thesis: {thesis}</ThesisTitle>
      <TopicTagsContainer>
        {topics.map((topic, index) => (
          <AppTag
            key={index}
            theme={{
              backgroundColor: "#FFAD00",
              textColor: "#333",
              onHoverBackgroundColor: "#ddd",
              onHoverTextColor: "#333",
            }}
          >{topic}</AppTag>
        ))}
      </TopicTagsContainer>
    </EducationContainer>
  );
};

const Education: React.FC = () => {
  const { userDefinedWebsiteData: { education } } = useStaticQuery(graphql`
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
    <EducationContainer>
      {education.map((item: EducationItemUserTextData, index: number) => (
        <EducationItem
          key={index}
          university={item.name}
          location={item.location}
          degree={item.degree}
          duration={item.date}
          thesis={item.thesis_title}
          topics={item.topics}
        />
      ))}
    </EducationContainer>
  );
};

export default Education;
