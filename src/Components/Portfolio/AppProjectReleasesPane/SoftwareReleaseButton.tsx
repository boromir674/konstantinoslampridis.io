/** Provides SoftwareReleaseButtonComponent for rendering Release Items and ToolTip/Dialogs of a Project */
import React, { FC, useState, useRef, useContext, useEffect, type ReactNode, type RefObject } from "react";
import styled from "@emotion/styled";

import SoftwareReleaseTooltip from "./SoftwareReleaseTooltip";
import ZIndexContext from '../../../ZIndexContext';

interface SoftwareReleaseButtonProps {
    // Styles of 
    theme: {
        color: string;
        backgroundColor: string;
        onHoverColor: string;
        onHoverBackgroundColor: string;
        // Dialog Theme
        dialogBackgroundColor: string;
        // <pre> / <code> Colors
        codeColor: string;
        codeBackgroundColor: string;
        onHoverCodeBackgroundColor: string;
    };
    data: {
        command: string;
        urlText: string;
    };
    children: ReactNode;
}

// Inner Styles of the clickable Release Item Button
interface SoftwareReleaseButtonTheme {
    theme: {
        color: string;
        backgroundColor: string;
        onHoverColor: string;
        onHoverBackgroundColor: string;
    }
}
const SoftwareReleaseButton = styled.button<SoftwareReleaseButtonTheme>`
  background-color: var(--app-interactive-secondary);
  color: var(--app-on-interactive-secondary);

  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-family: 'Courier New', Courier, monospace;
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
  
  /* SVG inherits from currentColor */
  svg { fill: currentColor; }

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
                onClick={handleClickOnButton} // onClick prop supported since element is <button> 
                ref={buttonRef as RefObject<HTMLButtonElement>}
                theme={{
                    color: theme.color,
                    backgroundColor: theme.backgroundColor,
                    onHoverColor: theme.onHoverColor,
                    onHoverBackgroundColor: theme.onHoverBackgroundColor,
                }}
            >
                {children}
            </SoftwareReleaseButton>
            <SoftwareReleaseTooltip
                ref={tooltipRef as RefObject<HTMLDivElement>}
                onClick={handleTooltipClick}
                visible={tooltipVisible} theme={{
                    color: theme.color,
                    backgroundColor: theme.dialogBackgroundColor,
                    // <pre> / <code> Colors
                    codeColor: theme.codeColor,
                    codeBackgroundColor: theme.codeBackgroundColor,
                    onHoverCodeBackgroundColor: theme.onHoverCodeBackgroundColor,
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
export type { SoftwareReleaseButtonProps };
