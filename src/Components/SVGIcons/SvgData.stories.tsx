/* Storybook code for Predefined Icons, from SVG Data */


// import Component and Props Type
import IconSVG from './IconSVG';

// import Mapping of predefined SVG properties / data
import { SvgDataMapping } from './SvgData';


export const PredefinedIconsStory = () => (
    <div>
        {Object.entries(SvgDataMapping).map(([iconName, iconData]) => {
            return (
                <div id={iconName} key={iconName} style={{
                    // add bottom space to distinguish from below
                    marginBottom: "35px",
                }}>
                    <h3>{iconName}</h3>
                    <IconSVG style={{
                        ...iconData.svgStyles,
                        width: "100px",
                        height: "100px",
                    }}>
                        {iconData.svgChildren.map((pathProps, index) => (
                            <path key={index} {...pathProps} />
                        ))}
                    </IconSVG>
                </div>
            );
        })}
    </div>
);



// Configuration for rendering the component in storybook
export default {
    component: PredefinedIconsStory,
    title: "Predefined SVG Icons",
    tags: ["autodocs"],
};
