import React,{ FC } from 'react';

interface NavigationItem {
  id: string;
  label: string;
  isActive: boolean;
}

interface LowerLevelNavProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  containerStyles?: React.CSSProperties;
  navigationElement: FC;
}

function LowerLevelNav<T extends NavigationItem>({
    items,
    renderItem,
    containerStyles,
    navigationElement,
}: LowerLevelNavProps<T>) {
  return (
    <>
      {navigationElement}
    </>
    // < style={containerStyles}>
    //     {items.map((item, index) => (
    //       <div key={item.id}>{renderItem(item, index)}</div>
    //     ))}
    // </navigationElement>
  );
}

export default LowerLevelNav;
