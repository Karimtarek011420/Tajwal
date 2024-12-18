"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import RegisterOtp from "../../../../assets/images/registerOtp.svg"; // تأكد من صحة المسار
import "react-international-phone/style.css";
import "./otp.css";
import { useRouter } from "next/navigation";

const RegisterOtpPage = () => {
  const router = useRouter();
  const [counter, setCounter] = useState(30);
  const [isDisabled, setIsDisabled] = useState(false);
  const email =
    typeof window !== "undefined" ? localStorage.getItem("emailotp") : null;

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsDisabled(false);
    }
  }, [counter]);

  const handleResendOTP = async () => {
    try {
      setCounter(30);
      setIsDisabled(true);
      // Logic for resending OTP
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here
  };

  return (
    <div className="container registerotp pt-5 pb-4">
      <div className="text-center mb-5">
        <Image
          src={RegisterOtp}
          layout="responsive"
          className="imgcover"
          alt="Register OTP User"
        />
      </div>
      <div className="bg-white shadow-lg rounded-4 px-4 py-5">
        <div className="text-center py-3 p_registerOtp">
          <p>
            لاتمام عملية التسجيل الرجاء ادخال رمز التحقق المرسل للبريد
            الالكتروني {email}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              id="otp"
              placeholder="رمز التحقق"
              aria-label="OTP"
              required
            />
          </div>
          <div className="p_registerOtp pt-3 pb-3">
            <p className="text-center font-light">
              بامكانك اعادة ارسال الرمز بعد {counter} ثانية
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="button"
                onClick={handleResendOTP}
                className="btnsendback"
                disabled={isDisabled}
              >
                اعادة ارسال الرمز
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button type="submit" className="follow mt-3">
              متابعة
            </button>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="follow back mt-3"
              onClick={() => router.back()}
            >
              العودة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterOtpPage;
