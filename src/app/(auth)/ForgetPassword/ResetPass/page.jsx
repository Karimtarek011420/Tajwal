"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import RegisterOtp from "../../../../assets/images/registerOtp.svg";
import "react-international-phone/style.css";
import "./resetpass.css";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

const resetPasswordPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setloading] = useState(false);
  const phonenumber =
    typeof window !== "undefined" ? localStorage.getItem("phonepass") : null;
  const otp =
    typeof window !== "undefined" ? localStorage.getItem("passOtp") : null;

  const apiOtp = async (values) => {
    setloading(true);
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
            position: "top-right",
          },
        });
        localStorage.setItem("passOtp", values.otp);
        router.push("/ForgetPassword/ResetPass");
      }

      console.log(data);
    } catch (error) {
      setErrorMessage(" رمز التحقق المدخل غير صحيح");
    }
    setloading(false);
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
        errors.otp = "الرجاء  ملئ الحقل";
      }
      return errors;
    },
  });

  return (
    <div className="container resetPassword pt-5 pb-4">
      <div className="text-center mb-5">
        <Image
          src={RegisterOtp}
          layout="responsive"
          className="imgcover"
          alt="Register OTP User"
        />
      </div>
      <div className="bg-white shadow-lg rounded-4 px-4 py-5">
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
            <p className=" px-3 text-danger text-center">{errorMessage}</p>
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

export default resetPasswordPage;
