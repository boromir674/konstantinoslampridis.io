import { FC, forwardRef } from 'react';
import styled from "@emotion/styled";

import AppExternalURLIcon from "../../AppExternalURLIcon";

interface SoftwareReleaseTooltipProps {
    theme: {
        color: string;
        backgroundColor: string;
    };
    data: {
        command: string;
        urlText: string;
    }
    visible: boolean;
}

// Inner Components
interface URLProps {
    theme: {
        textColor: string;
    };
}
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
const SoftwareReleaseTooltip = forwardRef<HTMLDivElement, SoftwareReleaseTooltipProps>(({ theme, data: { command, urlText }, visible }, ref) => {
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
            <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
                <pre style={{ margin: 0 }}>
                    <code style={{ color: '#d63384' }}>
                        {command}
                    </code>
                </pre>
            </div>
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
