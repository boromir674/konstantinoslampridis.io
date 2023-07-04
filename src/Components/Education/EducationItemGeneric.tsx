import React, { FC } from 'react';

import EducationItemData from './EducationItemInterface';
import useEducationItemClickHandler from "../../Hooks/useEducationItemClickHandler";

interface EducationSectionItemProps<T> {
    renderProps: (data: {
        onClick: () => void;
        dataInterface: T;
        onBackgroundHover: () => void;
    }) => React.ReactElement;
    data: T;
};


const PortfolioItemGeneric: FC<EducationSectionItemProps<EducationItemData>> = ({ renderProps, data}) => {
    const handleEducationItemClick = useEducationItemClickHandler();
    return renderProps({onClick: handleEducationItemClick, dataInterface: data, onBackgroundHover: () => {}});
};

export default PortfolioItemGeneric;
