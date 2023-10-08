/** Common Styling Interface, ivariant of Color Mode (variant)
 **/
interface CommonStylingInterface {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing: string;

    /// NAVIGATION ///
    headerNavigationBar: {
        padding: {
            vertical: string;
            horizontal: string;
        };
    };
    /// EDUCATION Section ///
    education: {
        title: {
            padding: string;
        };
        item: {
            padding: string;
            onHoverTransformDuration: string;
            onHoverBackgroundColorChangeDuration: string;
        };
    };
    /// PROFESSIONAL Section ///
    professional: {
        itemsColorModeSwitchDelay: number;
        title: {
            padding: string;
        };
        item: {
            padding: string;
            onHoverTransformDuration: string;
            onHoverBackgroundColorChangeDuration: string;
        };
    };
    /// PORTFOLIO Section ///
    portfolio: {
        item: {
            outline: {
                width: string;
            };
        };
    };
}


export { type CommonStylingInterface };
