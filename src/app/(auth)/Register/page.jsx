"use client";
import React, { useState } from "react";
import Image from "next/image";
import RegisterUser from "../../../assets/images/RegisterUser.svg";
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
      setTimeout(() => {
        router.push("/Login");
      }, 1000);
    } catch (error) {
      console.log(error);
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
    validate:(values)=>{
      let errors={};

    }
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
          width={260}
          height={215}
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
              className="form-control"
              id="first_name"
              placeholder="الاسم"
              required
              aria-label="first_name"
            />
          </div>
          <div className="mb-4">
            <input
              value={handleForm.values.email}
              onChange={handleForm.handleChange}
              type="email"
              className="form-control"
              id="email"
              placeholder="البريد الإلكتروني"
              aria-label="Email"
              required
            />
          </div>
          <div className="mb-4" dir="ltr">
            <PhoneInput
              defaultCountry="sa"
              value={handleForm.values.phone_number}
              onChange={handlePhoneNumberChange}
              placeholder="رقم الجوال"
              className="phone-input-field"
              aria-label="phone_number"
              required
            />
          </div>
          <div className="mb-4 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              value={handleForm.values.password}
              onChange={handleForm.handleChange}
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
          <div className="mb-4 position-relative">
            <input
              type={showrePassword ? "text" : "password"}
              value={handleForm.values.repassword}
              onChange={handleForm.handleChange}
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
          <div>
            <p className=" px-3 text-danger">{errorMessage}</p>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button type="submit" className="follow mt-3">
              {loading ? (
                <TailSpin
                  visible={true}
                  height="40"
                  width="40"
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
