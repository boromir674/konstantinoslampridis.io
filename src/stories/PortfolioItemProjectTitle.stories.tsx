import React, { useRef, forwardRef, useEffect } from 'react';
import styled from "@emotion/styled";

import Typography from '../Components/Typography';
import withForwardedRef from '../HoC/WithForwardRef';
import { withDefaultProps } from "../Components/hoc";


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

// OLD - PortfolioItemProjectTitle
const ProjectTitle = styled(H2) <PortfolioItemProjectTitleProps>`
    margin: 0;
    font-family: ${props => props.theme?.fontFamily || "inherit"};
    font-size: ${props => props.theme?.fontSize || "24px"};
    font-weight: bold;
  `;

const PortfolioItemProjectTitle = forwardRef((props: PortfolioItemProjectTitleProps, ref) => {
    // Log the Bind Ref after Mount for testing/debugging purposes
    useEffect(() => {
        // if ref has not been bind log error
        if (!ref.current) throw new Error('Ref is null. Bind the ref to a DOM element.');
        console.log("Inner Bind Ref:", ref.current);
    }, [ref]);
    return (
        <ProjectTitle theme={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "26px"
        }} ref={ref as React.RefObject<HTMLElement>}>{props.children}</ProjectTitle>
    )
});

// STORY Component
const ClientComponent = () => {
    const ref = useRef<HTMLElement | null>(null);

    // assert that ref is null at this point
    if (ref.current) throw new Error('Ref is not null. Ref should be null at this point.');
    console.log("Outer RAW Bind Ref should be null since node/tree is not mounted (ie rendered) yet:", ref.current);

    // Log the Bind Ref after Mount for testing/debugging purposes
    useEffect(() => {
        // if ref has not been bind log error
        // if (!ref.current) throw new Error('Ref is null. Bind the ref to a DOM element.');
        console.log("Outer EFFECT Bind Ref:", ref.current);
    }, []);

    return (
        <PortfolioItemProjectTitle
            ref={ref}
            theme={{ fontFamily: "Roboto, sans-serif", fontSize: "26px" }}
        >
            Project Title
        </PortfolioItemProjectTitle>
    );
}

// STORY Configuration
export default {
    component: ClientComponent,
    title: "PortfolioItemProjectTitleClientComponent",
    tags: ["autodocs"],
};

// STORY Instance
export const ClientComponentArgs = {
    args: {},
};
