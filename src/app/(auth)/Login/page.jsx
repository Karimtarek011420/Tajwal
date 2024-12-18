"use client";
import React, { useState } from "react";
import Image from "next/image";
import LoginUser from "../../../assets/images/login.svg";
import AuthLinks from "@/app/_Compontents/AuthLinks/AuthLinks";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./login.css";
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
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePhoneSubmit = () => {
    setLoading(true);
    if (phoneNumber.length === 0) {
      setErrorMessage("يرجى إدخال رقم الهاتف.");
      return;
    }
    if (!/\+\d{11,15}/.test(phoneNumber)) {
      setErrorMessage("يرجى إدخال رقم هاتف صالح.");
      return;
    }

    setErrorMessage("");
    setStep(2);
    setLoading(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!password) {
      setErrorMessage("يرجى إدخال كلمة المرور.");
      return;
    }
    if (!regexPassword.test(password)) {
      setErrorMessage(
        "يجب أن يحتوي الرقم السري على 8 أحرف على الأقل، وحرف كبير وصغير ورقم."
      );
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      const { data } = await axios.post("https://api.tajwal.co/api/v1/login", {
        phone_number: phoneNumber,
        password,
      });
      console.log(data);
      if (data.success) {
        toast.success("تم تسجيل الدخول بنجاح!", {
          duration: 1500,
          style: { backgroundColor: "#4b87a4", color: "white" },
        });
        localStorage.setItem("token", data.token); // Store the token properly
        setTimeout(() => router.push("/"), 1000);
      } else {
        setErrorMessage(data.message || "فشل تسجيل الدخول. حاول مرة أخرى.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("فشل تسجيل الدخول. تأكد من البيانات وحاول مرة أخرى.");
    } finally {
      setLoading(false);
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
        {step === 1 && (
          <div>
            <div className="mb-4" dir="ltr">
              <PhoneInput
                defaultCountry="sa"
                value={phoneNumber}
                onChange={setPhoneNumber}
                placeholder="رقم الجوال"
                className="phone-input-field"
                aria-label="phone_number"
                required
              />
            </div>
            {errorMessage && <p className="px-3 text-danger">{errorMessage}</p>}
            <div className="d-flex justify-content-center align-items-center my-5">
              <button onClick={handlePhoneSubmit} className="follow mt-3">
                متابعة
              </button>
            </div>
            <AuthLinks />
          </div>
        )}
        {step === 2 && (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="password"
                placeholder="الرقم السرى"
                aria-label="Password"
                required
              />
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
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
            {errorMessage && (
              <p className="px-3 text-danger text-center">{errorMessage}</p>
            )}
            <div className="d-flex justify-content-center align-items-center my-5">
              <button type="submit" className="follow mt-3" disabled={loading}>
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
            <AuthLinks />
          </form>
        )}
      </div>
    </div>
  );
}
