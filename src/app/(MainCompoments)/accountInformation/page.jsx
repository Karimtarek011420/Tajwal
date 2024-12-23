"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import "./accountinform.css";
import { usePathname, useRouter } from "next/navigation";
import { authtoken } from "@/app/_Compontents/Authtoken/Authtoken";
import { logoutApi } from "@/app/Hookshelp/logout";
import axios from "axios";
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function AccountInformation() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  });
  const [modalData, setModalData] = useState({ field: "", value: "", otp: "" });
  const [loading, setLoading] = useState(false);
  const handlePhoneChange = (value, country) => {
    setModalData({ ...modalData, value }); // تحديث رقم الهاتف في state
  };

  const { token, settoken } = useContext(authtoken);
  const router = useRouter();
  const pathName = usePathname();

  const handleLogout = () => {
    if (token) {
      logoutApi(token, settoken);
      setTimeout(() => {
        router.push("/");
      });
    }
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phonePattern = /\+\d{11,15}/; // Adjust the pattern to fit the phone number format you expect
    return phonePattern.test(phoneNumber);
  };

  const createPhoneOtp = async (phoneNumber) => {
    setLoading(true);
    if (!isValidPhoneNumber(phoneNumber)) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "صيغة رقم الهاتف غير صحيحة.",
        confirmButtonText: "حسنًا",
      });
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "https://api.tajwal.co/api/v1/create_phone_change_otp",
        { phone_number: phoneNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating OTP:", error);
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "فشل في إرسال OTP. يرجى المحاولة مرة أخرى.",
        confirmButtonText: "حسنًا",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updatePhoneNumber = async (otp, phoneNumber) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.tajwal.co/api/v1/update_phone",
        { otp, phone_number: phoneNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating phone number:", error);
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "فشل في تحديث رقم الهاتف. يرجى المحاولة مرة أخرى.",
        confirmButtonText: "حسنًا",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const response = await axios.patch(
        "https://api.tajwal.co/api/v1/profile",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "فشل في تحديث الملف الشخصي. يرجى المحاولة مرة أخرى.",
        confirmButtonText: "حسنًا",
      });
    }
  };

  const handleUpdate = async () => {
    setLoading(true);

    const showError = (message) => {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: message,
        confirmButtonText: "حسنًا",
      });
    };

    try {
      if (modalData.field === "phone_number") {
        if (!modalData.otp) {
          await createPhoneOtp(modalData.value);
          Swal.fire({
            position: "top",
            icon: "success",
            title: "تم إرسال رمز OTP بنجاح",
            showConfirmButton: false,
            timer: 2000,
            toast: true,
          });
          setLoading(false);
          return;
        } else {
          await updatePhoneNumber(modalData.otp, modalData.value);
        }
      }

      if (modalData.field === "email") {
        if (
          !modalData.value ||
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
            modalData.value
          )
        ) {
          showError("يرجى إدخال بريد إلكتروني صحيح.");
          setLoading(false);
          return;
        }
      }

      if (modalData.field === "password") {
        if (!modalData.value || modalData.value.length < 8) {
          showError("كلمة المرور يجب أن تكون 8 حروف على الأقل.");
          setLoading(false);
          return;
        }
      }

      await updateProfile({ [modalData.field]: modalData.value });
      Swal.fire({
        position: "top",
        icon: "success",
        title: "تم التحديث بنجاح",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });

      const updatedData = { ...user, [modalData.field]: modalData.value };
      setUser(updatedData);
      localStorage.setItem("user", JSON.stringify(updatedData));
      setModalData({ field: "", value: "", otp: "" });
    } catch (error) {
      console.error("Error during update:", error);
      showError("حدث خطأ أثناء التحديث. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="countryheader position-relative py-5">
      <div className="position-absolute country-list w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links bg-white mx-2"
            style={{ color: "#336279" }}
          >
            معلومات الحساب
          </li>
        </ul>
      </div>
      <div className="container py-5">
        <div className="row gy-4">
          <div className="col-md-3 offset-1">
            <div className="cardinfo bg-info py-3 bg-white shadow-sm rounded-4 ps-5">
              <div className="px-3">
                <h6>{user?.first_name}</h6>
                <span dir="ltr">{user?.phone_number}</span>
              </div>
              <hr
                style={{ borderColor: "gray", margin: "10px", width: "100%" }}
              />
              <div>
                <ul className="list-unstyled px-3">
                  <Link href="/accountInformation">
                    <li
                      className={
                        pathName === "/accountInformation" ? "active" : ""
                      }
                    >
                      معلومات الحساب
                    </li>
                  </Link>
                  <Link href="/previousOrders">
                    <li
                      className={pathName === "/previousOrders" ? "active" : ""}
                    >
                      الطلبات السابقة
                    </li>
                  </Link>
                  <Link href="/helpCenter">
                    <li className={pathName === "/helpCenter" ? "active" : ""}>
                      مركز المساعدة
                    </li>
                  </Link>
                  <Link href="/customerService">
                    <li
                      className={
                        pathName === "/customerService" ? "active" : ""
                      }
                    >
                      خدمة العملاء
                    </li>
                  </Link>
                  <Link href={"#"} onClick={handleLogout}>
                    <li style={{ color: "#E14F72" }} aria-label="Logout">
                      تسجيل الخروج
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
          <div className=" col-md-6 offset-2">
            <div className="changeinfo">
              <div className=" bg-white rounded-4 shadow-sm px-5 py-3">
                <p
                  style={{
                    color: "#B6BCC3",
                    fontSize: "13px",
                    fontWeight: "300",
                  }}
                >
                  الاسم
                </p>
                <p
                  style={{
                    color: "#575050",
                    fontSize: "13px",
                    fontWeight: "300",
                  }}
                >
                  {user?.first_name}
                </p>
              </div>
              <div
                className=" boxchange rounded-4 shadow-sm px-5 py-3 my-4 d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#F1F3F6" }}
              >
                <div>
                  <p
                    style={{
                      color: "#B6BCC3",
                      fontSize: "13px",
                      fontWeight: "300",
                    }}
                  >
                    رقم الجوال
                  </p>

                  <p
                    style={{
                      color: "#575050",
                      fontSize: "13px",
                      fontWeight: "300",
                    }}
                    dir="ltr"
                  >
                    {user?.phone_number}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() =>
                      setModalData({
                        field: "phone_number",
                        value: "",
                        otp: "",
                      })
                    }
                    className=" btnchange border-0"
                  >
                    تغيير
                  </button>
                </div>
              </div>
              <div
                className=" boxchange  rounded-4 shadow-sm px-5 py-3 my-4 d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#F1F3F6" }}
              >
                <div>
                  <p
                    style={{
                      color: "#B6BCC3",
                      fontSize: "13px",
                      fontWeight: "300",
                    }}
                  >
                    البريد الإلكترونى
                  </p>
                  <h6
                    style={{
                      color: "#575050",
                      fontSize: "13px",
                      fontWeight: "300",
                    }}
                  >
                    <span>{user?.email}</span>
                  </h6>
                </div>
                <div>
                  <button
                    onClick={() =>
                      setModalData({ field: "email", value: "", otp: "" })
                    }
                    className=" btnchange border-0"
                  >
                    تغيير
                  </button>
                </div>
              </div>
              <div
                className=" boxchange rounded-4 shadow-sm px-5 py-3 d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#F1F3F6" }}
              >
                <div>
                  <h6
                    style={{
                      color: "#B6BCC3",
                      fontSize: "13px",
                      fontWeight: "300",
                    }}
                  >
                    كلمة المرور الحالية
                  </h6>

                  <h6
                    style={{
                      color: "#575050",
                      fontSize: "13px",
                      fontWeight: "300",
                    }}
                  >
                    ********
                  </h6>
                </div>
                <div>
                  <button
                    onClick={() =>
                      setModalData({ field: "password", value: "", otp: "" })
                    }
                    className=" btnchange border-0"
                  >
                    تغيير
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {modalData.field && (
          <div
            className={`modal ${modalData.field ? "modal-visible" : ""}`}
            onClick={(e) => {
              // إذا تم النقر على منطقة خارجية (مودال فقط)، يتم إغلاق النافذة.
              if (e.target.classList.contains("modal")) {
                setModalData({ field: "", value: "", otp: "" });
              }
            }}
          >
            <div className="modal-content">
              <h6 className="modal-title">تغيير {modalData.field}</h6>

              {/* عرض إدخال التغيير حسب نوع الحقل */}
              {modalData.field === "phone_number" ? (
                <>
                  {/* إدخال رقم الجوال */}
                  <PhoneInput
                    defaultCountry="sa" // تعيين الدولة الافتراضية إلى السعودية
                    value={modalData.value}
                    onChange={handlePhoneChange}
                    placeholder="أدخل رقم الجوال"
                    containerClassName="custom-phone-input"
                  />

                  {/* إدخال OTP إذا كان مطلوباً */}
                  <input
                    type="text"
                    className="changeinput my-2"
                    placeholder="أدخل OTP"
                    value={modalData.otp}
                    onChange={(e) =>
                      setModalData({ ...modalData, otp: e.target.value })
                    }
                  />
                </>
              ) : (
                // إدخال نصي للأجزاء الأخرى (البريد الإلكتروني أو كلمة المرور)
                <input
                  type="text"
                  className="changeinput"
                  placeholder={`أدخل ${modalData.field}`}
                  value={modalData.value}
                  onChange={(e) =>
                    setModalData({ ...modalData, value: e.target.value })
                  }
                />
              )}

              {/* زر التحديث */}
              <div className="d-flex justify-content-center align-items-center my-2">
                <button
                  onClick={handleUpdate}
                  className="form-control follow position-relative"
                >
                  {loading ? (
                    <div className="d-flex justify-content-center align-items-center">
                      <TailSpin
                        visible={true}
                        height="20" // تقليل الحجم ليتناسب مع الزر
                        width="20"
                        color="#fff"
                        ariaLabel="tail-spin-loading"
                      />
                    </div>
                  ) : (
                    "تحديث"
                  )}
                </button>
              </div>

              {/* زر الإغلاق */}
              <div>
                <button
                  onClick={() =>
                    setModalData({ field: "", value: "", otp: "" })
                  }
                  className="follow form-control"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
