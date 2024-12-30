"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import RegisterOtp from "@/assets/images/registerOtp.svg";
import "react-international-phone/style.css";
import "./forgetotp.css";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

const ForgetOtpPage = () => {
  const router = useRouter();
  const [counter, setCounter] = useState(30);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [phonenumber, setPhonenumber] = useState(null);

  // Fetch data from localStorage after component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(localStorage.getItem("emailotp"));
      setPhonenumber(localStorage.getItem("phonepass"));
    }
  }, []);

  const apiOtp = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://api.tajwal.co/api/v1/verify_otp",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (data.success === true) {
        toast.success("تم التحقق بنجاح", {
          duration: 1500,
          style: {
            backgroundColor: "#4b87a4",
            color: "white",
          },
        });
        localStorage.setItem("passOtp", values.otp);
        router.push("/ForgetPassword/ResetPass");
      }
    } catch (error) {
      setErrorMessage("رمز التحقق المدخل غير صحيح");
    }
    setLoading(false);
  };

  const handleSubmitotp = useFormik({
    initialValues: {
      otp: "",
      phone_number: phonenumber,
    },
    onSubmit: apiOtp,
    validate: (values) => {
      const errors = {};
      if (values.otp.length !== 4) {
        errors.otp = "الرجاء إدخال رمز تحقق صحيح";
      }
      if (values.otp.length === 0) {
        errors.otp = "الرجاء ملء الحقل";
      }
      return errors;
    },
  });

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => setCounter((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsDisabled(false);
    }
  }, [counter]);

  const handleResendOTP = async () => {
    try {
      setCounter(30);
      setIsDisabled(true);
      const { data } = await axios.post(
        "https://api.tajwal.co/api/v1/create_otp",
        { phone_number: phonenumber },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (data.success === true) {
        toast.success("تم إرسال رمز التحقق مرة أخرى", {
          duration: 1500,
          style: {
            backgroundColor: "#4b87a4",
            color: "white",
          },
        });
      }
    } catch (error) {
      toast.error("تعذر إرسال رمز التحقق حاول مرة أخرى", {
        duration: 1500,
        style: {
          backgroundColor: "#4b87a4",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="container forgetOtp pt-5 pb-4">
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
            لاتمام عملية استرجاع الرقم السري يرجى إدخال رمز التحقق المرسل للرقم الجوال {phonenumber}
          </p>
        </div>
        <form onSubmit={handleSubmitotp.handleSubmit}>
          <div className="mb-4">
            <input
              id="otp"
              placeholder="رمز التحقق"
              type="text"
              name="otp"
              className="form-control"
              value={handleSubmitotp.values.otp}
              onChange={handleSubmitotp.handleChange}
              onBlur={handleSubmitotp.handleBlur}
              aria-label="otp"
            />
          </div>
          {handleSubmitotp.errors.otp && handleSubmitotp.touched.otp ? (
            <div className="alert alert-danger my-4" role="alert">
              {handleSubmitotp.errors.otp}
            </div>
          ) : null}
          <div>
            <p className="px-3 text-danger text-center">{errorMessage}</p>
          </div>
          <div className="p_registerOtp pt-3 pb-3">
            <p className="text-center font-light">
              بإمكانك إعادة إرسال الرمز بعد {counter} ثانية
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="button"
                onClick={handleResendOTP}
                className="btnsendback"
                disabled={isDisabled}
              >
                إعادة إرسال الرمز
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button type="submit" className="follow mt-3">
              {loading ? (
                <TailSpin
                  visible={true}
                  height="35"
                  width="35"
                  color="#fff"
                  ariaLabel="tail-spin-loading"
                />
              ) : (
                "متابعة"
              )}
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

export default ForgetOtpPage;
