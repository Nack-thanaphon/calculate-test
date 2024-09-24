// page.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Calculator from './page';

describe('คอมโพเนนต์ Calculator', () => {
  test('แสดงคอมโพเนนต์ Calculator', () => {
    render(<Calculator />);
    expect(screen.getByText('คำนวณสินเชื่ออสังหา เบื้องต้น')).toBeInTheDocument();
  });

  test('ตรวจสอบการป้อนราคาสินเชื่อ', () => {
    render(<Calculator />);
    const priceInput = screen.getByLabelText('ราคาอสังหาฯ');
    fireEvent.change(priceInput, { target: { value: 'abc' } });
    expect(screen.getByText('กรุณากรอกราคาอสังหาฯ')).toBeInTheDocument();
  });

  test('ตรวจสอบการป้อนอัตราดอกเบี้ย', () => {
    render(<Calculator />);
    const interestRateInput = screen.getByLabelText('อัตราดอกเบี้ย');
    fireEvent.change(interestRateInput, { target: { value: 'abc' } });
    expect(screen.getByText('อัตราดอกเบี้ยต้องอย่างน้อย 2%')).toBeInTheDocument();
  });

  test('ตรวจสอบการป้อนระยะเวลากู้', () => {
    render(<Calculator />);
    const yearsInput = screen.getByLabelText('ระยะเวลากู้');
    fireEvent.change(yearsInput, { target: { value: '2' } });
    expect(screen.getByText('ระยะเวลากู้ไม่น้อยกว่า 3 ปี')).toBeInTheDocument();
  });

  test('รีเซ็ตฟอร์มเมื่อคลิกปุ่มล้างข้อมูล', () => {
    render(<Calculator />);
    const resetButton = screen.getByText('ล้างข้อมูล');
    fireEvent.click(resetButton);
    // expect(screen.getByLabelText('ราคาอสังหาฯ')).toHaveValue('1,800,000');
    expect(screen.getByLabelText('อัตราดอกเบี้ย')).toHaveValue('6.5');
    expect(screen.getByLabelText('ระยะเวลากู้')).toHaveValue('30');
  });

  test('คำนวณยอดผ่อนต่อเดือนเมื่อส่งฟอร์ม', () => {
    render(<Calculator />);
    const priceInput = screen.getByLabelText('ราคาอสังหาฯ');
    const interestRateInput = screen.getByLabelText('อัตราดอกเบี้ย');
    const yearsInput = screen.getByLabelText('ระยะเวลากู้');
    const submitButton = screen.getByText('คำนวณสินเชื่อ');

    fireEvent.change(priceInput, { target: { value: '1,800,000' } });
    fireEvent.change(interestRateInput, { target: { value: '6.5' } });
    fireEvent.change(yearsInput, { target: { value: '30' } });

    fireEvent.click(submitButton);

    expect(screen.getByText('ยอดผ่อนต่อเดือน')).toBeInTheDocument();
  });

  // // กรณีทดสอบเพิ่มเติมตามข้อกำหนด

  // // ทดสอบการป้อนข้อมูลราคาอสังหาฯ ที่ไม่ถูกต้อง
  // test('ไม่สามารถป้อนตัวอักษรในฟิลด์ราคาอสังหาฯ', () => {
  //   render(<Calculator />);
  //   const priceInput = screen.getByLabelText('ราคาอสังหาฯ');
  //   fireEvent.change(priceInput, { target: { value: '1a,000,000' } });
  //   expect(screen.getByText('กรุณากรอกราคาอสังหาฯ')).toBeInTheDocument();
  // });

  // test('ไม่สามารถป้อนทศนิยมในฟิลด์ราคาอสังหาฯ', () => {
  //   render(<Calculator />);
  //   const priceInput = screen.getByLabelText('ราคาอสังหาฯ');
  //   fireEvent.change(priceInput, { target: { value: '1,800,000.50' } });
  //   expect(screen.getByText('กรุณากรอกราคาอสังหาฯ')).toBeInTheDocument();
  // });

  // test('ไม่สามารถป้อนจำนวนเกิน 99,999,999,999 ในฟิลด์ราคาอสังหาฯ', () => {
  //   render(<Calculator />);
  //   const priceInput = screen.getByLabelText('ราคาอสังหาฯ');
  //   fireEvent.change(priceInput, { target: { value: '100,000,000,000' } });
  //   expect(screen.getByText('ราคาสูงสุดที่ยอมรับคือ 99,999,999,999')).toBeInTheDocument();
  // });

  // test('ไม่สามารถเริ่มต้นด้วยเลข 0 ในฟิลด์ราคาอสังหาฯ', () => {
  //   render(<Calculator />);
  //   const priceInput = screen.getByLabelText('ราคาอสังหาฯ');
  //   fireEvent.change(priceInput, { target: { value: '0,500,000' } });
  //   expect(screen.getByText('ราคาสินเชื่อไม่สามารถเริ่มต้นด้วยเลข 0')).toBeInTheDocument();
  // });

  // // ทดสอบการป้อนข้อมูลอัตราดอกเบี้ยที่ไม่ถูกต้อง
  // test('ไม่สามารถป้อนตัวอักษรในฟิลด์อัตราดอกเบี้ย', () => {
  //   render(<Calculator />);
  //   const interestRateInput = screen.getByLabelText('อัตราดอกเบี้ย');
  //   fireEvent.change(interestRateInput, { target: { value: '5.a' } });
  //   expect(screen.getByText('อัตราดอกเบี้ยต้องเป็นตัวเลขที่ถูกต้อง')).toBeInTheDocument();
  // });

  // test('ไม่สามารถป้อนจำนวนเกิน 99.99 ในฟิลด์อัตราดอกเบี้ย', () => {
  //   render(<Calculator />);
  //   const interestRateInput = screen.getByLabelText('อัตราดอกเบี้ย');
  //   fireEvent.change(interestRateInput, { target: { value: '100' } });
  //   expect(screen.getByText('อัตราดอกเบี้ยสูงสุดที่ยอมรับคือ 99.99%')).toBeInTheDocument();
  // });

  // test('ไม่สามารถเริ่มต้นด้วยเลข 0 ในฟิลด์อัตราดอกเบี้ย', () => {
  //   render(<Calculator />);
  //   const interestRateInput = screen.getByLabelText('อัตราดอกเบี้ย');
  //   fireEvent.change(interestRateInput, { target: { value: '0.5' } });
  //   expect(screen.getByText('อัตราดอกเบี้ยไม่สามารถเริ่มต้นด้วยเลข 0')).toBeInTheDocument();
  // });

  // // ทดสอบการป้อนข้อมูลจำนวนปีที่ไม่ถูกต้อง
  // test('ไม่สามารถป้อนตัวอักษรในฟิลด์จำนวนปี', () => {
  //   render(<Calculator />);
  //   const yearsInput = screen.getByLabelText('ระยะเวลากู้');
  //   fireEvent.change(yearsInput, { target: { value: 'thirty' } });
  //   expect(screen.getByText('ระยะเวลากู้ต้องเป็นตัวเลขที่ถูกต้อง')).toBeInTheDocument();
  // });

  // test('ไม่สามารถป้อนจำนวนเกิน 99 ปีในฟิลด์จำนวนปี', () => {
  //   render(<Calculator />);
  //   const yearsInput = screen.getByLabelText('ระยะเวลากู้');
  //   fireEvent.change(yearsInput, { target: { value: '100' } });
  //   expect(screen.getByText('ระยะเวลากู้สูงสุดที่ยอมรับคือ 99 ปี')).toBeInTheDocument();
  // });

  // test('ไม่สามารถป้อนจำนวนต่ำกว่า 3 ปีในฟิลด์จำนวนปี', () => {
  //   render(<Calculator />);
  //   const yearsInput = screen.getByLabelText('ระยะเวลากู้');
  //   fireEvent.change(yearsInput, { target: { value: '2' } });
  //   expect(screen.getByText('ระยะเวลากู้ไม่น้อยกว่า 3 ปี')).toBeInTheDocument();
  // });

  // test('ไม่สามารถเริ่มต้นด้วยเลข 0 ในฟิลด์จำนวนปี', () => {
  //   render(<Calculator />);
  //   const yearsInput = screen.getByLabelText('ระยะเวลากู้');
  //   fireEvent.change(yearsInput, { target: { value: '05' } });
  //   expect(screen.getByText('ระยะเวลากู้ไม่สามารถเริ่มต้นด้วยเลข 0')).toBeInTheDocument();
  // });

  // ทดสอบการวางข้อความที่ไม่ถูกต้องในฟิลด์ราคาอสังหาฯ
  // test('ไม่สามารถวางข้อความที่ไม่ถูกต้องในฟิลด์ราคาอสังหาฯ', () => {
  //   render(<Calculator />);
  //   const priceInput = screen.getByLabelText('ราคาอสังหาฯ');
  //   fireEvent.paste(priceInput, { clipboardData: { getData: () => '1a,000,000' } });
  //   expect(screen.getByText('กรุณากรอกราคาอสังหาฯ')).toBeInTheDocument();
  // });

  // ทดสอบการล้างข้อมูลและการแสดงข้อความผิดพลาด
  // test('แสดงข้อความผิดพลาดและเปลี่ยนสีขอบเมื่อลบข้อมูลในฟิลด์ราคาอสังหาฯ', () => {
  //   render(<Calculator />);
  //   const priceInput = screen.getByLabelText('ราคาอสังหาฯ');
  //   fireEvent.change(priceInput, { target: { value: '' } });
  //   expect(screen.getByText('กรุณากรอกราคาอสังหาฯ')).toBeInTheDocument();
  //   expect(priceInput).toHaveClass('input-error'); // สมมติว่าใช้คลาสนี้สำหรับขอบสีแดง
  // });

  // ทดสอบปุ่มคำนวณสินเชื่อเมื่อมีข้อมูลผิดพลาดหรือไม่มีข้อมูล
  // test('ปุ่มคำนวณสินเชื่อต้องถูก disabled เมื่อมีข้อมูลผิดพลาด', () => {
  //   render(<Calculator />);
  //   const submitButton = screen.getByText('คำนวณสินเชื่อ');
  //   expect(submitButton).toBeDisabled();

  //   const priceInput = screen.getByLabelText('ราคาอสังหาฯ');
  //   const interestRateInput = screen.getByLabelText('อัตราดอกเบี้ย');
  //   const yearsInput = screen.getByLabelText('ระยะเวลากู้');

  //   fireEvent.change(priceInput, { target: { value: '1,800,000' } });
  //   fireEvent.change(interestRateInput, { target: { value: '6.5' } });
  //   fireEvent.change(yearsInput, { target: { value: '2' } }); // จำนวนปีน้อยกว่า 3

  //   expect(submitButton).toBeDisabled();
  // });

  // test('ปุ่มคำนวณสินเชื่อต้องถูก disabled เมื่อไม่มีข้อมูลใดๆ', () => {
  //   render(<Calculator />);
  //   const submitButton = screen.getByText('คำนวณสินเชื่อ');
  //   expect(submitButton).toBeDisabled();
  // });

  // test('ปุ่มคำนวณสินเชื่อต้องไม่ถูก disabled เมื่อข้อมูลถูกต้อง', () => {
  //   render(<Calculator />);
  //   const submitButton = screen.getByText('คำนวณสินเชื่อ');
  //   const priceInput = screen.getByLabelText('ราคาอสังหาฯ');
  //   const interestRateInput = screen.getByLabelText('อัตราดอกเบี้ย');
  //   const yearsInput = screen.getByLabelText('ระยะเวลากู้');

  //   fireEvent.change(priceInput, { target: { value: '1,800,000' } });
  //   fireEvent.change(interestRateInput, { target: { value: '6.5' } });
  //   fireEvent.change(yearsInput, { target: { value: '30' } });

  //   expect(submitButton).not.toBeDisabled();
  // });



});
