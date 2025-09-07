import { forwardRef } from 'react';
import styled from "@emotion/styled";

import AppExternalURLIcon from "../../AppExternalURLIcon";

interface ResourceLinkTooltipProps {
  theme: {
    color: string;
    backgroundColor: string;
  };
  urlText: string;
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
const ResourceLinkTooltip = forwardRef<HTMLDivElement, ResourceLinkTooltipProps>(({ theme, urlText, visible }, ref) => {
  if (!visible) return null;

  // Handle touch events for the link (backup for mobile)
  const handleLinkTouch = (event: React.TouchEvent<HTMLAnchorElement>) => {
    // Prevent default to avoid any conflicts
    event.preventDefault();
    // Manually open the URL in a new tab/window
    window.open(urlText, '_blank', 'noopener,noreferrer');
  };

  return (
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
        zIndex: 1000,
      }}
    >
      <MyLink
        href={urlText}
        target="_blank"
        rel="noopener noreferrer"
        onTouchEnd={handleLinkTouch}
        theme={{
          textColor: theme.color,
        }}
      >
        {urlText} <AppExternalURLIcon theme={{ lineColor: theme.color }} />
      </MyLink>
    </div>
  );
});


export default ResourceLinkTooltip;