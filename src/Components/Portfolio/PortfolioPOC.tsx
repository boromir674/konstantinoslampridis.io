import React, { useState } from "react";
import { css, SerializedStyles } from "@emotion/react";

interface PortfolioItem {
  id: number;
  content: string;
}

const Portfolio: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const handleExpandItem = (itemId: number) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems((prevExpandedItems) =>
        prevExpandedItems.filter((id) => id !== itemId)
      );
    } else {
      setExpandedItems((prevExpandedItems) => [...prevExpandedItems, itemId]);
    }
  };

  const getItemStyles = (itemId: number): SerializedStyles => css`
    width: ${expandedItems.includes(itemId) ? "100%" : "50%"};
    height: ${expandedItems.includes(itemId) ? "100%" : "auto"};
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    box-sizing: border-box;
    transition: all 0.3s ease-in-out;
    overflow: ${expandedItems.includes(itemId) ? "auto" : "hidden"};
  `;

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur eros vel leo sodales, nec rutrum sapien tempus.",
    },
    {
      id: 2,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur eros vel leo sodales, nec rutrum sapien tempus.",
    },
    {
        id: 3,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur eros vel leo sodales, nec rutrum sapien tempus.",
      },
      {
        id: 4,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur eros vel leo sodales, nec rutrum sapien tempus.",
      },
      {
        id: 5,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur eros vel leo sodales, nec rutrum sapien tempus.",
      },
      {
        id: 6,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur eros vel leo sodales, nec rutrum sapien tempus.",
      },
  ];

  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 100vh;
        background-color: #f0f0f0;
        padding: 20px;
        box-sizing: border-box;
      `}
    >
      {portfolioItems.map((item) => (
        <div
          key={item.id}
          css={getItemStyles(item.id)}
          onClick={() => handleExpandItem(item.id)}
        >
          <h2>Portfolio Item {item.id}</h2>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
