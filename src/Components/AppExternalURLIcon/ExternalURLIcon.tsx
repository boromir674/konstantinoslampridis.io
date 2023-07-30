import { FC } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Find your icon here https://fontawesome.com/icons
import {
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";


const AppExternalURLIcon: FC = () => {

    return (
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="2xs" />
    );
};

export default AppExternalURLIcon;
