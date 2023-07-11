import React from "react";
import { css, ThemeContext } from "@emotion/react";
import ExpItemActivity from "./ExpItemActivity";
import styled from "@emotion/styled";
import AppTag, { AppTagProps } from "../AppTag";

interface TechTagsContainerProps {
  children?: React.ReactNode;
  theme?: {
    backgroundColor?: string;
    textColor?: string;
  };
}

const TechTagsContainer = styled.div<TechTagsContainerProps>`
  background: ${(props) => props.theme.backgroundColor || "inherit"};
  color: ${(props) => props.theme.textColor || "inherit"};
  box-sizing: border-box;
  padding-top: 15px;
`;

interface ProfItemProps {
  // data
  title: string;
  duration: string;
  company: string;
  location: string;
  description: string;
  activities: string[];
  technology_tags: string[];
  // app theme (ie color set of color modes)
  theme: {
    tags: {
      item: AppTagProps["theme"];
    };
  };
}

const ProfItem: React.FC<ProfItemProps> = ({
  theme: {
    tags: { item: tagTheme },
  },
  title,
  duration,
  company,
  location,
  description,
  activities,
  technology_tags,
}) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: max-content auto;
        grid-gap: 4px;
        margin-bottom: 16px;
      `}
    >
      <h3
        css={css`
          margin: 0;
          font-size: 18px;
          font-weight: bold;
        `}
      >
        {title}
      </h3>
      <p
        css={css`
          margin: 0;
          font-size: 14px;
        `}
      >
        {location}
      </p>
      <p
        css={css`
          margin: 0;
          font-size: 14px;
          grid-column-start: 1;
          grid-column-end: 3;
        `}
      >
        {company}
      </p>
      <p
        css={css`
          margin: 0;
          font-size: 14px;
          grid-column-start: 1;
          grid-column-end: 3;
        `}
      >
        {duration}
      </p>
      <p
        css={css`
          margin: 8px 0;
          font-size: 14px;
          grid-column-start: 1;
          grid-column-end: 3;
        `}
      >
        {description}
      </p>
      {/* Job Activities */}
      <p>Activities</p>
      <ul
        css={css`
          margin: 0px 0;
          font-size: 14px;
          grid-column-start: 1;
          grid-column-end: 3;
        `}
      >
        {activities.map((activity, index) => (
          <li>
            <ExpItemActivity
              key={index}
              theme={{
                // containerBackgroundColor: "#fff",
                textColor: "inherit",
              }}
              data={{ text: activity }}
            />
          </li>
        ))}
      </ul>
      {/* Technology Tags */}
      {/* render techonology tags as a bullet list */}
      {/* <TechTagsContainer>
        <ul>
        {technology_tags.map((tag, index) => (
          <AppTag key={index} theme={tagTheme}><li>{tag}</li></AppTag>
        ))}
        </ul>
      </TechTagsContainer> */}
      <TechTagsContainer>
        {technology_tags.map((tag, index) => (
          <AppTag key={index} theme={tagTheme}>
            {tag}
          </AppTag>
        ))}
      </TechTagsContainer>
    </div>
  );
};

export default ProfItem;
