import React, { FC, useCallback } from "react";
import styled from "@emotion/styled";

import ExperienceItem from "./ExperienceItemGeneric";
import ExperienceItemData from "../../ExperienceItemDataInterface";
import ProfItemPOC from "./ProfItemPOC";

interface ProfessionalItemTheme {
  // styles unrelated to colors
  padding?: string;

  backgroundColor: string;
  textColor: string;
  linkColor: string;
  onHoverBackgroundColor: string;
  onHoverTextColor: string;
  // onHoverTransitionDelay: string;
  onHoverTransformDuration: string;
  onHoverBackgroundColorChangeDuration: string;
  title: {
    fontFamily: string;
    fontSize: string;
  };
  body: {
    fontFamily: string;
    fontSize: string;
  };
  tag: {
    backgroundColor: string;
    textColor: string;
    onHoverBackgroundColor: string;
    onHoverTextColor: string;
    outlineColor: string;
    fontFamily: string;
    fontSize: string;
  };
}

// type same as ProfessionalItemTheme but omits tag.fontFamily and tag.fontSize
interface AppProfessionalItemContainerProps {
  // styles unrelated to colors
  padding?: string;

  backgroundColor: string;
  textColor: string;
  linkColor: string;
  onHoverBackgroundColor: string;
  onHoverTextColor: string;
  // onHoverTransitionDelay: string;
  onHoverTransformDuration: string;
  onHoverBackgroundColorChangeDuration: string;
}

interface AppProfessionalItemProps {
  // same type but exclude tag.fontFamily and tag.fontSize
  theme: AppProfessionalItemContainerProps;
  children?: React.ReactNode;
}

const AppProfessionalItemDiv = styled.div<AppProfessionalItemProps>`
  display: flex;
  flex-direction: column;

  // padding: ${(props) => props.theme.padding || "10px"};

  background-color: var(--app-container-primary);
  color: var(--app-text-primary, ${(props) => props.theme.textColor});

  border: 1px solid var(--app-border-subtle);
  transition: transform ${(props) => props.theme.onHoverTransformDuration},
    box-shadow 0.3s,
    background-color
      ${(props) => props.theme.onHoverBackgroundColorChangeDuration};
  cursor: pointer;
  &:hover {
    transform: scale(1.01);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    background-color: ${(props) => props.theme.onHoverBackgroundColor};
    color: ${(props) => props.theme.onHoverTextColor || props.theme.textColor};
  }

  // margin-bottom: 16px;
`;

type OnClickCallback = () => void;

interface renderPropsArgs {
  data: ExperienceItemData;
  onClick: OnClickCallback;
  theme: ProfessionalItemTheme;
}

interface AppProfItemProps {
  theme: ProfessionalItemTheme;
  experienceItemData: ExperienceItemData;
}

const AppProfItem: FC<AppProfItemProps> = ({ theme, experienceItemData }) => {
  const renderProfessionalItem = useCallback(
    ({
      data: {
        title,
        company,
        location,
        duration,
        description,
        activities,
        technology_tags,
      },
      onClick,
      // theme,
      theme: {
        title: titleTheme,
        body,
        tag,
        ...rest
      }
    }: renderPropsArgs) => {
      return (
        <AppProfessionalItemDiv theme={rest} onClick={onClick}>
          <ProfItemPOC
            title={title}
            duration={duration}
            location={location}
            company={company}
            description={description}
            activities={activities}
            technology_tags={technology_tags}
          />
        </AppProfessionalItemDiv>
      )
    },
    [theme]
  );

  return (
    <ExperienceItem  // Adapter Component
      renderProps={(d) =>
        renderProfessionalItem({
          data: d.dataInterface,
          onClick: d.onClick,
          theme: theme,
        })
      }
      data={experienceItemData}
    />
  );
};

export default AppProfItem;
export type { AppProfItemProps };

