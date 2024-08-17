import { ChangeEvent } from "react";

export const validateInterestRate = (value: string) => {
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



export const validatePrice = (value: string) => {
    if (!/^[1-9][0-9]{0,11}$/.test(value.replace(/,/g, ""))) {
        setErrors((prev) => ({ ...prev, price: "Invalid price format" }));
    } else {
        setErrors((prev) => {
            const { price, ...rest } = prev;
            return rest;
        });
    }
};


export const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // setPrice(formattedValue);
    validatePrice(formattedValue);
};