import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CategoryCard from "./CategoryCard";

test("render Home page", () => {
  const data = {
    id: 1,
    name: "Category1",
    description: "sample text",
    key: "fruits",
  };

  render(<CategoryCard category={data} />);
  expect(screen.getByText(/Category1/)).toBeInTheDocument();
  expect(screen.getByText(/sample text/)).toBeInTheDocument();
  expect(screen.getByText(/fruits/)).toBeInTheDocument();
  expect(screen.getByText(/Explore fruits/)).toBeInTheDocument();
});
