import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./index";

test("render copyright text", () => {
  render(<Footer />);
  expect(screen.getByText(/Copyright/)).toBeInTheDocument();
});
