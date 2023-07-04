import React, { useCallback, FC } from 'react';
import PortfolioItemData from './PortfolioItemInterface';

// import useHandlePortfolioItemClick from "../Hooks/usePortfolioItemClickHandler";

interface renderPortfolioItemCallbackArgs {
    onClick: () => void;
};
  
interface renderPortfolioItemCallback {
    (data: renderPortfolioItemCallbackArgs): React.ReactElement;
};


interface PortfolioItemProps<T> {
    renderProps: renderPortfolioItemCallback;
    data: T;
    children?: React.ReactNode;
};

const PortfolioItemGeneric: FC<PortfolioItemProps<PortfolioItemData>> = ({ renderProps, data, children}) => {
    // we want handleClick to NOT be recreated on re-render which happens on props or state change
    // handleClick will only be re-created if the 'to' props changes (which is not expected to happen at runtime never)
    // const handlePortfolioItemClick = useHandlePortfolioItemClick(data);

    // return renderProps({onClick: handlePortfolioItemClick});
    return renderProps({onClick: () => null});
};

export default PortfolioItemGeneric;
