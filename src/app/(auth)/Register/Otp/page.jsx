"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import RegisterOtp from "../../../../assets/images/registerOtp.svg";
import AuthLinks from "@/app/_Compontents/AuthLinks/AuthLinks";
import "react-international-phone/style.css";
import "./otpregister.css";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

export default function RegisterOtpPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [counter, setCounter] = useState(30);
  const [disabled, setDisabled] = useState(false);
  const [loading, setloading] = useState(false);
  const email = localStorage.getItem("emailotp");
  useEffect(() => {
    let timer;

    if (counter > 0) {
      timer = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    } else {
      setDisabled(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [counter]);
  const resendOTP = async () => {
    setCounter(30);
    setDisabled(true);
  };

  return (
    <div className="container registerotp pt-5 pb-4">
      <div className="text-center mb-5">
        <Image
          src={RegisterOtp}
          layout="responsive"
          className="imgcover"
          alt="RegisterOtp User"
        />
      </div>
      <div className="bg-white shadow-lg rounded-4 px-4 py-5">
        <div className=" text-center py-3 p_registerOtp">
          <p>
            لاتمام عملية التسجيل الرجاء ادخال رمز التحقق المرسل لرقم للبريد
            الالكتروني {email}
          </p>
        </div>
        <form>
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              id="otp"
              placeholder="رمز التحقق"
              aria-label="otp"
              required
            />
          </div>
          {/* <div>
            <p className=" px-3 text-danger">{errorMessage}</p>
          </div> */}
          <div className="p_registerOtp pt-3 pb-3">
            <p className="text-center   font-light">
              بامكانك اعادة ارسال الرمز بعد {counter} ثانية
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <button onClick={resendOTP} className="btnsendback" disabled={disabled}>
                اعادة ارسال الرمز
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button
              //   disabled={!handleForm.dirty || !handleForm.isValid}
              type="submit"
              className="follow mt-3"
            >
              {loading ? (
                <TailSpin
                  visible={true}
                  height="35"
                  width="35"
                  color="#fff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "متابعة"
              )}
            </button>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button type="button" className="follow back mt-3">
              العودة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
