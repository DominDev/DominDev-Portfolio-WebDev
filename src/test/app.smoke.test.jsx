import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("App smoke", () => {
  it("renders the main portfolio structure", () => {
    const { container } = render(<App />);

    expect(container.querySelector("main#main")).toBeTruthy();
    expect(container.querySelector("header")).toBeTruthy();
    expect(container.querySelector("footer")).toBeTruthy();
    expect(container.querySelector("section#top")).toBeTruthy();
    expect(container.querySelector("section#about")).toBeTruthy();
    expect(container.querySelector("section#architecture")).toBeTruthy();
  });
});
