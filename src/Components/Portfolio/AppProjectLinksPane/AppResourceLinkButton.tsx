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
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  border-radius: 4px;
  font-size: 14px;
  font-family: "Courier New", Courier, monospace;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease; // Add box-shadow to transition
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); // Add this line

  &:hover {
    background-color: ${(props) => props.theme.onHoverBackgroundColor};
    color: ${(props) => props.theme.onHoverColor};
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
`;
// TODO merge into one component (Resource Link + Release Item)
const ResourceLinkButtonComponent: FC<ResourceLinkButtonProps> = ({ theme, urlText, children }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const { setZIndex } = useContext(ZIndexContext);

  const buttonRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLElement>(null);

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
        ref={buttonRef as RefObject<HTMLButtonElement>}
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
        ref={tooltipRef as RefObject<HTMLDivElement>}
        visible={tooltipVisible} theme={{
          color: theme.color,
          backgroundColor: theme.backgroundColor,
        }} urlText={urlText} />
    </div>
  );

};


export default ResourceLinkButtonComponent;
