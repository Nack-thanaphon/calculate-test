// page.test.js

// Mock functions for validation
function validateNumberInput(input) {
  if (!/^\d+$/.test(input) || /^0\d+/.test(input)) {
    throw new Error('Invalid input');
  }
  return true;
}

function validateInterestRate(input) {
  if (!/^\d+(\.\d{1,2})?$/.test(input)) {
    throw new Error('Invalid input');
  }
  return true;
}

describe('Input Validation Tests', () => {
  test('Input ราคาอสังหาฯ - Non-Numeric Input', () => {
    const input = 'abc123';
    expect(() => validateNumberInput(input)).toThrow('Invalid input');
  });

  test('Input ราคาอสังหาฯ - Decimal Input', () => {
    const input = '1000.50';
    expect(() => validateNumberInput(input)).toThrow('Invalid input');
  });

  test('Input ราคาอสังหาฯ - Leading Zero', () => {
    const input = '012345';
    expect(() => validateNumberInput(input)).toThrow('Invalid input');
  });

  test('Input อัตราดอกเบี้ย - Valid Decimal', () => {
    const input = '6.50';
    expect(validateInterestRate(input)).toBe(true);
  });

  test('Input อัตราดอกเบี้ย - Maximum Value', () => {
    const input = '99.99';
    expect(validateInterestRate(input)).toBe(true);
  });

  test('Input อัตราดอกเบี้ย - Non-Numeric Input', () => {
    const input = 'abc';
    expect(() => validateInterestRate(input)).toThrow('Invalid input');
  });

  test('Input อัตราดอกเบี้ย - More Than Two Decimal Places', () => {
    const input = '6.505';
    expect(() => validateInterestRate(input)).toThrow('Invalid input');
  });
});