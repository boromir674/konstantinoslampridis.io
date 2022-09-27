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
  console.log(mq[0])
  console.log(mq[1])
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
            <p>I like creating, socializing, playing!</p>
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
    css={css`
      color: blue;
      @media (min-width: 800px) {
        font-size: 50px;
      }
    `}
  >
    Some text!
  </p>
      {/* <h1 style={headingStyles}>
        Congratulations
        <br />
        <span style={headingAccentStyles}>— you just made a Gatsby site! 🎉🎉🎉</span>
      </h1>
      <p style={paragraphStyles}>
        Edit <code style={codeStyles}>src/pages/index.tsx</code> to see this page
        update in real-time. 😎
      </p>
      <ul style={doclistStyles}>
        {docLinks.map(doc => (
          <li key={doc.url} style={docLinkStyle}>
            <a
              style={linkStyle}
              href={`${doc.url}?utm_source=starter&utm_medium=ts-docs&utm_campaign=minimal-starter-ts`}
            >
              {doc.text}
            </a>
          </li>
        ))}
      </ul>
      <ul style={listStyles}>
        {links.map(link => (
          <li key={link.url} style={{ ...listItemStyles, color: link.color }}>
            <span>
              <a
                style={linkStyle}
                href={`${link.url}?utm_source=starter&utm_medium=start-page&utm_campaign=minimal-starter-ts`}
              >
                {link.text}
              </a>
              {link.badge && (
                <span style={badgeStyle} aria-label="New Badge">
                  NEW!
                </span>
              )}
              <p style={descriptionStyle}>{link.description}</p>
            </span>
          </li>
        ))}
      </ul>
      <img
        alt="Gatsby G Logo"
        src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
      /> */}
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
