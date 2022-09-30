/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";
import { unmountComponentAtNode } from "react-dom";
// To make 'toHaveStyleRule' work
import { matchers } from "@emotion/jest";
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

const Button = (props) => (
  <button
    css={{
      color: "hotpink",
    }}
    {...props}
  />
);

test("Button renders correctly", () => {
  const tree = renderer.create(<Button>This is hotpink.</Button>);
  const jsonTree = tree.toJSON();
  expect(jsonTree).toMatchSnapshot();
  expect(jsonTree).not.toHaveStyleRule("color", "hotpink");
  // expect(jsonTree).toHaveStyleRule("color", "hotpink", { target: "Button" });
});
