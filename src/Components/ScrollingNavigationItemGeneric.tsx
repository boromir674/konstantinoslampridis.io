import React, { useCallback, FC } from 'react';


interface renderNavItemCallbackArgs {
    onClick: () => void;
    active: boolean;
  }
  
interface renderNavItemCallback {
    (data: renderNavItemCallbackArgs): React.ReactElement;
}

interface ScrollingNavItemProps {
    renderProps: renderNavItemCallback;
    data: {
        to: string;
        active: boolean;
    };
    // theme: Theme;
  children?: React.ReactNode;
  }


const ScrollingNavigationItem: FC<ScrollingNavItemProps> = ({ renderProps, data: { to, active}, children}) => {

    // we want handleClick to NOT be recreated on re-render which happens on props or state change
    // handleClick will only be re-created if the 'to' props changes (which is not expected to happen at runtime never)
    const handleClick = useCallback(() => {
        const target = document.querySelector(to);
        if (target) {
          const yOffset = -100; // adjust this as needed
          const y =
            target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
    }, [to]);

    return renderProps({active, onClick: handleClick});
};

export default ScrollingNavigationItem;
