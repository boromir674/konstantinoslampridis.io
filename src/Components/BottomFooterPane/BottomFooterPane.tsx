import React, { FC } from "react";
import styled from "@emotion/styled";
// import { useTheme } from "@emotion/react";

import { createSVGIcon } from '../SVGIcons';


interface BottomFooterPaneTheme {
  textColor: string;
  backgroundColor: string;
  svgStyles: React.SVGProps<SVGSVGElement>
}
interface BottomFooterPaneContainerProps {
  theme: BottomFooterPaneTheme;
  children?: React.ReactNode;
};


const BottomFooterPaneContainer = styled.div<BottomFooterPaneContainerProps>`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.backgroundColor};
  text-align: center; /* Center the text content */
  padding: 10px 0; /* Adds vertical padding for visual space */
  position: fixed; /* Fixes the footer at the bottom of the viewport */
  bottom: 0;
  width: 100%;
  z-index: 1000; /* Ensures the footer stays on top of other elements */

  @media (max-width: 768px) {
    padding: 15px 0; /* Adjust padding for tablet screens */
  }

  @media (max-width: 480px) {
    padding: 20px 0; /* Adjust padding for smartphone screens */
  }
`;

const StyledSpan = styled.span`
  margin-right: 5px;
`;


interface BottomFooterPaneProps {
  theme: BottomFooterPaneTheme;
  children?: React.ReactNode;
}

const BottomFooterPane: FC<BottomFooterPaneProps> = (props) => {
  return (
    <BottomFooterPaneContainer theme={props.theme}>
      <StyledSpan>
        {createSVGIcon(
          'github',
          // theme.releaseButtonTheme.icons?.[index]
          {
            svgStyles: props.theme.svgStyles,
            // pathStyles: theme.releaseButtonTheme.icons?.[index].pathStyles,
          }
        )}
      </StyledSpan>
    </BottomFooterPaneContainer>
  );
};

export default BottomFooterPane;

export type { BottomFooterPaneProps };
export { BottomFooterPane };
