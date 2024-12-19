"use client";
import React, { useState } from "react";
import Image from "next/image";
import imageResetpassword from "@/assets/images/ChangePassword.svg";
import "./resetpass.css";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

const resetPasswordPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showrePassword, setreShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const phonenumber =
    typeof window !== "undefined" ? localStorage.getItem("phonepass") : null;
  const otp =
    typeof window !== "undefined" ? localStorage.getItem("passOtp") : null;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglerePasswordVisibility = () => {
    setreShowPassword(!showrePassword);
  };

  const apiresetPass = async (values) => {
    setloading(true);
    try {
      const { data } = await axios.post(
        "https://api.tajwal.co/api/v1/reset_password",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (data.success) {
        toast.success("تم تغيير كلمة السر بنجاح", {
          duration: 1500,
          style: {
            backgroundColor: "#4b87a4",
            color: "white",
            position: "top-right",
          },
        });
        localStorage.clear();
        router.push("/Login");
      }
    } catch (error) {
      setErrorMessage("فشل تغير كلمة السر حاول مرة اخرى");
    } finally {
      setloading(false);
    }
  };

  const handleSubmitpass = useFormik({
    initialValues: {
      otp: otp,
      phone_number: phonenumber,
      password: "",
      confirm_password: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.password.length < 8) {
        errors.password = "يجب أن تحتوي كلمة السر على 8 أحرف على الأقل.";
      }
      if (values.password !== values.confirm_password) {
        errors.confirm_password = "كلمة السر وتأكيدها غير متطابقين.";
      }
      return errors;
    },
    onSubmit: apiresetPass,
  });

  return (
    <div className="container resetPassword pt-5 pb-4">
      <div className="text-center mb-5">
        <Image
          src={imageResetpassword}
          layout="responsive"
          className="imageResetpassword"
          alt="Reset Password"
        />
      </div>
      <div className="bg-white shadow-lg rounded-4 px-4 py-5">
        <form onSubmit={handleSubmitpass.handleSubmit}>
          <div className="mb-4 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={handleSubmitpass.values.password}
              onChange={handleSubmitpass.handleChange}
              onBlur={handleSubmitpass.handleBlur}
              className="form-control"
              id="password"
              placeholder="الرقم السري"
              aria-label="password"
              required
            />
            <i
              className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#aaa",
              }}
            ></i>
          </div>
          {handleSubmitpass.errors.password &&
          handleSubmitpass.touched.password ? (
            <div className="alert alert-danger my-2">
              {handleSubmitpass.errors.password}
            </div>
          ) : null}

          <div className="mb-4 position-relative">
            <input
              type={showrePassword ? "text" : "password"}
              name="confirm_password"
              value={handleSubmitpass.values.confirm_password}
              onChange={handleSubmitpass.handleChange}
              onBlur={handleSubmitpass.handleBlur}
              className="form-control"
              id="confirm_password"
              placeholder="تأكيد الرقم السري"
              aria-label="confirm_password"
              required
            />
            <i
              className={`fa-solid ${
                showrePassword ? "fa-eye-slash" : "fa-eye"
              }`}
              onClick={togglerePasswordVisibility}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#aaa",
              }}
            ></i>
          </div>
          {handleSubmitpass.errors.confirm_password &&
          handleSubmitpass.touched.confirm_password ? (
            <div className="alert alert-danger my-2">
              {handleSubmitpass.errors.confirm_password}
            </div>
          ) : null}

          {errorMessage && (
            <p className="px-3 text-danger text-center">{errorMessage}</p>
          )}

          <div className="d-flex justify-content-center align-items-center">
            <button type="submit" className="follow mt-3">
              {loading ? (
                <TailSpin height="35" width="35" color="#fff" />
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
