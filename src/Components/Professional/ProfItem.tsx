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

const AppProfessionalItem = styled.div<AppProfessionalItemProps>`
  // width: 200px;
  // height: 200px;
  padding: ${(props) => props.theme.padding || "10px"};
  // padding: ${(props) => props.theme.padding};
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  border: 1px solid #ccc;
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
        <AppProfessionalItem theme={rest} onClick={onClick}>
          <ProfItemPOC
            title={title}
            duration={duration}
            location={location}
            company={company}
            description={description}
            activities={activities}
            technology_tags={technology_tags}
            theme={{
              title: {
                fontFamily: titleTheme.fontFamily,
                fontSize: titleTheme.fontSize,
              },
              body: {
                fontFamily: body.fontFamily,
                fontSize: body.fontSize,
              },
              tags: {
                item: tag,
              },
            }}
          />
        </AppProfessionalItem>
      )
    },
    [theme]
  );

  return (
    <ExperienceItem
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

