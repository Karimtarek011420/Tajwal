"use client";
import React from "react";
import Image from "next/image";
import RegisterUser from "../../../assets/images/RegisterUser.svg";
import "./register.css";
import AuthLinks from "@/app/_Compontents/AuthLinks/AuthLinks";

export default function RegisterPage() {
  return (
    <div className="container register w-25 pt-5 pb-4">
      {/* Image Section */}
      <div className="text-center mb-5">
        <Image
          src={RegisterUser}
          width={260}
          height={215}
          alt="Register User"
        />
      </div>

      {/* Form Section */}
      <div className="bg-white shadow-lg rounded-4 px-5 py-3">
        <form>
          {/* Name Input */}
          <div className="mb-4 mt-5">
            <input
              type="text"
              className="form-control form-control-lg"
              id="name"
              placeholder="الاسم"
              aria-label="Name"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              placeholder="البريد الإلكتروني"
              aria-label="Email"
            />
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <input
              type="tel"
              className="form-control form-control-lg"
              id="phone"
              placeholder="رقم الجوال"
              aria-label="Phone"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              placeholder="الرقم السرى"
              aria-label="Password"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <input
              type="password"
              className="form-control form-control-lg"
              id="repassword"
              placeholder="تأكيد الرقم السرى"
              aria-label="Confirm Password"
            />
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-center align-items-center">
            <button type="submit" className=" mt-3">
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
