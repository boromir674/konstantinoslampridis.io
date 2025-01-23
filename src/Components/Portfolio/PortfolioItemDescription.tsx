import React from 'react';
import styled from '@emotion/styled';
import Typography from '../Typography';
import withForwardRef from '../../HoC/WithForwardRef';

import { withDefaultProps } from '../hoc';

// COMPONENT - Project Description
interface PortfolioItemProjectDescriptionProps {
  theme: {
    // Font
    fontFamily: string;
    fontSize: string;
    // Layout
    margin: number;
  };
};
const PortfolioItemProjectDescriptionP = withDefaultProps({
    variant: "body1"  // ie maps to <p>, ie supported h1, h2, .., body1, body2, ..
}, withForwardRef(Typography));

const PortfolioItemProjectDescription = styled(PortfolioItemProjectDescriptionP) <PortfolioItemProjectDescriptionProps>`
  // override margin/padding browser defaults (ie if browser has these default value and no CSS Reset is used)
  margin: ${props => props.theme.margin};
  padding: 0;
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSize};
  // font-weight: bold;
`;

export default PortfolioItemProjectDescription;
