fffimport React from "react";

interface renderNavItemCallbackArgs {
  to: string;
  active?: boolean;
  children?: React.ReactNode;
}

interface renderNavItemCallback {
  (data: renderNavItemCallbackArgs): React.ReactNode;
}

interface NavItemProps {
  renderProps: renderNavItemCallback;
  handleClick: () => void;
  data: {
      key: string;
      to: string;
      active?: boolean;
  };
  // theme: Theme;
  children?: React.ReactNode;
}
  
const NavItemGeneric: React.FC<NavItemProps> = ({
    renderProps,
    data,
    handleClick,
    children,
    // key,
    // to,
    // active,
    // theme,
}) => {

    return (
      // V3
      {renderProps()}


      // V2
      // <div key={data.key} onClick={handleClick}>{renderProps({
      //     to: data.to,
      //     active: data.active || false,
      //     children,
      //   })}</div>
      
      // V1
      // <NavButton active={active} theme={theme} onClick={handleClick}>
        //   {children}
        // </NavButton>
    //   </li>
    );
};

export default NavItemGeneric;


