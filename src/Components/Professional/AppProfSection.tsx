import React from "react";
import styled from "@emotion/styled";
import ExperienceItemData from "./ExperienceItemInterface";
import AppProfItem from "./ProfItem";

type ProfessionalSectionData = {
  experience_items: ExperienceItemData[];
};

interface ProfessionalSectionProps {
  // the id of the html element (can easily allow other components to do a 'scroll to' action)
  id: string;
  data: ProfessionalSectionData;
  theme: {
    title: {
      textColor: string;
      backgroundColor: string;
      // other styles
      padding?: string;
      fontFamily?: string;
      fontSize?: string;
    };
    item: {
      // other styles
      padding?: string;
      // color mode
      backgroundColor: string;
      textColor: string;
      linkColor: string;
      onHoverBackgroundColor: string;
      onHoverTextColor: string;
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
    };
    containerBackgroundColor: string;
    itemsColorModeSwitchDelay?: number;
  };
}

interface ProfessionalExperienceSectionTitleProps {
  theme: {
    textColor: string;
    backgroundColor: string;
    padding?: string;
    fontFamily?: string;
    fontSize?: string;
  };
}
const ProfessionalExperienceSectionTitle = styled.h2<ProfessionalExperienceSectionTitleProps>`
  color: var(--app-color-surface-text, --app-text-primary, ${(props) => props.theme.textColor});
  padding: ${(props) => props.theme.padding || "0px"};
  font-family: var(--app-font);
  font-size: var(--app-font-size-heading-2xl, 32px);
`;

interface ProfessionalExperienceSectionContainerProps {
  theme: {
    backgroundColor: string;
  };
}

const ProfessionalExperienceSectionContainer = styled.div<ProfessionalExperienceSectionContainerProps>`
  background-color: var(--app-color-surface-background, --app-surface-primary, ${(props) => props.theme.backgroundColor});
`;

const ProfessionalSection: React.FC<ProfessionalSectionProps> = ({
  theme,
  data,
  id: htmlID,
}) => {
  const dataLen = data.experience_items.length;
  let timeStep: number;
  // if itemsColorModeSwitchDelay not given or 0 then time step is 0
  if (theme.itemsColorModeSwitchDelay) {
    timeStep = theme.itemsColorModeSwitchDelay / (dataLen - 1);
  } else {
    timeStep = 0;
  }
  const timestapsArray = Array.from(Array(dataLen).keys()).map(
    (i) => i * timeStep
  );
  // console.log(timestapsArray);

  return (
    <ProfessionalExperienceSectionContainer
      id={htmlID}
      theme={{ backgroundColor: theme.containerBackgroundColor }}
    >
      <ProfessionalExperienceSectionTitle theme={theme.title}>
        Professional Career
      </ProfessionalExperienceSectionTitle>
      {data.experience_items.map((experienceItemData, index) => {
        const dur = theme.item.onHoverTransformDuration;
        const cssDur =
          (
            parseFloat(dur.substring(0, dur.length - 1)) + timestapsArray[index]
          ).toString() + "s";
        // console.log(cssDur);
        return (
          <AppProfItem
            key={index}
            theme={{
              ...theme.item,
              tag: theme.item.tag,
              onHoverBackgroundColorChangeDuration:
                (
                  parseFloat(dur.substring(0, dur.length - 1)) +
                  timestapsArray[index]
                ).toString() + "s",
            }}
            experienceItemData={experienceItemData}
          />
        );
      })}
    </ProfessionalExperienceSectionContainer>
  );
};

export default ProfessionalSection;
export type { ProfessionalSectionProps };
