import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./index";
import userEvent from "@testing-library/user-event";

describe("<Login />", () => {
  test("render login", () => {
    render(<Login />);
    const headingElement = screen.getByTestId("heading");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(/Login/i);
  });

  test("should render a login button", () => {
    render(<Login />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("render email input", () => {
    render(<Login />);
    const inputEl = screen.getByTestId("email");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "email");
  });

  test("render password", () => {
    render(<Login />);
    const inputEl = screen.getByTestId("password");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "password");
  });
  test("pass valid email to test email input field", () => {
    render(<Login />);
    const inputEl = screen.getByTestId("email");
    userEvent.type(inputEl, "test@mail.com");
    expect(screen.getByTestId("email")).toHaveValue("test@mail.com");
  });
  test("pass valid password to test email input field", () => {
    render(<Login />);
    const inputEl = screen.getByTestId("password");
    userEvent.type(inputEl, "Test1234");
    expect(screen.getByTestId("password")).toHaveValue("Test1234");
  });
});
