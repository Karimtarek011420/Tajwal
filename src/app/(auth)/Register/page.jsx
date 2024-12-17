"use client";

// Importing Libraries and Components
import React from "react";
import Image from "next/image";
import RegisterUser from "../../../assets/images/RegisterUser.svg";
import "./register.css";
import AuthLinks from "@/app/_Compontents/AuthLinks/AuthLinks";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function RegisterPage() {
  return (
    <div className="container register w-25 pt-5 pb-4">
      <div className="text-center mb-5">
        <Image
          src={RegisterUser}
          width={260}
          height={215}
          alt="Register User"
        />
      </div>
      <div className="bg-white shadow-lg rounded-4 px-5 py-3">
        <form>
          <div className="mb-4 mt-5">
            <input
              type="text"
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
              className="phone-input-field "
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="الرقم السرى"
              aria-label="Password"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              id="repassword"
              placeholder="تأكيد الرقم السرى"
              aria-label="Confirm Password"
            />
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
