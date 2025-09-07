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
  padding: 10px 0; /* Default padding for large screens */

  // position: fixed; /* Fixes the footer at the bottom of the viewport */
  /* Sticky positioning - stays at bottom when scrolling, but only when there's enough height */
  position: sticky;

  bottom: 0;
  width: 100%;
  z-index: 1000; /* Ensures the footer stays on top of other elements */

  /* Height-based responsive design - smaller footer for smaller screens */
  
  /* Very tall screens (>800px): Generous padding */
  @media (min-height: 800px) {
    padding: 15px 0;
  }

  /* Medium height screens (600px-800px): Standard padding */
  @media (min-height: 600px) and (max-height: 799px) {
    padding: 12px 0;
  }

  /* Short screens (500px-599px): Compact padding, still sticky */
  @media (min-height: 500px) and (max-height: 599px) {
    padding: 8px 0;
  }

  /* Very short screens (<500px): Minimal padding, no sticky */
  @media (max-height: 499px) {
    position: relative !important;
    bottom: auto !important;
    padding: 6px 0;
  }

  /* Width-based adjustments (keep existing behavior) */
  @media (max-width: 768px) {
    /* Additional adjustments for tablet widths if needed */
  }

  @media (max-width: 480px) {
    /* Additional adjustments for phone widths if needed */
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
