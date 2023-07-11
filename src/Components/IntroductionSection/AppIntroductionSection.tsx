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
  animation: fadeIn 0.5s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  // word-wrap: break-word;
  // display: inline-block;

  // display: flex;
  // flex-direction: column;
  // flex-wrap: wrap;
  // justify-content: center;
  // align-items: center;

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

// max-width: 1000px;
const WrappedText = styled.div`
  // V2
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

  // V1
  // border: 1px dashed black;
  // padding: 1em;
  // font-size: calc(0.6vw + 0.6em);
  // direction: ltr;
  // width: 30vw;
  // margin: auto;
  // // text-align: justify;
  // align-items: left;
  // word-break: break-word;
  // white-space: pre-line;
  // overflow-wrap: break-word;
  // -ms-word-break: break-word;
  // word-break: break-word;
  // -ms-hyphens: auto;
  // -moz-hyphens: auto;
  // -webkit-hyphens: auto;
  // hyphens: auto;
`;

const AppIntroductionSection: FC<AppIntroductionSectionProps> = ({
  data,
  theme,
  id: htmlId,
}) => {
  return (
    <StyledIntroductionSectionContainer id={htmlId} theme={theme}>
      <p>
        Welcome to the online space of <strong>{data.name}</strong> {":-)"}
      </p>
      {/* <WrappedText> */}
      {/* <p> */}
      Here you will find mostly information about my Open Source Portfolio,
      professional experience, skills and education.
      {/* </p> */}
      {/* </WrappedText> */}
    </StyledIntroductionSectionContainer>
  );
};

export default AppIntroductionSection;
