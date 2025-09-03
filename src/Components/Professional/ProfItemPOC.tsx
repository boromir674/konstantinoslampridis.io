/* Component that renders a Professional Item's Contents as a Fragment of 2 div's
* - Div for the Title, Company, Location, Duration, Description, Activities
*   CSS:  display: flex;
          flex-direction: column;
* - Div for the Technology Tags
*   CSS:  display: flex;
          flex-wrap: wrap;
*/
import React from "react";
import { css } from "@emotion/react";
import { withDefaultProps } from "../hoc";
import Typography from '../Typography'
import ExpItemActivity from "./ExpItemActivity";
import styled from "@emotion/styled";
import AppTag from "../AppTag";


const TechTagsContainer = styled.div`
  background: "inherit";
  color: "inherit";
  box-sizing: border-box;
  padding-top: 22px;
  // padding-bottom: 22px;
  display: flex;
  flex-wrap: wrap;
  font-family: inherit;
  font-size: inheritinherit;
`;


const ExperienceItemTitleH3 = withDefaultProps({
  variant: "h3",
}, Typography);
const ExperienceItemTitle = styled(ExperienceItemTitleH3)`
  background-color: var(--app-color-main-area);
  color: var(--app-on-surface-primary, white);
  margin: 0;
  font-family: var(--app-font, inherit);
  font-size: var(--app-font-size-heading-lg, 24px);
  font-weight: bold;

  // Option for underlining the title
  // text-decoration: underline;
  // text-underline-offset: 4px;
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
}

/* Component that renders a Professional Item's Contents as a Div.
* Content includes Job Title, Company name, Description, Tech Tags
*/
const ProfItem: React.FC<ProfItemProps> = ({
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
      // OPT 1
      style={{
        backgroundColor: "var(--app-color-main-area, --app-surface-primary)",
        color: "var(--app-on-surface-primary)",
        fontFamily: "var(--app-font, inherit)",

        display: "flex",
        flexDirection: "column",
        gap: "4px",
        // marginBottom: "16px",
        padding: "14px",
      }}
    >
      {/* Job Title */}
      <ExperienceItemTitle>{title}</ExperienceItemTitle>
      {/* <Typography
          variant={'body1'} // <p> element
          style={{
            margin: 0,
            fontFamily: bodyTheme?.fontFamily || "inherit",
            fontSize: bodyTheme?.fontSize || "14px",
          }} */}
      {/* Job Location (Country/city and/or "remote") */}
      <p
        css={css`
            color: var(--app-on-surface-primary);
            backgroundColor: var(--app-color-main-area, --app-surface-primary);
            margin: 0;
            font-size: var(--app-font-size-body, 14px);
            font-family: var(--app-font, "inherit");
          `}
      >
        {location}
      </p>

      {/* Company Name */}
      <p
        css={css`
            backgroundColor: var(--app-color-main-area, --app-surface-primary);
            margin: 0;
            font-family: var(--app-font, "inherit");
            font-size: var(--app-font-size-body, 14px);
            font-weight: bold;
          `}
      >
        {company}
      </p>

      {/* Duration of contract / occupation */}
      <p
        css={css`
            backgroundColor: var(--app-color-main-area, --app-surface-primary);
            color: var(--app-on-surface-primary);
            margin: 0;
            font-size: var(--app-font-size-body, 14px);
            font-family: var(--app-font, "inherit");
          `}
      >
        {duration}
      </p>

      {/* Job Description: sort text */}
      <p
        css={css`
            backgroundColor: var(--app-color-main-area, --app-surface-primary);
            color: var(--app-on-surface-primary);
            margin: 8px 0;
            font-size: var(--app-font-size-body, 14px);
            font-family: var(--app-font, "inherit");
          `}
      >
        {description}
      </p>

      {/* List of Job Activities / Achievements */}
      <p style={{
        marginBottom: 12,
        fontFamily: 'var(--app-font)',
        fontSize: 'var(--app-font-size-body-lg, 16px)',
      }}>
        Activities
      </p>
      <ul
        css={css`
            color: var(--app-on-surface-primary);
            backgroundColor: var(--app-color-main-area, --app-surface-primary);
            padding-left: 40px; /* Restore default padding for lists */
            margin-left: 0; /* Remove any left margin */
            list-style-position: outside; /* Ensure bullets are outside the content */
            margin: 0px 0;
            font-size: var(--app-font-size-body, 14px);
            fontFamily: 'var(--app-font)',
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

      {/* Technology Tags: Tech stack used */}
      <TechTagsContainer>
        {technology_tags.map((tag, index) => (
          <AppTag key={index} variant='primary'>
            {tag}
          </AppTag>
        ))}
      </TechTagsContainer>

    </div>
  );
};

export default ProfItem;
export type { ProfItemProps };
