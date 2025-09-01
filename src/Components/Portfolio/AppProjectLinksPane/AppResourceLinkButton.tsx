import React, { FC, useState, useContext, useRef, useEffect, ReactNode, RefObject } from "react";
import styled from "@emotion/styled";
import ResourceLinkTooltip from './ResourceLinkTooltip';
import ZIndexContext from '../../../ZIndexContext';


interface ResourceLinkButtonProps {
  theme: {
    color: string;
    backgroundColor: string;
    onHoverColor: string;
    onHoverBackgroundColor: string;
  };
  urlText: string;
  children: ReactNode;
}

interface ResourceLinkButtonTheme {
  theme: {
    color: string;
    backgroundColor: string;
    onHoverColor: string;
    onHoverBackgroundColor: string;
  }
}
const ResourceLinkButton = styled.button<ResourceLinkButtonTheme>`
  background-color: var(--app-interactive-primary);
  color: var(--app-on-interactive-primary, green);

  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-family: "Courier New", Courier, monospace;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease; // Add box-shadow to transition
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); // Add this line

  &:hover {
    background-color: var(--app-interactive-hover-primary);
    color: var(--app-on-interactive-hover-primary);
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2); // Add this line
  }

  &:hover .release-type {
    visibility: visible;
  }

  & > span {
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px;
  }

  // SVG inherits from currentColor, which solves problem of having svg be pained exactly as text and change on state change, same as text (normal -> hover)
  svg { fill: currentColor; }
`;
// TODO merge into one component (Resource Link + Release Item)
const ResourceLinkButtonComponent: FC<ResourceLinkButtonProps> = ({ theme, urlText, children }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const { setZIndex } = useContext(ZIndexContext);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
        tooltipRef.current && !tooltipRef.current.contains(event.target as Node)
      ) {
        setTooltipVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle Click on the button
  const handleClickOnButton = () => {
    setTooltipVisible(!tooltipVisible);
    // if visible set zIndex to 10 else 0
    setZIndex(tooltipVisible ? 0 : 100);
  };

  return (
    <div onClick={handleClickOnButton}>
      <ResourceLinkButton
        // ref={buttonRef as RefObject<HTMLButtonElement>}
        ref={buttonRef}
        theme={{
          color: theme.color,
          backgroundColor: theme.backgroundColor,
          onHoverColor: theme.onHoverColor,
          onHoverBackgroundColor: theme.onHoverBackgroundColor,
        }}
      >
        {children}
      </ResourceLinkButton>
      <ResourceLinkTooltip
        ref={tooltipRef}
        visible={tooltipVisible} theme={{
          color: theme.color,
          backgroundColor: theme.backgroundColor,
        }} urlText={urlText} />
    </div>
  );

};


export default ResourceLinkButtonComponent;
