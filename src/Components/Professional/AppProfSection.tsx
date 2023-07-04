import React from "react";
import styled from "@emotion/styled";
import ExperienceItemData from "./ExperienceItemInterface";
import AppProfItem from "./ProfItem";

type ProfessionalSectionData = {
  experience_items: ExperienceItemData[];
};

interface ProfessionalSectionProps {
  data: ProfessionalSectionData;
  theme: {
    title: {
      textColor: string;
      backgroundColor: string;
    };
    item: {
      backgroundColor: string;
      textColor: string;
      linkColor: string;
      onHoverBackgroundColor: string;
      onHoverTextColor: string;
      onHoverTransformDuration: string;
      onHoverBackgroundColorChangeDuration: string;
    };
    containerBackgroundColor: string;
    itemsColorModeSwitchDelay?: number;
  };
}

interface ProfessionalExperienceSectionTitleProps {
  theme: {
    textColor: string;
    backgroundColor: string;
  };
}
const ProfessionalExperienceSectionTitle = styled.h1<ProfessionalExperienceSectionTitleProps>`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.backgroundColor};
`;

interface ProfessionalExperienceSectionContainerProps {
  theme: {
    backgroundColor: string;
  };
}
const ProfessionalExperienceSectionContainer = styled.div<ProfessionalExperienceSectionContainerProps>`
  background-color: ${(props) => props.theme.backgroundColor};
`;

const ProfessionalSection: React.FC<ProfessionalSectionProps> = ({
  theme,
  data,
}) => {
  const dataLen = data.experience_items.length;
  var timeStep: number;
  // if itemsColorModeSwitchDelay not given or 0 then time step is 0
  if (theme.itemsColorModeSwitchDelay) {
    timeStep = theme.itemsColorModeSwitchDelay / (dataLen - 1);
  } else {
    timeStep = 0;
  }
  const timestapsArray = Array.from(Array(dataLen).keys()).map(
    (i) => i * timeStep
  );
  console.log(timestapsArray);
  // const timeStep1 = (dataLen - 1) / (theme.itemsColorModeSwitchDelay || 1);
  // const timestampsTransform = [0].concat((dataLen - 1))
  //  + data.experience_items.map((item) => item.timestamp);
  return (
    <ProfessionalExperienceSectionContainer
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
        console.log(cssDur);
        return (
          <AppProfItem
            key={index}
            theme={{
              ...theme.item,
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
