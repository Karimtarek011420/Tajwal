"use client";
import React, { useState } from "react";
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
  const [loading, setloading] = useState(false);
  const email = localStorage.getItem("emailotp");
  console.log(email);

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
              type="email"
              className="form-control"
              id="email"
              placeholder="البريد الإلكتروني"
              aria-label="Email"
              required
            />
          </div>
          {/* <div>
            <p className=" px-3 text-danger">{errorMessage}</p>
          </div> */}
          <div className="p_registerOtp pt-5 pb-3">
            <p>
              بالتسجيل للحصول على حساب في “تجوال”، فأنك توافق على الشروط
              والأحكام. تعرف على المزيد حول كيفية استخدامنا وحماية بياناتك في
              سياسة الخصوصية الخاصة بنا.
            </p>
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
            <button type="button" className="follow mt-3">
              العودة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
