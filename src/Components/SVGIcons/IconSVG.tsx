/* Provides a way to render SVG elements */

import React, { FC } from 'react';

// Component Props Interface
interface IconSVGProps {
    style: React.SVGProps<SVGSVGElement>;
    children: React.ReactNode;
}

/** 
* SVG element wrapper
* @summary SVG element wrapper, allowing full control over SVG elements.
*/
const IconSVG: FC<IconSVGProps> = ({ style, children }: IconSVGProps) => (
    <svg {...style}>
        {children}
    </svg>
);


export default IconSVG;
export type { IconSVGProps };
