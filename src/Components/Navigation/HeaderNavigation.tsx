import React, { FC } from "react";
import * as styles from './HeaderNavigation.module.css';

import useScreenScrollHandler from "../../Hooks/useScreenScrollHandler";

import ScrollingNavigationItemGeneric from "./ScrollingNavigationItemGeneric";
import AppHorNavItem from "./AppHorNavItem";


interface HorizontaNavBarProps {
  items: {
    label: string;
    to_element_id: string;
  }[];
  activeItem: string;
  theme: {
    fontFamily: string;
    fontSize: string;
    colorSet: {
      textColor: string;
      backgroundColor: string;
      hoverBackgroundColor: string;
      hoverTextColor: string;
      activatedTextColor: string;
      activatedBackgroundColor: string;
    };
    // paddings for vertical and horizontal control
    padding: {
      vertical: string;
      horizontal: string;
    };
  };
}

const HorizontalNavBar: FC<HorizontaNavBarProps> = ({ items, theme: { fontFamily, fontSize, colorSet, padding } }) => {
  // whenever the user makes a scroll we capture the "screen view position"
  // and we store in the 'activeLinkIndex' state attribute of this component
  // since the state value gets updated on scroll event,
  // the re-render triggers essentially on scroll event
  const activeLinkIndex = useScreenScrollHandler(items);

  return (
    <nav 
      className={styles.navContainer}
      style={{
        '--nav-font-family': fontFamily,
        '--nav-font-size': fontSize,
      } as React.CSSProperties}
    >
      {items.map((item, index) => (
        <ScrollingNavigationItemGeneric // alows wiring onClick event to scroll
          renderProps={({ active, onClick }) => (
            <AppHorNavItem  // anchor <a>
              key={index}
              // aria-current={activeLinkIndex === index ? "true" : undefined}
              theme={{ colorSet, padding }}
              active={active}
              onClick={onClick}  // useHandleNavigationClickFunction(htmlID)
            >
              {item.label}
            </AppHorNavItem>
          )}
          key={index}
          data={{
            to: item.to_element_id,
            active:
              item.to_element_id === items[activeLinkIndex || 0].to_element_id,
          }}
        ></ScrollingNavigationItemGeneric>
      ))}
    </nav>
  );
};

export default HorizontalNavBar;
