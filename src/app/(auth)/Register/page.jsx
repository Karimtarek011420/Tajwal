"use client";
import React, { useState } from "react";
import Image from "next/image";
import RegisterUser from "@/assets/images/RegisterUser.svg";
import AuthLinks from "@/app/_Compontents/AuthLinks/AuthLinks";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./register.css";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showrePassword, setreShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setloading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglerePasswordVisibility = () => {
    setreShowPassword(!showrePassword);
  };
  const apiRegister = async (values) => {
    setloading(true);
    try {
      const { data } = await axios.post(
        "https://api.tajwal.co/api/v1/register",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(data);
      if (data.success === true) {
        toast.success(data.message, {
          duration: 1500,
          style: {
            backgroundColor: "#4b87a4",
            color: "white",
            position: "top-right",
          },
        });
      }
      console.log(data);
      localStorage.setItem("emailotp", values.email);
      localStorage.setItem("phone_numberotp", values.phone_number);

      setTimeout(() => {
        router.push("/Register/Otp");
      }, 1000);
    } catch (error) {
      if (error.status === 422) {
        if (
          error.response.data.message ===
            "The phone number has already been taken. (and 2 more errors)" ||
          error.response.data.message ===
            "The phone number has already been taken. (and 1 more error)"
        ) {
          setErrorMessage("رقم الجوال مستخدم من قبل");
          console.log("ll");
        }
        if (
          error.response.data.message === "The email has already been taken."
        ) {
          setErrorMessage("  البريد الإلكترونى مستخدم من قبل");
        }
      }
    }
    setloading(false);
  };

  const handleForm = useFormik({
    initialValues: {
      phone_number: "",
      first_name: "",
      password: "",
      repassword: "",
      email: "",
    },
    onSubmit: apiRegister,
    validate: (values) => {
      let errors = {};
      const regexName = /^[\u0600-\u06FFa-zA-Z\s]{2,}$/;
      const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const regexPassword = /^.{8,}$/;
      const PHONE_REGEX = /\+\d{11,15}/;

      if (!regexName.test(values.first_name)) {
        errors.first_name = "الرجاء إدخال الاسم بشكل صحيح";
      }
      if (!regexEmail.test(values.email)) {
        errors.email = "الرجاء إدخال البريد الإلكتروني بشكل صحيح";
      }
      if (!PHONE_REGEX.test(values.phone_number)) {
        errors.phone_number = "الرجاء إدخال رقم الجوال بشكل صحيح";
      }
      if (!regexPassword.test(values.password)) {
        errors.password = "يجب أن يحتوي الرقم السري على 8 أحرف على الأقل.";
      }
      if (values.repassword !== values.password) {
        errors.repassword = "الرجاء تأكيد الرقم السري بشكل صحيح";
      }

      return errors;
    },
  });

  const handlePhoneNumberChange = (value) => {
    handleForm.setFieldValue("phone_number", value);
  };

  return (
    <div className="container register pt-5 pb-4">
      <div className="text-center mb-5">
        <Image
          src={RegisterUser}
          layout="responsive"
          className="imageregister"
          alt="Register User"
        />
      </div>
      <div className="bg-white shadow-lg rounded-4 px-4 py-3">
        <form onSubmit={handleForm.handleSubmit}>
          <div className="mb-4 mt-5">
            <input
              type="text"
              value={handleForm.values.first_name}
              onChange={handleForm.handleChange}
              onBlur={handleForm.handleBlur}
              className="form-control"
              id="first_name"
              placeholder="الاسم"
              aria-label="first_name"
            />
            {handleForm.errors.first_name && handleForm.touched.first_name ? (
              <div className="alert alert-danger my-2" role="alert">
                {handleForm.errors.first_name}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <input
              value={handleForm.values.email}
              onChange={handleForm.handleChange}
              onBlur={handleForm.handleBlur}
              type="email"
              className="form-control"
              id="email"
              placeholder="البريد الإلكتروني"
              aria-label="Email"
              required
            />
            {handleForm.errors.email && handleForm.touched.email ? (
              <div className="alert alert-danger my-2" role="alert">
                {handleForm.errors.email}
              </div>
            ) : null}
          </div>
          <div className="mb-4" dir="ltr">
            <PhoneInput
              defaultCountry="sa"
              value={handleForm.values.phone_number}
              onChange={handlePhoneNumberChange}
              onBlur={handleForm.handleBlur}
              placeholder="رقم الجوال"
              className="phone-input-field"
              aria-label="phone_number"
              required
            />
            {handleForm.errors.phone_number &&
            handleForm.touched.phone_number ? (
              <div className="alert alert-danger my-2" dir="rtl" role="alert">
                {handleForm.errors.phone_number}
              </div>
            ) : null}
          </div>
          <div className="mb-4 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              value={handleForm.values.password}
              onChange={handleForm.handleChange}
              onBlur={handleForm.handleBlur}
              className="form-control"
              id="password"
              placeholder="الرقم السرى"
              aria-label="Password"
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
          {handleForm.errors.password && handleForm.touched.password ? (
            <div className="alert alert-danger my-2" role="alert">
              {handleForm.errors.password}
            </div>
          ) : null}
          <div className="mb-4 position-relative">
            <input
              type={showrePassword ? "text" : "password"}
              value={handleForm.values.repassword}
              onChange={handleForm.handleChange}
              onBlur={handleForm.handleBlur}
              className="form-control"
              id="repassword"
              placeholder="تأكيد الرقم السرى"
              aria-label="Confirm Password"
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
          {handleForm.errors.repassword && handleForm.touched.repassword ? (
            <div className="alert alert-danger my-4" role="alert">
              {handleForm.errors.repassword}
            </div>
          ) : null}
          <div>
            <p className=" px-3 text-danger text-center">{errorMessage}</p>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button
              disabled={!handleForm.dirty || !handleForm.isValid}
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
          <div className="p_register pt-5 pb-3">
            <p>
              بالتسجيل للحصول على حساب في “تجوال”، فأنك توافق على الشروط
              والأحكام. تعرف على المزيد حول كيفية استخدامنا وحماية بياناتك في
              سياسة الخصوصية الخاصة بنا.
            </p>
          </div>
          <div>
            <AuthLinks />
          </div>
        </form>
      </div>
    </div>
  );
}
