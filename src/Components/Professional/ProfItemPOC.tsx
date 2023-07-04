import React from "react";
import { css } from "@emotion/react";

interface ProfItemProps {
  title: string;
  duration: string;
  company: string;
  location: string;
  description: string;
}

const ProfItem: React.FC<ProfItemProps> = ({
  title,
  duration,
  company,
  location,
  description,
}) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: max-content auto;
        grid-gap: 4px;
        margin-bottom: 16px;
      `}
    >
      <h3
        css={css`
          margin: 0;
          font-size: 18px;
          font-weight: bold;
        `}
      >
        {title}
      </h3>
      <p
        css={css`
          margin: 0;
          font-size: 14px;
        `}
      >
        {location}
      </p>
      <p
        css={css`
          margin: 0;
          font-size: 14px;
          grid-column-start: 1;
          grid-column-end: 3;
        `}
      >
        {company}
      </p>
      <p
        css={css`
          margin: 0;
          font-size: 14px;
          grid-column-start: 1;
          grid-column-end: 3;
        `}
      >
        {duration}
      </p>
      <p
        css={css`
          margin: 8px 0;
          font-size: 14px;
          grid-column-start: 1;
          grid-column-end: 3;
        `}
      >
        {description}
      </p>
    </div>
  );
};

export default ProfItem;
