import * as React from "react";
import type { HeadFC } from "gatsby";
import { css } from "@emotion/react";

import "../css/indexPage.css";
import { useAppStyles } from "../Hooks/AppStyles";

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

const IndexPage = () => {
  const [appStyles] = useAppStyles();
  const breakpoints = [800];
  const mediaQueries = [
    "@media (min-width: 800px)",
    "@media (max-width: 800px)",
  ];

  // const mq = mediaQueries.map(bp => `@media (min-width: ${bp}px)`)
  const mq = mediaQueries.map((bp) => bp);
  // console.log(mq[0]);
  // console.log(mq[1]);
  return (
    <main style={pageStyles}>
      <div className="computerContainer">
        <div className="Header"></div>
        <div className="Side-Profile">
          <h2>Profile</h2>
        </div>
        <div className="Main-Pane">
          <div className="Introduction">
            <p>{"Hi, I am Konstantinos Lampridis :)"}</p>
          </div>
          <div
          // css={{
          //   gridArea: "Portfolio",
          //   [mq[0]]: {
          //     color: '#e5989b'
          //   },
          //   [mq[1]]: {
          //     color: '#a8dadc'
          //   }
          // }}

          // css={css`
          // grid-area: Portfolio;
          //   ${mq[0]} {
          //     color: #e5989b;
          //   }
          //   ${mq[1]} {
          //     color: #a8dadc;
          //   }
          // `}
          >
            <h3>Open Source Portfolio</h3>
          </div>
          <div className="Career">
            <h3>Professional Career</h3>
          </div>
        </div>
        <div className="Footer"></div>
      </div>
      <p
        data-testid="dynamic-el"
        css={css`
          background-color: #228be6;
          color: blue;
          @media (min-width: 800px) {
            font-size: 50px;
          }
        `}
      >
        Test text!
      </p>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
