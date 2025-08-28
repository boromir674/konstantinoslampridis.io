import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { withDefaultProps } from "./hoc";
import Typography from "./Typography";
import AppTag from "./AppTag";
import EducationItemData from '../EducationItemDataInterface';


const EducationSectionContainer = styled.div`
  margin-top: 20px;  // how much space will be left between this and the component above
`;


const DegreeTitle = styled(withDefaultProps({
  variant: 'h3',
}, Typography))`
  margin-bottom: 5px;
  margin-top: 10px;
  font-family: var(--app-font-family);
  font-size: var(--app-font-size-heading-2xl);
`;


const UniversityTitle = styled(withDefaultProps({
  variant: 'h4',
}, Typography))`
  margin-top: 7px;
  margin-bottom: 5px;
  font-style: italic;
  font-family: var(--app-font-family);
  font-size: var(--app-font-size-body-lg);
`;


const Location = styled(withDefaultProps({
  variant: 'body1',  // <p> element
}, Typography))`
  font-family: var(--app-font-family);
  font-size: var(--app-font-size-body-lg);
  margin-top: 5px;
`;

interface StudiesDurationProps {
  theme: {
    fontFamily: string;
    fontSize: string;
  };
}
const StudiesDuration = styled(withDefaultProps({
  component: 'span',
}, Typography)) <StudiesDurationProps>`
  font-style: italic;
  margin-bottom: 10px;
  font-family: var(--app-font-family);
  font-size: var(--app-font-size-body-lg);
`;

interface ThesisTitleProps {
  theme: {
    fontFamily: string;
    fontSize: string;
  };
}
const ThesisTitle = styled(withDefaultProps({
  variant: 'body1',  // <p> element
}, Typography)) <ThesisTitleProps>`
  margin-bottom: 5px;
  font-family: var(--app-font-family);
  font-size: var(--app-font-size-body-lg);
`;

const TopicTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
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
  degreeTitle: {
    fontFamily: string;
    fontSize: string;
  };
  body: {
    fontFamily: string;
    fontSize: string;
  };
  tag: {
    // color design, that switchs on color mode
    backgroundColor: string;
    textColor: string;
    onHoverBackgroundColor: string;
    onHoverTextColor: string;
    outlineColor: string;
    fontFamily: string;
    fontSize: string;
  };
}
interface StyledAppEducationItemProps {
  theme: EducationItemTheme;
  children?: React.ReactNode;
}
const StyledAppEduItem = styled.div<StyledAppEducationItemProps>`
  // display: flex;
  padding: ${(props) => props.theme.padding || "0px"};
  background-color: var(--app-container-secondary);
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
    transform: scale(1.01);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    // background-color: ${(props) => props.theme.onHoverBackgroundColor};
    // color: ${(props) => props.theme.onHoverTextColor || props.theme.textColor};
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
      <DegreeTitle theme={theme.degreeTitle}>{degree_title}</DegreeTitle>
      <UniversityTitle theme={theme.body}>{university_name}</UniversityTitle>
      <span css={css`
        display: flex;
        flex-wrap: wrap;
      `}><a>
          <Location theme={theme.body}>{location}</Location><StudiesDuration theme={theme.body}>{duration}</StudiesDuration>
        </a>
      </span>
      <ThesisTitle theme={theme.body}>Thesis: {thesis_title}</ThesisTitle>
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
