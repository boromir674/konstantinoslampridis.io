/**
 * @jest-environment jsdom
 */

import { expect, jest, test } from "@jest/globals";

import React from "react";
import renderer from "react-test-renderer";

import { matchers } from "@emotion/jest";

import IndexPage from "../src/pages/index";

expect.extend(matchers);

test("Trial Test", () => {
  const tree = renderer.create(<IndexPage />).toJSON();
  expect(tree).not.toHaveStyleRule("color", "#232129");

  // const { container: obj } = render(<IndexPage />);
  // console.log(tree);
  // const p = screen.getAllByTestId("button-id");

  // console.log(p);
  // expect(p).toHaveStyleRule("color", "blue");

  //   expect(tree).toHaveStyleRule("float", "left");
  //   expect(tree).not.toHaveStyleRule("height", "100%");
});
