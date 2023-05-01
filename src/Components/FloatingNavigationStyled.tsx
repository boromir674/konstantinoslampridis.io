import React, { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import useScreenScrollHandler from "../Hooks/useScreenScrollHandler";
import useIsSSR from "../Hooks/useIsSSR";

interface Theme {
  backgroundColor: string;
  foregroundColor: string;
  buttonColor: string;
  buttonHoverColor: string;
}

const NavContainer = styled.nav<{ theme?: Theme }>`
  position: fixed;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-color: ${(props) => props.theme.backgroundColor};
  // color: ${(props) => props.theme.foregroundColor};
`;

interface NavItemProps {
  colorSet: {
    textColor: string;
    backgroundColor: string;
    hoverBackgroundColor: string;
    hoverTextColor: string;
    activatedTextColor: string;
    activatedBackgroundColor: string;
  };
  active: boolean;
  children?: React.ReactNode;
}
const NavButton = styled.button<NavItemProps>`
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0.5rem;
    border-radius: 50%;
    background: ${(props) =>
      props.active
        ? props.colorSet.activatedBackgroundColor
        : props.colorSet.backgroundColor};
    color: ${(props) =>
      props.active
        ? props.colorSet.activatedTextColor
        : props.colorSet.textColor}
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  
    &:hover {
      background-color: ${(props) => props.colorSet.hoverBackgroundColor};
      transform: scale(1.1);
    }
  `;
type WindowSize = {
  innerWidth: number | null;
  innerHeight: number | null;
};
type getWindowSizeFunction = () => WindowSize;

interface NavProps {
  items: {
    label: string;
    to_element_id: string;
  }[];
  // activeItem: string;
  colorSet: {
    textColor: string;
    backgroundColor: string;
    hoverBackgroundColor: string;
    hoverTextColor: string;
    activatedTextColor: string;
    activatedBackgroundColor: string;
  };
}

const Nav: React.FC<NavProps> = ({ items, colorSet }) => {
  const activeSectionIndex = useScreenScrollHandler(items);
  const SSROn = useIsSSR();
  const [windowSize, setWindowSize] = useState<WindowSize>(() =>
    SSROn
      ? {
          innerWidth: null,
          innerHeight: null,
        }
      : {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
        }
  );
  const getWindowSize: getWindowSizeFunction = useCallback(() => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }, [windowSize]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      {/* hack to avoid rendering it by default on SSR, (since on SSR we do not know window size) */}
      {((windowSize.innerWidth as number) || 1000) <= 500 && (
        <NavContainer>
          {items.map((navItem, index) => (
            <NavButton
              key={index}
              colorSet={colorSet}
              active={navItem.label == items[activeSectionIndex || 0].label}
            >
              {navItem.label}
            </NavButton>
          ))}
        </NavContainer>
      )}
    </>
  );
};

export default Nav;
