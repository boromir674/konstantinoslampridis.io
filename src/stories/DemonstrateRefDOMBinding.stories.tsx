import React, { FC, useRef, forwardRef, useEffect } from 'react';
import styled from "@emotion/styled";

import Typography from '../Components/Typography';
import { withDefaultProps } from "../Components/hoc";
import withForwardRef from '../HoC/WithForwardRef';

// TEST - FC Component with ForwardRef that renders DIV
const FCWithForwardRefToDiv = forwardRef((props, ref) => {
    return <div ref={ref as React.RefObject<HTMLDivElement>}>Simple Div</div>
});

// TEST - FC Component with ForwardRef that renders Styled DIV Component
const PortfolioItemProjectTitleStyledH2 = styled.h2`
  margin: 0;
  font-weight: bold;
`;
const FCWithForwardRefToStyled = forwardRef((props, ref) => {
    return <PortfolioItemProjectTitleStyledH2 ref={ref as React.RefObject<HTMLDivElement>}>Simple Div</PortfolioItemProjectTitleStyledH2>
});

// TEST - App Typography
const AppTypography = Typography

// TEST - Typography with Defaults (needing withForwardRef Hoc too!)
const H2Typography = withDefaultProps({
    variant: "h2",
}, withForwardRef(Typography));

// TEST - Styled Typography with Defaults (needing withForwardRef Hoc too!)
const StyledH2Typography = styled(H2Typography) <{ theme: { fontFamily: string, fontSize: string } }>`
  margin: 0;
  font-family: ${props => props.theme?.fontFamily || "inherit"};
  font-size: ${props => props.theme?.fontSize || "24px"};
  font-weight: bold;
`;

// TEST
const VanillaStyledDivFromEmotion = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  // control the Minimum gap between the Left and Right Panes that should be preserved
`;
//   gap: ${props => props.theme.minGapBetweenPanes};


// DEMONSTRATES WRONG USAGE
// const V3 = forwardRef(styled.h2`
// margin: 0;
// font-weight: bold;
// `);


// STORY COMPONENT
const ClientComponent: FC<{ type: string }> = ({ type }) => {
    const ref = useRef<HTMLDivElement>(null);
    // on Component mount log ref for sanity check
    useEffect(() => {
        console.log("ClientComponent: Bind Ref:", ref.current);
    }, []);
    if (type === 'FCWithForwardRefToDiv') {
        return <FCWithForwardRefToDiv ref={ref} />;
    }
    else if (type === 'FCWithForwardRefToStyled') {
        return <FCWithForwardRefToStyled ref={ref} />;
    }
    else if (type === 'Typography') {
        return <AppTypography ref={ref}>Typography</AppTypography>;
    }
    else if (type === 'H2Typography') {
        return <H2Typography ref={ref}>H2 Typography</H2Typography>;
    }
    else if (type === 'StyledH2Typography') {
        return <StyledH2Typography theme={{
            fontFamily: 'Arial',
            fontSize: '34px',
        }} ref={ref}>Styled H2 Typography</StyledH2Typography>;
    }
    else if (type === 'BottomPartBlock') {
        return <VanillaStyledDivFromEmotion ref={ref}>Bottom Part Block</VanillaStyledDivFromEmotion>;
    }
    else {
        throw new Error('Invalid type: ' + type);
    }
}

// STORY CONFIGURATION
export default {
    component: ClientComponent,
    title: "Demonstrate Ref DOM Binding",
    tags: ["autodocs"],
}

// STORY
export const UsingFCThatRendersADiv = {
    args: {
        type: 'FCWithForwardRefToDiv',
    },
}
// STORY V2
export const UsingFCThatRendersAStyledComponent = {
    args: {
        type: 'FCWithForwardRefToStyled',
    },
}
// STORY - Typography
export const UsingTypography = {
    args: {
        type: 'Typography',
    },
}
// STORY - Typography with Defaults
export const UsingTypographyWithDefaults = {
    args: {
        type: 'H2Typography',
    },
}
// STORY - Styled Typography with Defaults
export const UsingStyledTypographyWithDefaults = {
    args: {
        type: 'StyledH2Typography',
    },
}
// STORY - Styled Div
export const UsingStyledDivFromEmotionLib = {
    args: {
        type: 'BottomPartBlock',
    },
}
