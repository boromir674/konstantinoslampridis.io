import * as React from "react";
import type { HeadFC } from "gatsby";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import "../css/indexPage.css";
import { useAppStyles } from "../Hooks/AppStyles";

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};


const Button = styled.button({
  color: "red",
  fontSize: "30px",
  "@media (max-width: 800px)": {
    color: "blue",
    fontSize: "20px",
  },
});


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
          <div>
            <h3>Open Source Portfolio</h3>
          </div>
          <div className="Career">
            <h3>Professional Career</h3>
          </div>
        </div>
        <div className="Footer"></div>
      </div>
      <Button data-testid="button-id">This my button component.</Button>
      <p
        className="tempp"
        data-testid="dynamic-el"
        css={{
          backgroundColor: "#228be6",
          color: "yellow",
        }}
      >
        Test text!
      </p>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
