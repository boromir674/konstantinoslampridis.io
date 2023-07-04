import React, { FC, useCallback } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import EducationItemData from "./EducationItemInterface";
import AppTag from "../AppTag";

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

type OnClickCallback = () => void;

interface renderPropsArgs {
  data: EducationItemData;
  onClick: OnClickCallback;
  //   theme: EducationItemTheme;
}

interface AppEducationItemProps {
  theme: EducationItemTheme;
  educationItemData: EducationItemData;
}

interface StyledAppEducationItemProps {
  theme: EducationItemTheme;
  children?: React.ReactNode;
}

const StyledAppEduItem = styled.div<StyledAppEducationItemProps>`
  // display: flex;
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

const AppEducationItem: FC<AppEducationItemProps> = (
  props: AppEducationItemProps
) => {
  const renderEducationItem = useCallback(
    ({
      data: {
        name, // university name
        location, // university location
        degree, // degree title/name
        thesis_title,
        date, // date (ie '2019') or date range (ie '2014 - 2019')
        topics, // list of courses or topics
      },
      onClick,
    }: renderPropsArgs) => (
      <div
        css={css`
          margin-top: 20px;
        `}
      >
        <StyledAppEduItem
          onClick={onClick}
          theme={props.theme}
        >
          {/* UNIVERSITY NAME */}
          <h3
            css={css`
              margin-bottom: 5px;
            `}
          >
            {name}
          </h3>
          {/* UNIVERSITY Location */}
          <p
            css={css`
              font-size: 16px;
              //   color: ${props.theme.textColor};
              margin-top: 5px;
            `}
          >
            {location}
          </p>
          {/* DegreeTitle */}
          <h4
            css={css`
              margin-bottom: 5px;
            `}
          >
            {degree}
          </h4>
          {/* StudiesDuration */}
          <span
            css={css`
              font-style: italic;
              margin-bottom: 10px;
            `}
          >
            {date}
          </span>
          {/* ThesisTitle */}
          <p
            css={css`
              margin-bottom: 5px;
            `}
          >
            {thesis_title}
          </p>
          {/* Courses / Topics */}
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
              // margin-top: 10px;
            `}
          >
            {topics.map((topic, index) => (
              <AppTag
                key={index}
                theme={{
                  backgroundColor: "#FFAD00",
                  textColor: "#333",
                  onHoverBackgroundColor: "#ddd",
                  onHoverTextColor: "#333",
                }}
              >
                {topic}
              </AppTag>
            ))}
          </div>
        </StyledAppEduItem>
      </div>
    ),
    [props.theme]
  );

  return renderEducationItem({
    data: {
      name: props.educationItemData.name, // university name
      location: props.educationItemData.location, // university location
      degree: props.educationItemData.degree, // degree title/name
      thesis_title: props.educationItemData.thesis_title,
      date: props.educationItemData.date, // date (ie '2019') or date range (ie '2014 - 2019')
      topics: props.educationItemData.topics, // list of courses or topics
    },
    onClick: () => null,
  });
  //     <EducationItemGeneric
  //       renderProps={(d) =>
  //         renderEducationItem({ data: d.dataInterface, onClick: d.onClick, theme: props.theme })
  //       }
  //       data={props.educationItemData}
  //     />
  //   );
};

export default AppEducationItem;
