import React, { FC, forwardRef } from "react";
import styled from "@emotion/styled";

import Typography from '../Typography';
import { withDefaultProps } from "../hoc";
import withForwardedRef from '../../HoC/WithForwardRef';



interface PortfolioItemProjectTitleProps {
    theme: {
        fontFamily: string;
        fontSize?: string;
    };
    children?: React.ReactNode; // Explicitly allow children
};

const H2 = withDefaultProps({
    variant: "h2",
}, withForwardedRef(Typography));

// COMPONENT - Project Title accepting theme and optional ref
const ProjectTitle = styled(H2) <PortfolioItemProjectTitleProps>`
    margin: 0;
    font-family: ${props => props.theme?.fontFamily || "inherit"};
    font-size: ${props => props.theme?.fontSize || "24px"};
    font-weight: bold;
  `;

export default ProjectTitle
