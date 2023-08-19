/* Provides a Component to render the Tokens JSON in a readable format */
import React, { FC } from "react";

import DATA from "./tokens.json";

type TokensData = {
  [key: string]: string;
};

const ColorPalette: FC = () => {
  const sourceColor = "#ff9288";

  // auxiliary
  const colorData: TokensData = DATA;

  const colorCategories = [
    { name: "primary", palette: "md-ref-palette-primary" },
    { name: "secondary", palette: "md-ref-palette-secondary" },
    { name: "tertiary", palette: "md-ref-palette-tertiary" },
    { name: "neutral", palette: "md-ref-palette-neutral" },
    { name: "neutral-variant", palette: "md-ref-palette-neutral-variant" },
  ];

  const getColorValue = (category: string, step: number) => {
    const palette = `--${category}${step}`;
    console.log("PALLETE", palette);
    const res = colorData[`${palette}`];
    console.log(res);
    return res;
  };
  return (
    <div>
      <div>
        Storybook Addon:
        <a
          href="https://storybook.js.org/addons/storybook-design-token"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://storybook.js.org/addons/storybook-design-token
        </a>
      </div>
      <p />
      <div>
        <span>Source Color: </span>
        <div
          style={{
            width: "50px",
            height: "50px",
            background: sourceColor,
            display: "inline-block",
            marginLeft: "10px",
            border: "1px solid #000",
          }}
        />
      </div>
      <p />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "10px",
        }}
      >
        {colorCategories.map((category) => (
          <React.Fragment key={category.name}>
            <span>{category.name}:</span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(11, 30px)",
                gap: "10px",
              }}
            >
              {Array.from({ length: 11 }, (_, i) => i * 10).map((step) => (
                <div
                  key={step}
                  style={{
                    width: "30px",
                    height: "30px",
                    background: getColorValue(category.palette, step),
                    border: "1px solid #000",
                  }}
                />
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div>
        <h2>Color Palette</h2>
        <div className="color-box-container">
          {Object.entries(colorData).map(([variable, color]) => (
            <div
              key={variable}
              className="color-box"
              style={{ background: color }}
            >
              <span>{variable}</span>
              <span>{color}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
