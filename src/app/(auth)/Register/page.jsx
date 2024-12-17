"use client";
import React, { useState } from "react";
import Image from "next/image";
import RegisterUser from "../../../assets/images/RegisterUser.svg";
import AuthLinks from "@/app/_Compontents/AuthLinks/AuthLinks";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./register.css";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showrePassword, setreShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglerePasswordVisibility = () => {
    setreShowPassword(!showrePassword);
  };

  return (
    <div className="container register pt-5 pb-4">
      <div className="text-center mb-5">
        <Image
          src={RegisterUser}
          layout="responsive"
          width={260}
          height={215}
          alt="Register User"
        />
      </div>
      <div className="bg-white shadow-lg rounded-4 px-4 py-3">
        <form>
          <div className="mb-4 mt-5">
            <input
              type="text"
              value={"ll"}
              className="form-control"
              id="name"
              placeholder="الاسم"
              aria-label="Name"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="البريد الإلكتروني"
              aria-label="Email"
            />
          </div>
          <div className="mb-4" dir="ltr">
            <PhoneInput
              id="phone"
              defaultCountry="sa"
              placeholder="رقم الجوال"
              className="phone-input-field"
            />
          </div>
          <div className="mb-4 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="الرقم السرى"
              aria-label="Password"
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
          <div className="mb-4 position-relative">
            <input
              type={showrePassword ? "text" : "password"}
              className="form-control"
              id="repassword"
              placeholder="تأكيد الرقم السرى"
              aria-label="Confirm Password"
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
          <div className="d-flex justify-content-center align-items-center">
            <button type="submit" className="follow mt-3">
              متابعة
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
