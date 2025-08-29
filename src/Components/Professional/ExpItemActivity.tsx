import React, { FC } from "react";
import styled from "@emotion/styled";

interface ExpItemActivityContainerProps {
  children?: React.ReactNode;
  theme: {
    backgroundColor?: string;
    textColor?: string;
  };
};

const ExpItemActivityContainer = styled.div<ExpItemActivityContainerProps>`
  background: var(--app-color-main-area, --app-surface-primary, ${(props) => props.theme.backgroundColor || "inherit"});
  color: var(--app-on-surface-primary, ${(props) => props.theme.textColor});
  box-sizing: border-box;
`;


interface ExpItemActivityProps {
  theme: {
    containerBackgroundColor?: string;
    textColor: string;
  };
  data: {
    text: string;
  };
}

const ExpItemActivity: FC<ExpItemActivityProps> = ({
  theme,
  data: { text },
}) => {
  return (
    <ExpItemActivityContainer theme={theme}>
      {text}
    </ExpItemActivityContainer>
  );
};

export default ExpItemActivity;
