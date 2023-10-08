// DESIGNER SPACE
// COMMON Styling Configuration between Light and Dark Modes

const commonStyling = {
  fontFamily: "Roboto, sans-serif",
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "1.5",
  letterSpacing: "0.00938em",
  // Header Navigation Bar (ie renders on Desktop view)
  headerNavigationBar: {
    padding: {
      vertical: "8px",
      horizontal: "28px",
    },
  },
  // Domain Specific Styling
  professional: {
    title: {
      padding: "15px",
    },
    item: {
      padding: "15px",
      onHoverTransformDuration: "0.5s",
      onHoverBackgroundColorChangeDuration: "0.7s",
      // onHoverTransitionDelay: '1s',
    },
    itemsColorModeSwitchDelay: 1.2,
  },
  education: {
    title: {
      padding: "15px",
    },
    item: {
      onHoverTransformDuration: "1.6s",
      onHoverBackgroundColorChangeDuration: "0.7s",
      // onHoverTransitionDelay: '1s',
      padding: "15px",
    },
  },
  portfolio: {
    item: {
      outline: {
        width: "3px",
      },
    },
  },
};


export { commonStyling };
