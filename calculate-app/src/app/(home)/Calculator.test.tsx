// src/app/(home)/Calculator.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calculator from "./Calculator";

describe("Calculator", () => {
  test("renders the Calculator component", () => {
    render(<Calculator />);
    expect(
      screen.getByText("คำนวณสินเชื่ออสังหา เบื้องต้น")
    ).toBeInTheDocument();
  });

  test("handles price input correctly", () => {
    render(<Calculator />);
    const priceInput = screen.getByLabelText("ราคาอสังหาฯ") as HTMLInputElement;

    fireEvent.change(priceInput, { target: { value: "12000000" } });
    expect(priceInput.value).toBe("12000000");
  });

  test("validates interest rate input correctly", () => {
    render(<Calculator />);
    const interestRateInput = screen.getByLabelText("อัตราดอกเบี้ย") as HTMLInputElement;

    fireEvent.change(interestRateInput, { target: { value: "7.5" } });
    expect(interestRateInput.value).toBe("7.5");

    fireEvent.change(interestRateInput, { target: { value: "100.00" } });
    expect(screen.getByText("Invalid interest rate format")).toBeInTheDocument();
  });

  test("calculates monthly payment correctly", () => {
    render(<Calculator />);
    const priceInput = screen.getByLabelText("ราคาอสังหาฯ") as HTMLInputElement;
    const interestRateInput = screen.getByLabelText("อัตราดอกเบี้ย") as HTMLInputElement;
    const yearsInput = screen.getByLabelText("ระยะเวลากู้") as HTMLInputElement;

    fireEvent.change(priceInput, { target: { value: "12000000" } });
    fireEvent.change(interestRateInput, { target: { value: "6.5" } });
    fireEvent.change(yearsInput, { target: { value: "30" } });

    const calculateButton = screen.getByText("คำนวณสินเชื่อ");
    fireEvent.click(calculateButton);

    const expectedMonthlyPayment = "75,947.67"; // Expected result based on the formula
    expect(screen.getByText(expectedMonthlyPayment)).toBeInTheDocument();
  });

  test("resets the form correctly", () => {
    render(<Calculator />);
    const priceInput = screen.getByLabelText("ราคาอสังหาฯ") as HTMLInputElement;
    const interestRateInput = screen.getByLabelText("อัตราดอกเบี้ย") as HTMLInputElement;
    const yearsInput = screen.getByLabelText("ระยะเวลากู้") as HTMLInputElement;

    fireEvent.change(priceInput, { target: { value: "12000000" } });
    fireEvent.change(interestRateInput, { target: { value: "7.5" } });
    fireEvent.change(yearsInput, { target: { value: "15" } });

    const resetButton = screen.getByText("ล้างข้อมูล");
    fireEvent.click(resetButton);

    expect(priceInput.value).toBe("");
    expect(interestRateInput.value).toBe("");
    expect(yearsInput.value).toBe("");
  });
});