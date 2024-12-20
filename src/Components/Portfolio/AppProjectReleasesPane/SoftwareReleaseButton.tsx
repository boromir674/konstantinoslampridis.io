import React, { FC, useState, useRef, useContext, useEffect, type ReactNode, type RefObject } from "react";
import styled from "@emotion/styled";
import SoftwareReleaseTooltip from "./SoftwareReleaseTooltip";
import ZIndexContext from '../../../ZIndexContext';


interface SoftwareReleaseButtonProps {
    theme: {
        color: string;
        backgroundColor: string;
        onHoverColor: string;
        onHoverBackgroundColor: string;
    };
    data: {
        command: string;
        urlText: string;
    };
    children: ReactNode;
}

interface SoftwareReleaseButtonTheme {
    color: string;
    backgroundColor: string;
    onHoverColor: string;
    onHoverBackgroundColor: string;
}
const SoftwareReleaseButton = styled.button<SoftwareReleaseButtonTheme>`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border-radius: 4px;
  font-size: 14px;
  font-family: 'Courier New', Courier, monospace;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease; // Add box-shadow to transition
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); // Add this line

  &:hover {
    background-color: ${(props) => props.onHoverBackgroundColor};
    color: ${(props) => props.onHoverColor};
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


const SoftwareReleaseButtonComponent: FC<SoftwareReleaseButtonProps> = ({ theme, data: { command, urlText }, children }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    const { setZIndex } = useContext(ZIndexContext);

    const buttonRef = useRef<HTMLElement>(null);
    const tooltipRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // if the Tooltip is not visible, do nothing
        if (!tooltipVisible) {
            return;
          }
        ///// Handle Click outside of the button and the tooltip /////
        const handleClickOutsideOfButtonAndTooltip = (event: MouseEvent) => {
            // Needs to exlcude Button, since we have the 'handleClickOnButton' listener on the button itself
            if (buttonRef.current && !buttonRef.current.contains(event.target as Node) && tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
                setTooltipVisible(false);
                setZIndex(0);
            }
            // else if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
            //     console.log("Clicked on Button: Hiding Tooltip");
            //     setTooltipVisible(false);
            //     setZIndex(0);
            // }
        };
        // Add Listener on Component Mount, only if the Tooltip is visible
        document.addEventListener("mousedown", handleClickOutsideOfButtonAndTooltip);
        return () => {
            // Remove Listener on Component Unmount
            document.removeEventListener("mousedown", handleClickOutsideOfButtonAndTooltip);
        };
    }, [tooltipVisible]);

    ///// Handle Click on the button /////
    const handleClickOnButton = () => {
        // if (!tooltipVisible) {
            setTooltipVisible(!tooltipVisible);
            // if visible set zIndex to 10 else 0
            setZIndex(tooltipVisible ? 0 : 10);
        // }
    };

    // Stop event propagation inside the tooltip
    const handleTooltipClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    // Handle Click on the Command after Tooltip has appeared
    const handleCopyCommand = () => {
        navigator.clipboard.writeText(command).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Hide the "copied" message after 2 seconds
        });
    };

    return (
        <div>
            <SoftwareReleaseButton
                onClick={handleClickOnButton}
                ref={buttonRef as RefObject<HTMLButtonElement>}
                color={theme.color}
                backgroundColor={theme.backgroundColor}
                onHoverColor={theme.onHoverColor}
                onHoverBackgroundColor={theme.onHoverBackgroundColor}
            >
                {children}
            </SoftwareReleaseButton>
            <SoftwareReleaseTooltip
                ref={tooltipRef as RefObject<HTMLDivElement>}
                onClick={handleTooltipClick}
                visible={tooltipVisible} theme={{
                    color: theme.color,
                    backgroundColor: theme.backgroundColor,
                }} data={{
                    urlText,
                    command,
                }}
                onCopyCommand={() => {
                    handleCopyCommand();
                    // handleTooltipClick();
                }}
                copied={copied}
            />
        </div>
    );

};


export default SoftwareReleaseButtonComponent;
export type { SoftwareReleaseButtonTheme };
