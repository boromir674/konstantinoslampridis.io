/* Storybook code for Predefined Icons, from SVG Data */


// import Component and Props Type
import IconSVG, { IconSVGProps } from './IconSVG';

// import Mapping of predefined SVG properties / data
import { SvgDataMapping } from './SvgData';


// Declare Ancestor component of all predefined icons to
// allow dynamic rendering from elements in mapping


export const PredefinedIconsStory = () => {
    return (
        <div>
            {Object.entries(SvgDataMapping).map(([iconName, iconData]) => {
                return (
                    <div key={iconName}>
                        <h3>{iconName}</h3>
                        <IconSVG style={iconData.svgStyles} children={iconData.svgChildren} />
                    </div>
                );
            })}
        </div>
    );
}


// Configuration for rendering the component in storybook
export default {
    component: PredefinedIconsStory,
    title: "Predefined SVG Icons",
    tags: ["autodocs"],
};
