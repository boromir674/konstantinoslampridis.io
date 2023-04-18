/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";
import { matchers } from "@emotion/jest";
import styled from "@emotion/styled";
import { unmountComponentAtNode } from "react-dom";

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

// Test Code
test("Styled Test: test renders with correct styles", () => {
  const MySpan = styled("span")`
    color: blue;
  `;
  const MyDiv = styled("div")`
    float: left;
    height: 80%;
    &:hover {
      width: 50px;
    }
  `;

  const tree = renderer
    .create(
      <MyDiv>
        <span>Test</span>
        <MySpan>GG</MySpan>
      </MyDiv>
    )
    .toJSON();

  expect(tree).toHaveStyleRule("float", "left");
  expect(tree).not.toHaveStyleRule("height", "100%");
  // expect(tree).toHaveStyleRule("color", "blue", { target: "MySpan" });
});
