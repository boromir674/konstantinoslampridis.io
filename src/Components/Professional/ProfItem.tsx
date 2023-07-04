import React, { FC, useCallback } from "react";
import styled from "@emotion/styled";

import ExperienceItem from "./ExperienceItemGeneric";
import ExperienceItemData from "../../ExperienceItemDataInterface";
import ProfItemPOC from "./ProfItemPOC";

interface ProfessionalItemTheme {
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
  theme: ProfessionalItemTheme;
  children?: React.ReactNode;
}

const AppProfessionalItem = styled.div<AppProfessionalItemProps>`
  // width: 200px;
  // height: 200px;
  display: flex;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  border: 1px solid #ccc;
  transition: transform ${(props) => props.theme.onHoverTransformDuration}, box-shadow 0.3s, background-color ${(props) => props.theme.onHoverBackgroundColorChangeDuration};
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    background-color: ${(props) => props.theme.onHoverBackgroundColor};
    color: ${(props) =>
      props.theme.onHoverTextColor || props.theme.textColor};
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
    ({ data: {
      title,
      company,
      location,
      duration,
      description,
    }, onClick, theme}: renderPropsArgs) => (
      <AppProfessionalItem theme={theme} onClick={onClick}>
        <ProfItemPOC
          title={title}
          duration={duration}
          location={location}
          company={company}
          description={description}
        />
      </AppProfessionalItem>
    ), [theme]);

  return (
    <ExperienceItem
      renderProps={(d) =>
        renderProfessionalItem({ data: d.dataInterface, onClick: d.onClick, theme: theme })
      }
      data={experienceItemData}
    />
  );
};

export default AppProfItem;
