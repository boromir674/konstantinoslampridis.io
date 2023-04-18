/**
 * @jest-environment jsdom
 */

import React from "react";
import { Context as ResponsiveContext } from "react-responsive";
import { render } from "@testing-library/react";
// import "@testing-library/jest-dom"; // Custom jest matchers to test the state of the DOM

import IndexPage from "../src/pages/index";

describe("Test App width = 700", () => {
  test("matches the snapshot", () => {
    const { container: mobile } = render(
      <ResponsiveContext.Provider value={{ width: 700 }}>
        <IndexPage />
      </ResponsiveContext.Provider>
    );
    expect(mobile).toMatchSnapshot();
  });
});

describe("Test App width = 400", () => {
  test("matches the snapshot", () => {
    const { container: mobile } = render(
      <ResponsiveContext.Provider value={{ width: 400 }}>
        <IndexPage />
      </ResponsiveContext.Provider>
    );
    expect(mobile).toMatchSnapshot();
  });
});
