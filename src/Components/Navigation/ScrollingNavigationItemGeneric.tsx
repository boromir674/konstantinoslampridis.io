import React, { useCallback, FC } from "react";
import useHandleNavigationClickFunction from "../../Hooks/useNavigationClickHandler";

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
  children?: React.ReactNode;
}

const ScrollingNavigationItem: FC<ScrollingNavItemProps> = ({
  renderProps,
  data: { to, active },
  children,
}) => {
  // we want handleClick to NOT be recreated on re-render which happens on props or state change
  // handleClick will only be re-created if the 'to' props changes (which is not expected to happen at runtime never)
  const handleNavigationClick = useHandleNavigationClickFunction(to);

  return renderProps({ active, onClick: handleNavigationClick });
};

export default ScrollingNavigationItem;
