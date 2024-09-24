"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, ChangeEvent, FormEvent } from "react";
import CustomTooltip from "../components/CustomTooltip";
import { faChevronRight, faRedo } from "@fortawesome/free-solid-svg-icons";

export default function Calculator() {
  const [price, setPrice] = useState<string>("18,000,000");
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [years, setYears] = useState<string>("30");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [monthlyPayment, setMonthlyPayment] = useState<string>("");

  const validatePrice = (value: string) => {
    if (!/^[1-9][0-9]{0,11}$/.test(value.replace(/,/g, ""))) {
      setErrors((prev) => ({ ...prev, price: "กรุณากรอกราคาอสังหาฯ" }));
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
        interestRate: "อัตราดอกเบี้ยต้องอย่างน้อย 2%",
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
      setErrors((prev) => ({ ...prev, years: "ระยะเวลากู้ไม่น้อยกว่า 3 ปี" }));
    } else {
      setErrors((prev) => {
        const { years, ...rest } = prev;
        return rest;
      });
    }
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    let formatNumber = Number(rawValue);

    if (formatNumber > 99999999999) {
      formatNumber = 99999999999;
    }

    const formattedValue = new Intl.NumberFormat().format(formatNumber);
    setPrice(formattedValue);
    validatePrice(formattedValue);
  };

  const handleInterestRateChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Ensure the value is not empty and is a valid number
    if (value === "" || isNaN(Number(value))) {
      setInterestRate("0");
      validateInterestRate("0");
      return;
    }
    let formatNumber = parseFloat(value);
    if (formatNumber < 0 || formatNumber > 99.99) {
      setInterestRate("0");
      validateInterestRate("0");
      return;
    }

    if (value.length > 1 && value.startsWith("0")) {
      value = value.substring(1);
    }

    setInterestRate(value);
    validateInterestRate(value);
  };

  const handleYearsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    let formatNumber = Number(rawValue);

    if (formatNumber > 99) {
      formatNumber = 99;
    }

    const formattedValue = new Intl.NumberFormat().format(formatNumber);
    setYears(formattedValue);
    validateYears(e.target.value);
  };

  const handleReset = () => {
    setPrice("18,000,000");
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
    <div className="relative overflow-hidden sm:w-[850px] bg-[#FBE2EF] border-2 border-[#E8248D] mx-auto mt-10 p-5 shadow-lg rounded-[13px]">
      <div className="absolute right-6 top-0 bg-[#E8248D] w-[96px] h-[96px] sm:block hidden"></div>
      <div className="mb-8">
        <h2 className="sm:text-[20px] font-bold  text-[#000000]  text-start">
          คำนวณสินเชื่ออสังหา เบื้องต้น
        </h2>
        <p className="underline text-[#E8248D] mt-3">
          ข้อเสนอสุดพิเศษสำหรับคุณ &gt;
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="sm:flex justify-between  gap-4">
          <div className="sm:w-[280px] mb-6">
            <div className="mb-2">
              <label className="block text-black text-[14px] mb-2">
                ราคาอสังหาฯ
              </label>
              <div className="relative flex items-center ">
                <input
                  type="text"
                  value={price}
                  aria-label="ราคาอสังหาฯ"
                  onChange={handlePriceChange}
                  className={`w-full px-4 py-3 border bg-white ${
                    errors.interestRate ? "border-red-500" : "border-gray-300"
                  } rounded-[12px] text-xl`}
                />
                <span className="absolute right-4 my-auto text-xl">บาท</span>
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm my-2">{errors.price}</p>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-2 mt-3">
              <div className="flex-1">
                <label className="block text-black text-[14px] mb-2">
                  อัตราดอกเบี้ย
                </label>
                <div className="flex items-center relative">
                  <input
                    type="text"
                    value={interestRate}
                    aria-label="อัตราดอกเบี้ย"
                    onChange={handleInterestRateChange}
                    className={`w-full px-4 py-3 border bg-white ${
                      errors.interestRate ? "border-red-500" : "border-gray-300"
                    } rounded-[12px] text-xl`}
                  />
                  <span className="absolute right-4 ml-2 text-xl">%</span>
                </div>
                {errors.interestRate && (
                  <p className="text-red-500 text-sm mt-1 text-wrap">
                    {errors.interestRate}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label className="block text-black text-[14px] mb-2">
                  ระยะเวลากู้
                </label>
                <div className="flex items-center relative">
                  <input
                    type="text"
                    value={years}
                    aria-label="ระยะเวลากู้"
                    onChange={handleYearsChange}
                    className={` w-full px-4 py-3 border bg-white ${
                      errors.years ? "border-red-500" : "border-gray-300"
                    } rounded-[12px] text-xl`}
                  />
                  <span className="absolute right-4 ml-2 text-xl">ปี</span>
                </div>
                {errors.years && (
                  <p className="text-red-500 text-sm mt-1 text-wrap">
                    {errors.years}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center text-[#E82583]  text-nowrap bg-transparent text-[16px] px-4 py-3 rounded-[12px] mr-1 font-bold"
              >
                <FontAwesomeIcon className="mr-2" icon={faRedo} />
                ล้างข้อมูล
              </button>
              <button
                aria-label="คำนวณสินเชื่อ"
                type="submit"
                className={`flex items-center justify-center text-nowrap  bg-[#E82583] text-white px-4 py-3 rounded-[12px] text-[16px] font-bold ${
                  isFormValid ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isFormValid}
              >
                คำนวณสินเชื่อ
              </button>
            </div>
          </div>

          <div className="mb-6 sm:w-[804px] ">
            <label className="flex text-black text-[14px] mb-1">
              ผลคำนวณสินเชื่อ{" "}
              <span className="sm:inline-block hidden">(กรณีกู้ได้ 100%)</span>
              <span className="my-auto ">
                <CustomTooltip message="ตัวเลขที่แสดงจะเป็นตัวเลขเฉพาะการกู้ โดยวิธีคำนวณง่ายๆ เงินเดือน 10,000 บาท จะกู้ได้ประมาณ 650,000 บาท" />
              </span>
            </label>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300">
              <div className="">
                <div className="sm:flex justify-between  items-baseline mb-3">
                  <p className="sm:text-[16px] text-black text-nowrap">
                    วงเงินกู้
                  </p>
                  <div className="flex  items-baseline ">
                    <p className="sm:text-[32px] text-[28px] text-black font-bold mr-3">
                      {price || "0"}
                    </p>
                    <p>บาท</p>
                  </div>
                </div>
                <div className="sm:flex justify-between  items-baseline mb-3">
                  <p className="sm:text-[16px] text-black text-nowrap ">
                    รายได้ขั้นต่ำต่อเดือน
                  </p>
                  <div className="flex  items-baseline ">
                    <p className="sm:text-[32px] text-[28px] text-black font-bold mr-3">
                      {Math.round(
                        (parseFloat(price.replace(/,/g, "") || "0") / 650000) *
                          10000
                      ).toLocaleString()}
                    </p>
                    <p>บาท</p>
                  </div>
                </div>
              </div>
              <hr className="my-5" />
              <div className="mt-5 sm:flex justify-between items-baseline">
                <p className="sm:text-[16px] text-black text-nowrap">
                  ยอดผ่อนต่อเดือน
                </p>
                <div className="flex items-baseline">
                  <p className="sm:text-[32px] text-[28px] text-black font-bold mr-3 align-baseline bg-gradient-to-r from-green-500  to-indigo-400 inline-block text-transparent bg-clip-text">
                    {Number.isNaN(parseFloat(monthlyPayment))
                      ? 0
                      : Math.round(parseFloat(monthlyPayment)).toLocaleString()}
                  </p>
                  <p className="align-baseline">บาท</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
