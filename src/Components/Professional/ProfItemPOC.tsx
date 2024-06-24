/* Component that renders a Professional Item's Contents as a Fragment of 2 div's
* - Div for the Title, Company, Location, Duration, Description, Activities
*   CSS:  display: flex;
          flex-direction: column;
* - Div for and Technology Tags
*   CSS:  display: flex;
          flex-wrap: wrap;
*/
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
  padding-top: 22px;
  padding-bottom: 22px;
  display: flex;
  flex-wrap: wrap;
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

// V2
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
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 16px;
        `}
      >
        <h3
          css={css`
            margin: 0;
            font-size: 24px;
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
          `}
        >
          {company}
        </p>
        <p
          css={css`
            margin: 0;
            font-size: 14px;
          `}
        >
          {duration}
        </p>
        <p
          css={css`
            margin: 8px 0;
            font-size: 14px;
          `}
        >
          {description}
        </p>
        {/* Job Activities */}
        <p style={{ marginBottom: 12 }}>Activities</p>
        <ul
          css={css`
            padding-left: 40px; /* Restore default padding for lists */
            margin-left: 0; /* Remove any left margin */
            list-style-position: outside; /* Ensure bullets are outside the content */
            margin: 0px 0;
            font-size: 14px;
          `}
        >
          {activities.map((activity, index) => (
            <li key={index} style={{ padding: "4px 0" }}>
              <ExpItemActivity
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
        <TechTagsContainer>
          {technology_tags.map((tag, index) => (
            <AppTag key={index} theme={tagTheme}>
              {tag}
            </AppTag>
          ))}
        </TechTagsContainer>
      </div>
    </>
  );
};

export default ProfItem;
