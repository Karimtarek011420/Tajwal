"use client";
import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import forgetimage from "@/assets/images/Forgotpassword.svg";
import "./forgetpass.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";
import { useFormik } from "formik";
import Image from "next/image";

const ForgetpassPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const apiForget = async (values) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const { data } = await axios.post(
        "https://api.tajwal.co/api/v1/create_otp",
        { phone_number: values.phone_number },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (data.success) {
        toast.success("تم إرسال رمز التحقق", {
          duration: 1500,
          style: {
            backgroundColor: "#4b87a4",
            color: "white",
          },
        });
        localStorage.setItem("phonepass", values.phone_number);
        router.push("/ForgetPassword/Otp");
      }
    } catch (error) {
      setErrorMessage("الرقم غير مسجل");
    } finally {
      setLoading(false);
    }
  };
  const handleForget = useFormik({
    initialValues: { phone_number: "" },
    onSubmit: apiForget,
    validate: (values) => {
      const PHONE_REGEX = /\+\d{11,15}/;
      const errors = {};
      if (!PHONE_REGEX.test(values.phone_number)) {
        errors.phone_number = "الرجاء إدخال رقم الجوال بشكل صحيح";
      }

      return errors;
    },
  });
  const handlePhoneNumberChange = (value) => {
    handleForget.setFieldValue("phone_number", value);
  };

  return (
    <div className="container forgetpass pt-5 pb-4">
      <div className="text-center mb-5">
        <Image
          src={forgetimage}
          layout="responsive"
          className="forgetpassimage"
          alt="Forget Password Illustration"
        />
      </div>
      <div className="bg-white shadow-lg rounded-4">
        <div className="pb-3 pt-4 forgetpassreset_p">
          <p className="d-flex justify-content-center align-items-center">
            إستعادة كلمة المرور
          </p>
        </div>
        <div className="py-4 px-4">
          <form onSubmit={handleForget.handleSubmit} className="mb-4" dir="ltr">
            <PhoneInput
              defaultCountry="sa"
              id="phone_number"
              name="phone_number"
              placeholder="رقم الهاتف"
              className="phone-input-field"
              aria-label="phone_number"
              value={handleForget.values.phone_number}
              onChange={handlePhoneNumberChange}
              onBlur={handleForget.handleBlur}
              required
            />
            {handleForget.errors.phone_number &&
              handleForget.touched.phone_number && (
                <p className="px-3 pt-2 text-danger text-center">
                  {handleForget.errors.phone_number}
                </p>
              )}
            {errorMessage && (
              <p className="px-3 pt-2 text-danger text-center">
                {errorMessage}
              </p>
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
                    radius="1"
                  />
                ) : (
                  "إستعادة"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetpassPage;
