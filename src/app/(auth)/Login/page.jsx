"use client";
import React, { useState } from "react";
import Image from "next/image";
import LoginUser from "../../../assets/images/login.svg";
import AuthLinks from "@/app/_Compontents/AuthLinks/AuthLinks";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./login.css";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePhoneNumberChange = (value) => {
    handleForm.setFieldValue("phone_number", value);
  };
  const handlePhoneSubmit = () => {
    if (!phoneNumber) {
      setErrorMessage("يرجى إدخال رقم الهاتف.");
      return;
    }
    if (!/\+\d{11,15}/.test(phoneNumber)) {
      setErrorMessage("يرجى إدخال رقم هاتف صالح.");
      return;
    }

    setErrorMessage(false);
    setStep(2); // الانتقال إلى الخطوة الثانية
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!password) {
      setErrorMessage("يرجى إدخال كلمة المرور.");
      return;
    }
    if (!regexPassword.test(values.password)) {
      setErrorMessage(
        "يجب أن يحتوي الرقم السري على 8 أحرف على الأقل، وحرف كبير وصغير ورقم."
      );
    }

    try {
      setErrorMessage(false);
      const { data } = await axios.post("https://api.tajwal.co/api/v1/login", {
        phone_number: phoneNumber,
        password: password,
      });

      console.log("Login successful:", response.data);
      alert("تم تسجيل الدخول بنجاح!");
    } catch (error) {
      setErrorMessage("فشل تسجيل الدخول. تأكد من البيانات وحاول مرة أخرى.");
    }
  };

  return (
    <div className="container login pt-5 pb-4">
      <div className="text-center mb-5">
        <Image
          src={LoginUser}
          layout="responsive"
          className="loginimage"
          alt="LoginUser"
        />
      </div>
      <div className="bg-white shadow-lg rounded-4 px-4 py-5">
        <div>
          <div className="mb-4" dir="ltr">
            <PhoneInput
              defaultCountry="sa"
              placeholder="رقم الجوال"
              className="phone-input-field"
              aria-label="phone_number"
              required
            />
          </div>
          <div>
            <p className=" px-3 text-danger">{errorMessage}</p>
          </div>
          <div className="d-flex justify-content-center align-items-center my-5">
            <button type="submit" className="follow mt-3">
              متابعة
            </button>
          </div>
          <div>
            <AuthLinks />
          </div>
        </div>
        <form>
          <div className="mb-4 position-relative">
            <input
              type={showPassword ? "text" : "password"}
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
          <div>
            <p className=" px-3 text-danger text-center">{errorMessage}</p>
          </div>
          <div className="d-flex justify-content-center align-items-center my-5">
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
          <div>
            <AuthLinks />
          </div>
        </form>
      </div>
    </div>
  );
}
