import React, { FC } from "react";
import styled from "@emotion/styled";
import Typography from "../Typography";

interface AppIntroductionSectionTheme {
  containerBackgroundColor: string;
  textColor: string;
}

interface AppIntroductionSectionProps {
  theme: AppIntroductionSectionTheme;
  data: {
    name: string;
  };
  // the id of the html element (can easily allow other components to do a 'scroll to' action)
  id: string;
}

interface StyledIntroductionSectionContainerProps {
  theme: AppIntroductionSectionTheme;
  children?: React.ReactNode;
}

const StyledIntroductionSectionContainer = styled.div<StyledIntroductionSectionContainerProps>`
  background-color: ${(props) => props.theme.containerBackgroundColor};
  color: ${(props) => props.theme.textColor};
  font-size: 24px;
  padding: 40px;
  // makes the container borders rounded
  border-radius: 10px;
  // text-align: center;
  // alters the height of each line of text
  line-height: 1.5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  // on component render the whole container appears with a "fadeIn" effect
  animation: fadeIn 1.0s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  // word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
`;

const IntroductionText = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  margin: 1rem 0;
`;

const AppIntroductionSection: FC<AppIntroductionSectionProps> = ({
  data,
  theme,
  id: htmlId,
}) => {
  return (
    <StyledIntroductionSectionContainer id={htmlId} theme={theme}>
      <Typography style={{
        fontSize: "1.75rem",
        lineHeight: 1.6,
        margin: "1rem 0",
      }}
      >
        Welcome to the online space of <strong>{data.name}</strong>.
      </Typography>
      {/* NEW IMPLEMENTATION */}
      <IntroductionText>
        Here you will find information about my{' '}
        <Typography component='span' style={{
          fontWeight: 'bold',
          color: theme.textColor,
        }}>
          Open Source Project Portfolio
        </Typography>,{' '}
        <Typography component='span' style={{
          fontWeight: 'bold',
          color: theme.textColor,
        }}>
          Professional Experience
        </Typography>,{' '}
        <Typography component='span' style={{
          fontWeight: 'bold',
          color: theme.textColor,
        }}>
          Skills
        </Typography>, and{' '}
        <Typography component='span' style={{
          fontWeight: 'bold',
          color: theme.textColor,
        }}>
          Education
        </Typography>.
      </IntroductionText>
    </StyledIntroductionSectionContainer>
  );
};


export default AppIntroductionSection;
