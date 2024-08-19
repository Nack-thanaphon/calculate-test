import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from "./page";

describe("Calculator Component - ภาษาไทย", () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  test("ควรจัดรูปแบบการป้อนข้อมูลราคาอสังหาฯ ให้ถูกต้อง", () => {
    const priceInput = screen.getByRole('textbox', { name: /ราคาอสังหาฯ/i });
    fireEvent.change(priceInput, { target: { value: "1000000" } });
    expect(priceInput).toHaveValue("1,000,000");
  });


  test("ไม่ควรให้ป้อนข้อมูลราคาสูงกว่า 99,999,999,999", () => {
    const priceInput = screen.getByRole('textbox', { name: /ราคาอสังหาฯ/i });
    fireEvent.change(priceInput, { target: { value: "100000000000" } });
    expect(priceInput).toHaveValue("99,999,999,999");
  });

  // test("ควรให้ป้อนตัวเลขในอัตราดอกเบี้ยไม่เกิน 99.99", () => {
  //   const interestRateInput = screen.getByLabelText(/อัตราดอกเบี้ย/i);
  //   fireEvent.change(interestRateInput, { target: { value: "100" } });
  //   expect(interestRateInput).toHaveValue("99.99");
  // });

  // test("ควรคำนวณยอดผ่อนต่อเดือนอย่างถูกต้อง", () => {
  //   const priceInput = screen.getByLabelText(/ราคาอสังหาฯ/i);
  //   const interestRateInput = screen.getByLabelText(/อัตราดอกเบี้ย/i);
  //   const yearsInput = screen.getByLabelText(/ระยะเวลากู้/i);
  //   const calculateButton = screen.getByText(/คำนวณสินเชื่อ/i);

  //   fireEvent.change(priceInput, { target: { value: "3000000" } });
  //   fireEvent.change(interestRateInput, { target: { value: "5.5" } });
  //   fireEvent.change(yearsInput, { target: { value: "20" } });

  //   fireEvent.click(calculateButton);

  //   const monthlyPaymentElement = screen.getByText(/ยอดผ่อนต่อเดือน/i);
  //   expect(monthlyPaymentElement).toBeInTheDocument();
  //   expect(screen.getByText(/20,543.00/)).toBeInTheDocument();
  // });
});