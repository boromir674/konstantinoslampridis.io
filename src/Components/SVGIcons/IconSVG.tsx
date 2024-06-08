// /* Provides a way to render icons, leveraging svg */

import { FC } from 'react';

// Component Props Interface
interface IconSVGProps { 
    style: React.SVGProps<SVGSVGElement>;
    children: React.ReactNode;
}

// React Component
const IconSVG: FC<IconSVGProps> = ({ style, children }) => {

    return (
        <svg {...style}>
            {children}
        </svg>
    );

}


export default IconSVG;
export type { IconSVGProps };
