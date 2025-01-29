/** Interface describing Styles for svg and path elements */

interface IconStyles {
    /** Style object, compatible with style prop of an svg DOM component */
    svgStyles?: React.SVGProps<SVGSVGElement>;
    /** Style object, compatible with style prop of a path DOM component
     * 
     * The 'd' attribute is not allowed here, since it defines the path itself,
     * not its style.
    */
    pathStyles?: Omit<React.SVGProps<SVGPathElement>, "d">[];
}

export default IconStyles;