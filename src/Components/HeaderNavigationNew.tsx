import React, { FC } from 'react';
import styled from "@emotion/styled";
import ScrollingNavigationItem from "./ScrollingNavigationItemGeneric";
import LowerLevelNav from "./NavigationGeneric";

interface HeaderNavigationProps {
    children?: React.ReactNode;
    theme: any;
}


// TODO: replace with build-time data (ie use gatsby hook or graphql at build-time)
const navData = [
    {
        id: 'home',
      label: '#initial-view',
      isActive: true,
      links: [
        { label: 'Link 1', handleClick: () => {} },
        { label: 'Link 2', handleClick: () => {} },
        { label: 'Link 3', handleClick: () => {} },
      ],
    },
    {
        id: 'Section 2',
      label: '#introduction',
      isActive: false,
      links: [
        { label: 'Link 4', handleClick: () => {} },
        { label: 'Link 5', handleClick: () => {} },
      ],
    },
    {
        id: 'Section 3',
      label: 'Section 3',
      isActive: false,
      links: [{ label: 'Link 6', handleClick: () => {} }],
    },
  ];

//   const navButtonStyles = css`
//   background-color: transparent;
//   border: none;
//   cursor: pointer;
//   font-size: 1.2rem;
//   font-weight: bold;
//   margin: 0 1rem;
//   padding: 0;
//   text-decoration: none;
//   color: ${(props) => (props.isActive ? 'red' : 'blue')};

//   &:hover {
//     text-decoration: underline;
//   }
// `;
interface Theme {
    primaryColor: string;
    secondaryColor: string;
}
interface NavButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    active?: boolean;
    theme: Theme;
}

const NavButton = styled.button<NavButtonProps>`
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 999px;
  background-color: ${(props) =>
    props.active ? props.theme.primaryColor : props.theme.secondaryColor};
  color: ${(props) => (props.active ? "#fff" : props.theme.primaryColor)};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.primaryColor};
    color: #fff;
  }
`;


interface NavigationHorizontalItem {
    id: string;
    label: string;
    isActive: boolean;
  }

const HeaderNavNew: FC<HeaderNavigationProps> = ({ theme }) => {

    return (
        <LowerLevelNav
            items={navData}
            renderItem={(item: NavigationHorizontalItem, index: number) => (
                <ScrollingNavigationItem
                    renderProps={({
                        to: string,
                        active: boolean,
                        // children: React.ReactNode,
                    }) => <NavButton theme={theme}></NavButton>}
                    data={{
                        key: item.id,
                        to: item.label,
                        active: item.isActive
                    }}
                >
                    {item.label}
                </ScrollingNavigationItem>
            )}
            containerStyles={{}}
        />
        // </LowerLevelNav>
    );
};
    //   <nav>
    //     <LowerLevelNav<NavigationHorizontalItem>
    //         items={navData}
    //         renderItem={(item) => (
    //             <button
    //             css={navButtonStyles}
    //             onClick={item.handleClick}
    //             type="button"
    //             >
    //             {item.label}
    //             </button>
    //         )}
    //     />
    //     </nav>

    //       ButtonComponent={({ label, handleClick, isActive }) => (
    //         <button css={navButtonStyles} onClick={handleClick} isActive={isActive}>
    //           {label}
    //         </button>
    //       )}
    //       sections={navData}
    //     />
    //   </nav>

    export default HeaderNavNew;
