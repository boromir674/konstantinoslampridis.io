import { FC, useState, useRef, useEffect, ReactNode, RefObject } from "react";
import styled from "@emotion/styled";
import SoftwareReleaseTooltip from "./SoftwareReleaseTooltip";


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

    return (
        <div onClick={() => setTooltipVisible(!tooltipVisible)}>
            <SoftwareReleaseButton
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
                visible={tooltipVisible} theme={{
                    color: theme.color,
                    backgroundColor: theme.backgroundColor,
                }} data={{
                    urlText,
                    command,
                }} />
        </div>
    );

};


export default SoftwareReleaseButtonComponent;
export type { SoftwareReleaseButtonTheme };
