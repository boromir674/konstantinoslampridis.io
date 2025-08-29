import React, { FC } from "react";
import styled from "@emotion/styled";

import { createSVGIcon } from '../SVGIcons';


interface BottomFooterPaneTheme {
  textColor: string;
  backgroundColor: string;
  svgStyles: React.SVGProps<SVGSVGElement>
}
interface BottomFooterPaneContainerProps {
  theme: Omit<BottomFooterPaneTheme, 'svgStyles'>;
  children?: React.ReactNode;
};


const BottomFooterPaneContainer = styled.div<BottomFooterPaneContainerProps>`
  background-color: var(--app-brand-color-area);
  color: var(--app-brand-color-area-text);

  text-align: center; /* Center the text content */
  padding: 10px 0; /* Adds vertical padding for visual space */

  // position: fixed; /* Fixes the footer at the bottom of the viewport */
  /* Sticky positioning - stays at top when scrolling */
  position: sticky;

  bottom: 0;
  width: 100%;
  z-index: 1000; /* Ensures the footer stays on top of other elements */

  @media (max-width: 768px) {
    padding: 15px 0; /* Adjust padding for tablet screens */
  }

  @media (max-width: 480px) {
    padding: 20px 0; /* Adjust padding for smartphone screens */
  }

  // // in case css reset did not take care of box model, set it explicitly
  // box-sizing: border-box;

  // make svg use "live" current color from this element css
  & svg {
    fill: currentColor;
    vertical-align: middle; /* Aligns SVG vertically with text */
  }
`;

const StyledSpan = styled.span`
  margin-right: 5px;
`;
interface BottomFooterPaneProps {
  id?: string;
  theme: BottomFooterPaneTheme;
  children?: React.ReactNode;
}

/** Renders a div, with a span child, with a github logo <path>
 * 
 * Allows controlling the width, height and fill svg 'style' values.
*/
const BottomFooterPane: FC<BottomFooterPaneProps> = (props) => {
  const { svgStyles, ...divStyles } = props.theme;
  return (
    <BottomFooterPaneContainer id={props.id} theme={divStyles}>
      <StyledSpan>{createSVGIcon('github', { svgStyles })}</StyledSpan>
    </BottomFooterPaneContainer>
  );
};

export default BottomFooterPane;

export type { BottomFooterPaneProps };
