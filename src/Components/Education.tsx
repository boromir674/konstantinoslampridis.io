import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import AppTag from "./AppTag";
import EducationItemData from '../EducationItemDataInterface';

const EducationSectionContainer = styled.div`
  margin-top: 20px;  // how much space will be left between this and the component above
`;

// const EducationItem = styled.div`
//   margin-bottom: 20px;
// `;

const DegreeTitle = styled.h3`
  margin-bottom: 5px;
`;

const UniversityTitle = styled.h4`
  margin-top: 7px;
  margin-bottom: 5px;
  font-style: italic;
`;

const Location = styled.p`
  font-size: 16px;
  // color: #888;
  margin-top: 5px;
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


interface AppEducationSectionProps {
  data: EducationItemData[];
  theme: {
    item: EducationItemTheme;
  }
}

// EDUCATION ITEM
interface EducationItemTheme {
  // other styles
  padding?: string;
  // color mode
  backgroundColor: string;
  textColor: string;
  linkColor: string;
  onHoverBackgroundColor: string;
  onHoverTextColor: string;
  // onHoverTransitionDelay: string;
  onHoverTransformDuration: string;
  onHoverBackgroundColorChangeDuration: string;
  tag: {
    // color design, that switchs on color mode
    backgroundColor: string;
    textColor: string;
    onHoverBackgroundColor: string;
    onHoverTextColor: string;
    outlineColor: string;
  };
}
interface StyledAppEducationItemProps {
  theme: EducationItemTheme;
  children?: React.ReactNode;
}
const StyledAppEduItem = styled.div<StyledAppEducationItemProps>`
  // display: flex;
  padding: ${(props) => props.theme.padding || "0px"};
  background-color: ${(props) =>
    props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  border: 1px solid #ccc;
  transition: transform
      ${(props) => props.theme.onHoverTransformDuration},
    box-shadow 0.3s,
    background-color
      ${(props) =>
        props.theme.onHoverBackgroundColorChangeDuration};
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    background-color: ${(props) =>
      props.theme.onHoverBackgroundColor};
    color: ${(props) =>
      props.theme.onHoverTextColor || props.theme.textColor};
  }
`;
interface AppEducationItemProps {
  userData: EducationItemData;
  theme: EducationItemTheme;
}
/// EDUCATION ITEM
const EducationItem: React.FC<AppEducationItemProps> = ({
  userData: {
    degree_title,
    university_name,
    location,
    duration,
    thesis_title,
    topics,
  },
  theme,
}) => {
  return (
    <StyledAppEduItem theme={theme}>
      <DegreeTitle>{degree_title}</DegreeTitle>
      <UniversityTitle>{university_name}</UniversityTitle>
      <span css={css`
        display: flex;
        flex-wrap: wrap;
      `}><a>
        <Location>{location}</Location><StudiesDuration>{duration}</StudiesDuration>
        </a>
      </span>
      <ThesisTitle>Thesis: {thesis_title}</ThesisTitle>
      <TopicTagsContainer>
        {topics.map((topic, index) => (
          <AppTag
            key={index}
            theme={theme.tag}
          >
            {topic}
          </AppTag>
        ))}
      </TopicTagsContainer>
    </StyledAppEduItem>
  );
};

// EDUCATION SECTION
const Education: React.FC<AppEducationSectionProps> = (props) => {
  return (
    <EducationSectionContainer>
      {props.data.map((item: EducationItemData, index: number) => (
        <EducationItem
          key={index}
          userData={item}
          theme={props.theme.item}
        />
      ))}
    </EducationSectionContainer>
  );
};

export { Education, EducationItem, type AppEducationSectionProps };
