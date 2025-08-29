/* Provides AppTag, a styled tag component with variants and hover effects.

Leverages different Component Tokens to map to different Semantic tokens
*/

import React from 'react';
import styled from '@emotion/styled';


interface StyledAppTagProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'warning';
  // Additional props can be added as needed
}


const StyledAppTag = styled.span`
  /* Base styles */
  padding: 8px 12px;
  border-radius: 20px;
  margin: 4px;
  border: 0.5px solid;
  transition: background-color 0.3s ease;
  font-family: var(--app-font, inherit);
  font-size: var(--app-font-size-body-lg, inherit);

  // DESIGN NOTES
  // Current Intention of this Tag is Surface and not container/"arranging of elements"
  // When the tag "becomes interactive" (ie on hover it "highlights" tags from Skills section), then Intention should switch to Surface Interactive
  // thus, we should change to var(--app-surface-interactive-primary)

  /* Default/Primary variant */
  background-color: var(--app-surface-primary);
  color: var(--app-on-surface-primary);
  border-color: var(--app-surface-primary-outline);

  &:hover {
    background-color: var(--app-surface-primary-hover);
    color: var(--app-on-surface-primary-hover);
  }

  /* Variant overrides */
  &.tag-secondary {
    background-color: var(--app-surface-secondary);
    color: var(--app-on-surface-secondary);
    border-color: var(--app-surface-secondary-outline);
    &:hover {
      background-color: var(--app-surface-secondary-hover);
      color: var(--app-on-surface-secondary-hover);
    }
  }

  &.tag-accent {
    background-color: var(--app-accent-container);
    color: var(--app-on-accent-container);
    border-color: var(--app-accent-outline);
  }
`;

// Simple wrapper that converts variant prop to className
const AppTag: React.FC<StyledAppTagProps & React.HTMLAttributes<HTMLSpanElement>> = ({
  // destructure only the props we care about
  variant,
  className,
  children,
  ...props
}) => {
  const variantClass = variant && variant !== 'primary' ? `tag-${variant}` : '';
  const finalClassName = [variantClass, className].filter(Boolean).join(' ');

  return <StyledAppTag className={finalClassName} {...props}>{children}</StyledAppTag>;
};


export default AppTag;

// export derived type of AppTag props
export type AppTagProps = React.ComponentProps<typeof AppTag>;
