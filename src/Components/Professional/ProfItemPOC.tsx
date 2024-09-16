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
import { withDefaultProps } from "../hoc";
import Typography from '../Typography'
import ExpItemActivity from "./ExpItemActivity";
import styled from "@emotion/styled";
import AppTag, { AppTagProps } from "../AppTag";

interface TechTagsContainerProps {
  children?: React.ReactNode;
  theme?: {
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
    fontSize?: string;
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
  font-family: ${(props) => props.theme.fontFamily || "inherit"};
  font-size: ${(props) => props.theme.fontSize || "inherit"};
`;

interface ExperienceItemTitleProps {
  theme?: {
    fontFamily?: string;
    fontSize?: string;
  };
};
const ExperienceItemTitleH3 = withDefaultProps({
  variant: "h3",
}, Typography);
const ExperienceItemTitle = styled(ExperienceItemTitleH3) <ExperienceItemTitleProps>`
  margin: 0;
  font-family: ${props => props.theme?.fontFamily || "inherit"};
  font-size: ${props => props.theme?.fontSize || "24px"};
  font-weight: bold;
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
    title?: {
      fontFamily?: string;
      fontSize?: string;
    };
    body?: {
      fontFamily?: string;
      fontSize?: string;
    };
    tags: {
      item: AppTagProps["theme"];
    };
  };
}

// V2
const ProfItem: React.FC<ProfItemProps> = ({
  theme: {
    title: titleTheme,
    body: bodyTheme,
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
        <ExperienceItemTitle theme={titleTheme}>{title}</ExperienceItemTitle>
        {/* <Typography
          variant={'body1'} // <p> element
          style={{
            margin: 0,
            fontFamily: bodyTheme?.fontFamily || "inherit",
            fontSize: bodyTheme?.fontSize || "14px",
          }} */}
        <p
          css={css`
            margin: 0;
            font-size: ${bodyTheme?.fontSize || "14px"};
            font-family: ${bodyTheme?.fontFamily || "inherit"};
          `}
        >
          {location}
        </p>
        {/* </Typography> */}
        <p
          css={css`
            margin: 0;
            font-family: ${bodyTheme?.fontFamily || "inherit"};
            font-size: ${bodyTheme?.fontSize || "14px"};
          `}
        >
          {company}
        </p>
        <p
          css={css`
            margin: 0;
            font-size: ${bodyTheme?.fontSize || "14px"};
            font-family: ${bodyTheme?.fontFamily || "inherit"};
          `}
        >
          {duration}
        </p>
        <p
          css={css`
            margin: 8px 0;
            font-size: ${bodyTheme?.fontSize || "14px"};
            font-family: ${bodyTheme?.fontFamily || "inherit"};
          `}
        >
          {description}
        </p>
        {/* Job Activities */}
        <p style={{
          marginBottom: 12,
          fontFamily: bodyTheme?.fontFamily,
          fontSize: bodyTheme?.fontSize,
        }}>Activities</p>
        <ul
          css={css`
            padding-left: 40px; /* Restore default padding for lists */
            margin-left: 0; /* Remove any left margin */
            list-style-position: outside; /* Ensure bullets are outside the content */
            margin: 0px 0;
            font-size: ${bodyTheme?.fontSize || "14px"};
            font-family: ${bodyTheme?.fontFamily || "inherit"};
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
        <TechTagsContainer theme={{
          fontFamily: tagTheme.fontFamily,
          fontSize: tagTheme.fontSize,
        }}>
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
export type { ProfItemProps };
