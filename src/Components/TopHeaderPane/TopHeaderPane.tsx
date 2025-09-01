import React, { FC, useState, useEffect } from "react";
import * as styles from './TopHeaderPane.module.css';

import { ToggleSlider } from "../MyToggleSwitch1";
import { HorizontalNavBar } from "../Navigation";

/**
 * Data that the TopHeaderPane (for big screens) can receive
 * @summary This is how the App represents the Personal Information of a Person.
 * @interface PersonalInfo
 * @property {string[]} sectionNames - The names of the sections that the user can navigate to.
 * @property {(active: boolean): void} onToggle - The function that is called when the toggle is clicked, given current state of the toggle.
 * @property {boolean} active - The current state of the toggle; active = true means toggle on the right.
 **/
interface TopHeaderPaneData {
  sections: {
    name: string;
    to_element_id: string;
  }[];
  // sectionNames: string[];
  // if active is true it means toggle is on the left
  onToggle: (active: boolean) => void;
  // if true is given for active then the toggle starting position would be on the right
  active: boolean;
}

interface TopHeaderPaneProps {
  theme: {
    backgroundColor: string;
    navigationBar: {
      fontFamily: string;
      fontSize: string;
      textColor: string;
      backgroundColor: string;
      hoverBackgroundColor: string;
      hoverTextColor: string;
      activatedTextColor: string;
      activatedBackgroundColor: string;
    };
    themeSwitch: {
      backgroundColor: string;
      backgroundColorActive: string;
      handleBackgroundColor: string;
      handleBackgroundColorActive: string;
    };
  };
  data: TopHeaderPaneData;
  navBarLeftOffset?: number; // Optional left offset for navbar positioning
}

const TopHeaderPane: FC<TopHeaderPaneProps> = ({
  theme,
  data: { sections, active, onToggle },
  navBarLeftOffset = 0, // Default to no offset
}) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);  // run only on 1st time Render/DOM update

  // FOUC Prevention: Empty string until mounted, then show real value
  // CSS Module handles the placeholder display
  const themeText = isMounted ? (active ? 'Dark' : 'Light') : '';

  // Aria label that matches the visual content to avoid label-content-name-mismatch
  const themeAriaLabel = isMounted ? themeText : 'Theme';

  return (
    <div className={styles.container}>
      {/* Left side: Theme toggle + label */}
      <div className={styles.themeToggleSection}>
        <ToggleSlider
          active={active}
          onToggle={onToggle}
          barBackgroundColor={theme.themeSwitch.backgroundColor}
          barBackgroundColorActive={theme.themeSwitch.backgroundColorActive}
          handleBackgroundColor={theme.themeSwitch.handleBackgroundColor}
          handleBackgroundColorActive={theme.themeSwitch.handleBackgroundColorActive}
        />
        <span
          className={styles.themeText}
          aria-label={themeAriaLabel}
        >
          {themeText}
        </span>
      </div>

      {/* Center: Navigation bar positioned over main content area */}
      <div
        className={styles.navBarSection}
        style={{
          transform: `translateX(${navBarLeftOffset}px)`,
        }}
      >
        <HorizontalNavBar
          // replace the name key from section objects with the 'label' key to match interface of HorizontalNavBar props
          items={sections.map((section_data) =>
            Object.assign(section_data, { label: section_data.name })
          )}
          activeItem={sections[0].name}
          theme={{
            fontFamily: theme.navigationBar.fontFamily,
            fontSize: theme.navigationBar.fontSize,
            colorSet: theme.navigationBar,
            padding: {
              vertical: "8px",
              horizontal: "28px",
            },
          }}
        />
      </div>
    </div>
  );
};

export type { TopHeaderPaneProps };
export default TopHeaderPane;
