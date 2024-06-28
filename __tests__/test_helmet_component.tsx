/**
 * @jest-environment jsdom
*/

import React from "react";
// for snapshot testing
import renderer from "react-test-renderer";
import { matchers } from "@emotion/jest";
import styled from "@emotion/styled";
import { unmountComponentAtNode } from "react-dom";
import '@testing-library/jest-dom';
// for actually rendering into the DOM
import { render } from '@testing-library/react';


// import code related to the business-logic to test
// Eg; App code, 3rd-party libs, etc
import { Helmet } from 'react-helmet';

// import '@testing-library/jest-dom';

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

// Set Up / Tear Down code
interface ContainerInterface {
  remove: () => void;
}

type Container = Element | DocumentFragment;
let container: Container | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container as Container);
  (container as ContainerInterface).remove();
  container = null;
});

// A simple component that uses Helmet to apply CSS reset
const CssResetWithHelmet: React.FC = () => (
  <Helmet>
    <style id="css-reset">
      {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html, body {
          width: 100%;
          height: 100%;
          overflow-x: hidden;
        }
      `}
    </style>
  </Helmet>
);

// this Unit Test Assertion FAILS
test('Helmet: verify style prop of Helmet does NOT apply CSS reset', () => {
  render(<CssResetWithHelmet />);

  const styleContent = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html, body {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
    }
  `;

// ASSERTION
  expect(document.head).not.toHaveTextContent(styleContent);
});

// this Unit Test Assertion FAILS
// test("Helmet: renders Helmet component and verifies the head and body elements", () => {

//     // Test to check if the Helmet component renders correctly

//       // Render the component
//       const tree = renderer.create(<CssResetWithHelmet />).toJSON();
      
//       // Get the head element and Verify head is in the document
//       const head = document.head;
    
//       // Get the body element
//       const body = document.body;
  
//       // Ensure the body's initial styles are applied correctly
//       // ASSERTIONS
//       const bodyComputedStyle = getComputedStyle(body);
//       expect(bodyComputedStyle.margin).toBe('0px');
//       expect(bodyComputedStyle.padding).toBe('0px');
//       expect(bodyComputedStyle.overflowX).toBe('hidden');
//     }
// );
