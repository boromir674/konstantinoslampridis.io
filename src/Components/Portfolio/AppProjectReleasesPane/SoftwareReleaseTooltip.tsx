import { FC, forwardRef } from 'react';
import styled from "@emotion/styled";

import AppExternalURLIcon from "../../AppExternalURLIcon";

interface SoftwareReleaseTooltipProps {
    theme: {
        color: string;
        backgroundColor: string;
        // <pre> / <code> Colors
        codeColor: string;
        codeBackgroundColor: string;
        onHoverCodeBackgroundColor: string;
    };
    data: {
        command: string;
        urlText: string;
    }
    visible: boolean;
    onCopyCommand: () => void;
    copied: boolean;
    onClick: (event: React.MouseEvent) => void;
}

// Inner Components
interface URLProps {
    theme: {
        textColor: string;
    };
}
// Shell Command DIV
interface ShellDivProps {
    theme: {
        codeBackgroundColor: string;
        onHoverCodeBackgroundColor: string;
    }
}
const ShellDiv = styled.div<ShellDivProps>`
  background-color: ${(props) => props.theme.codeBackgroundColor};
  &:hover {
    background-color: ${(props) => props.theme.onHoverCodeBackgroundColor};
  }
  padding: 10px;
  border-radius: 5px;
`;

const Link = styled.a<URLProps>`
  color: ${(props) => props.theme.textColor};
  // text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff7f50;
  }
`;
const MyLink = styled(Link)`
  margin-right: 10px;
`;

// declared using forwardRef. This opts it into receiving the ref from above as the second ref argument which is declared after props.
const SoftwareReleaseTooltip = forwardRef<HTMLDivElement, SoftwareReleaseTooltipProps>(({ theme, data: { command, urlText }, visible, onCopyCommand, copied }, ref) => {
    if (!visible) return null;
    return (
        // CONTAINER
        <div
            ref={ref}
            style={{
                position: 'absolute',
                color: theme.color,
                backgroundColor: theme.backgroundColor,
                padding: '10px',
                borderRadius: '15px',
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
                border: '2px solid #ff7f50',
                zIndex: 30,
            }}
        >
            {/* SHELL COMMAND */}
            {/* <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }} onClick={onCopyCommand}> */}
            <ShellDiv
                theme={{
                    codeBackgroundColor: theme.codeBackgroundColor,
                    onHoverCodeBackgroundColor: theme.onHoverCodeBackgroundColor,
                }}
                onClick={onCopyCommand}
            >
                <pre style={{ margin: 0 }}>
                    <code style={{ color: theme.codeColor }}>
                        {command}
                    </code>
                </pre>

                {/* OPT 3 */}
                {copied && (
                    <div style={{
                        position: 'absolute',
                        // Smaller values move higher
                        top: '27%', // Adjusted to be a bit higher
                        // Smaller values move to the right
                        left: '-70px', // Adjusted to be closer to the right
                        transform: 'translateY(-50%)',
                        padding: '5px 10px',
                        color: theme.color,
                        backgroundColor: theme.backgroundColor,
                        border: '1px solid black',
                        borderRadius: '10px',
                        boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
                        zIndex: 1,
                        whiteSpace: 'nowrap',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <span style={{ marginRight: '5px' }}>Copied!</span>
                        <div style={{
                            width: '0',
                            height: '0',
                            borderLeft: `10px solid ${theme.color}`,
                            borderTop: '5px solid transparent',
                            borderBottom: '5px solid transparent',
                            position: 'absolute',
                            right: '-10px',
                        }}></div>
                    </div>
                )}

            </ShellDiv>
            {/* WEB PAGE URL */}
            <div style={{
                paddingLeft: '6px',
                marginTop: '10px'
            }}>
                <MyLink
                    href={urlText}
                    target="_blank"
                    rel="noopener noreferrer"
                    theme={{
                        textColor: theme.color,
                    }}
                >
                    {urlText} <AppExternalURLIcon theme={{ lineColor: theme.color }} />
                </MyLink>
            </div>
        </div>
    );
});


export default SoftwareReleaseTooltip;
export type { SoftwareReleaseTooltipProps };
