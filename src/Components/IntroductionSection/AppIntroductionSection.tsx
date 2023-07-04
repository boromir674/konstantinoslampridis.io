import React, { FC } from "react";
import styled from "@emotion/styled";

interface AppIntroductionSectionTheme {
  containerBackgroundColor: string;
  textColor: string;
}

interface AppIntroductionSectionProps {
  theme: AppIntroductionSectionTheme;
  data: {
    name: string;
  };
}

interface StyledIntroductionSectionContainerProps {
  theme: AppIntroductionSectionTheme;
  children?: React.ReactNode;
}

const StyledIntroductionSectionContainer = styled.div<StyledIntroductionSectionContainerProps>`
  background-color: ${(props) => props.theme.containerBackgroundColor};
  color: ${(props) => props.theme.textColor};
  // display: flex;
  // flex-direction: column;
  // flex-wrap: wrap;
  // justify-content: center;
  // align-items: center;
`;

const AppIntroductionSection: FC<AppIntroductionSectionProps> = ({
  data,
  theme,
}) => {
  return (
    <StyledIntroductionSectionContainer theme={theme}>
      <p>
        Welcome to the online space of <strong>{data.name}</strong> {":)"}
      </p>
      <p>
        Here you will find mostly information about my Open Source Portfolio,
        professional experience, skills and education.
      </p>
    </StyledIntroductionSectionContainer>
  );
};

export default AppIntroductionSection;
