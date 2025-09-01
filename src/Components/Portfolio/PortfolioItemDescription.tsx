import React from 'react';
import styled from '@emotion/styled';
import Typography from '../Typography';
import withForwardRef from '../../HoC/WithForwardRef';

import { withDefaultProps } from '../hoc';

// COMPONENT - Project Description
interface PortfolioItemProjectDescriptionProps {
  theme: {
    // Font
    fontFamily?: string;
    fontSize?: string;
    //// Layout
    /** Top and Bottom Margin, measured in pixels, for the rendered html tag */
    margin: number;
  };
};
const PortfolioItemProjectDescriptionP = withDefaultProps({
    variant: "body1"  // ie maps to <p>, ie supported h1, h2, .., body1, body2, ..
}, withForwardRef(Typography));

const PortfolioItemProjectDescription = styled(PortfolioItemProjectDescriptionP) <PortfolioItemProjectDescriptionProps>`
  color: var(--app-text-secondary);
  background-color: var(--app-color-draggable, --app-surface-primary);
  font-family: var(--app-font, inherit);
  font-size: var(--app-font-size-body-lg, 16px);

// override margin/padding browser defaults (ie if browser has these default value and no CSS Reset is used)
  margin-top: ${props => props.theme.margin}px;
  margin-bottom: ${props => props.theme.margin}px;

  padding: 0;

`;

export default PortfolioItemProjectDescription;
export type { PortfolioItemProjectDescriptionProps };

