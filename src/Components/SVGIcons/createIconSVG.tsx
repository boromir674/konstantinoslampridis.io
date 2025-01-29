/* Provides a function to render an App SVG Icon */

import React from 'react';
import IconSVG, { IconSVGProps } from './IconSVG';

import { SvgDataMapping } from './SvgData';


/** 
* Instantiate an SVG from predefined data, with optional override ability.
* 
* Call to render JSX with an <svg> element and <path> elements from predefined
* data. Allows overriding the default styles of the <svg> and <path> elements.
* 
* Override the svg style to implement light/dark color mode switch (aka theming).
*/
const createSVGIcon = (
    icon_type: string,
    overrideInitialIconProps?: {
        svgStyles?: IconSVGProps["style"];
        // Path props, except for d attribute
        pathStyles?: Omit<React.SVGProps<SVGPathElement>, "d">[];
    },
): JSX.Element => (
    <IconSVG style={{
        ...SvgDataMapping[icon_type].svgStyles,
        ...overrideInitialIconProps?.svgStyles,
    }}>
        {SvgDataMapping[icon_type].svgChildren.map((defaultPathProps, index) => (
            <path
                key={index}
                d={defaultPathProps.d}
                {...{
                    ...defaultPathProps,
                    ...overrideInitialIconProps?.pathStyles?.[index],
                }}
            />
        ))}
    </IconSVG>
)


export { createSVGIcon };
