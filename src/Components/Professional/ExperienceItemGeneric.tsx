import React, { FC } from 'react';

import ExperienceItemData from './ExperienceItemInterface';

import useHandlePortfolioItemClick from "../../Hooks/usePortfolioItemClickHandler";


interface renderCVSectionItemCallbackArgs<T> {
    onClick: () => void;
    dataInterface: T;
};
  
interface renderCVSectionItemCallback<T> {
    (data: renderCVSectionItemCallbackArgs<T>): React.ReactElement;
};


interface CVSectionItemProps<T> {
    renderProps: renderCVSectionItemCallback<T>;
    data: T;
    children?: React.ReactNode;
};


const PortfolioItemGeneric: FC<CVSectionItemProps<ExperienceItemData>> = ({ renderProps, data, children}) => {
    // we want handleClick to NOT be recreated on re-render which happens on props or state change
    // handleClick will only be re-created if the 'to' props changes (which is not expected to happen at runtime never)
    const handlePortfolioItemClick = useHandlePortfolioItemClick();

    // return renderProps({onClick: handlePortfolioItemClick});
    return renderProps({onClick: handlePortfolioItemClick, dataInterface: data});
};

export default PortfolioItemGeneric;
