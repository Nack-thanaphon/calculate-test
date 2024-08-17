"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";

import { useState, ChangeEvent, FormEvent } from "react";

export default function Calculator() {
  const [price, setPrice] = useState<string>("15,000,000");
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [years, setYears] = useState<string>("30");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [monthlyPayment, setMonthlyPayment] = useState<string>("");

  const validatePrice = (value: string) => {
    if (!/^[1-9][0-9]{0,11}$/.test(value.replace(/,/g, ""))) {
      setErrors((prev) => ({ ...prev, price: "Invalid price format" }));
    } else {
      setErrors((prev) => {
        const { price, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateInterestRate = (value: string) => {
    if (!/^[1-9]\d?(\.\d{1,2})?$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        interestRate: "Invalid interest rate format",
      }));
    } else {
      setErrors((prev) => {
        const { interestRate, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateYears = (value: string) => {
    if (!/^[3-9]$|^[1-9]\d$/.test(value)) {
      setErrors((prev) => ({ ...prev, years: "Invalid years format" }));
    } else {
      setErrors((prev) => {
        const { years, ...rest } = prev;
        return rest;
      });
    }
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setPrice(formattedValue);
    validatePrice(formattedValue);
  };

  const handleInterestRateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInterestRate(e.target.value);
    validateInterestRate(e.target.value);
  };

  const handleYearsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setYears(e.target.value);
    validateYears(e.target.value);
  };

  const handleReset = () => {
    setPrice("15,000,000");
    setInterestRate("6.5");
    setYears("30");
    setErrors({});
    setMonthlyPayment("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      const principal = parseFloat(price.replace(/,/g, ""));
      const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
      const numberOfPayments = parseInt(years) * 12;

      const monthlyPayment = (
        (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))
      ).toFixed(2);

      setMonthlyPayment(monthlyPayment);
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 && price && interestRate && years;

  return (
    <div className="bg-[#FBE2EF] max-w-3xl mx-auto mt-10 p-8 shadow-lg rounded-lg">
      <h2 className="sm:text-3xl font-bold mb-8 text-[#000000] text-center">
        คำนวณสินเชื่ออสังหา เบื้องต้น
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-6">
            <label className="block text-[#E82583] text-xl mb-2">
              ราคาอสังหา
            </label>
            <input
              type="text"
              value={price}
              onChange={handlePriceChange}
              className={`w-full px-4 py-3 border ${
                errors.price ? "border-red-500" : "border-gray-300"
              } rounded-md text-2xl`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-[#E82583] text-xl mb-2">
                อัตราดอกเบี้ย
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  className={`w-full px-4 py-3 border ${
                    errors.interestRate ? "border-red-500" : "border-gray-300"
                  } rounded-md text-2xl`}
                />
                <span className="ml-2 text-xl">%</span>
              </div>
              {errors.interestRate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.interestRate}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-[#E82583] text-xl mb-2">
                ระยะเวลากู้
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={years}
                  onChange={handleYearsChange}
                  className={`w-full px-4 py-3 border ${
                    errors.years ? "border-red-500" : "border-gray-300"
                  } rounded-md text-2xl`}
                />
                <span className="ml-2 text-xl">ปี</span>
              </div>
              {errors.years && (
                <p className="text-red-500 text-sm mt-1">{errors.years}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center text-[#E82583] bg-transparent px-6 py-3 rounded-md border-2 border-[#E82583] text-xl font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            ล้างข้อมูล
          </button>
          <button
            type="submit"
            className={`flex items-center justify-center bg-[#E82583] text-white px-6 py-3 rounded-md text-xl font-bold ${
              isFormValid ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            คำนวณสินเชื่อ
          </button>
        </div>
      </form>

      {monthlyPayment && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-10">
          <h3 className="sm:text-2xl font-bold text-[#000000] mb-4">
            ผลคำนวณสินเชื่อ (กรณีกู้ได้ 100%)
            <span className="tooltip tooltip-bottom ml-2" data-tip="ตัวเลขที่แสดงจะเป็นตัวเลขเฉพาะการกู้ โดยวิธีคำนวณง่ายๆ เงินเดือน 10,000 บาท จะกู้ได้ประมาณ 650,000 บาท">
              <FontAwesomeIcon icon={faCircleInfo} />
            </span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="sm:text-xl text-[#E82583]">วงเงินกู้</p>
              <p className="sm:text-3xl font-bold">{price} บาท</p>
            </div>
            <div>
              <p className="sm:text-xl text-[#E82583]">รายได้ขั้นต่ำต่อเดือน</p>
              <p className="sm:text-3xl font-bold">
                {(
                  (parseFloat(price.replace(/,/g, "")) / 650000) *
                  10000
                ).toLocaleString()}{" "}
                บาท
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xl text-[#E82583]">ยอดผ่อนต่อเดือน</p>
            <p className="text-4xl font-bold text-[#1BBD7E]">
              {parseFloat(monthlyPayment).toLocaleString()} บาท
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
