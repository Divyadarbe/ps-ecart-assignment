import React from "react";
import { render, screen } from "@testing-library/react";
import Signup from "./index";
import userEvent from "@testing-library/user-event";

describe("<Signup />", () => {
  test("render signup", () => {
    render(<Signup />);
    const headingElement = screen.getByTestId("heading");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(/Signup/i);
  });

  test("should render a signup button", () => {
    render(<Signup />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });
  test("render email input", () => {
    render(<Signup />);
    const inputEl = screen.getByTestId("email");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "email");
  });

  test("render password", () => {
    render(<Signup />);
    const inputEl = screen.getByTestId("password");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "password");
  });
  test("render first name input", () => {
    render(<Signup />);
    const inputEl = screen.getByTestId("firstName");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
  });
  test("render last name input", () => {
    render(<Signup />);
    const inputEl = screen.getByTestId("lastName");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
  });
  test("render confirm password", () => {
    render(<Signup />);
    const inputEl = screen.getByTestId("confirmPassword");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "password");
  });

  test("pass valid email to test email input field", () => {
    render(<Signup />);
    const inputEl = screen.getByTestId("email");
    userEvent.type(inputEl, "test@mail.com");
    expect(screen.getByTestId("email")).toHaveValue("test@mail.com");
  });
  test("pass valid password to test email input field", () => {
    render(<Signup />);
    const inputEl = screen.getByTestId("password");
    userEvent.type(inputEl, "Test1234");
    expect(screen.getByTestId("password")).toHaveValue("Test1234");
  });
  test("check password and confirm password matches", () => {
    render(<Signup />);
    const inputEl1 = screen.getByTestId("password");
    const inputEl2 = screen.getByTestId("confirmPassword");
    userEvent.type(inputEl1, "Test123");
    userEvent.type(inputEl2, "Test123");
    expect(screen.getByTestId("password")).toHaveValue("Test123");
    expect(screen.getByTestId("confirmPassword")).toHaveValue("Test123");
  });
});
