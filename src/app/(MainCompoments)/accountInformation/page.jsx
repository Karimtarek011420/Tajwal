"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import "./accountinform.css";
import { usePathname, useRouter } from "next/navigation";
import { authtoken } from "@/app/_Compontents/Authtoken/Authtoken";
import { logoutApi } from "@/app/Hookshelp/logout";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";

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
      toast.error("Invalid phone number format.");
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
      toast.error("Failed to send OTP. Please try again.");
      return null;
    } finally {
      setLoading(false); // Set loading state back to false after the request is done
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
    }
    setLoading(false);
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
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (modalData.field === "phone_number") {
        if (!modalData.otp) {
          // Step 1: Request OTP
          await createPhoneOtp(modalData.value);

          Swal.fire({
            position: "top",
            icon: "success",
            title: " تم إرسال رمز OTP بنجاح",
            showConfirmButton: false,
            timer: 500,
            toast: true,
            background: "#4b87a4",
            color: "white",
            iconColor: "white",
            padding: "10px 20px",
            width: 400,
            timerProgressBar: true,
          });

          return;
        } else {
          await updatePhoneNumber(modalData.otp, modalData.value);
          Swal.fire({
            position: "top",
            icon: "success",
            title: "تم  التحديث بنجاح  ",
            showConfirmButton: false,
            timer: 500,
            toast: true,
            background: "#4b87a4",
            color: "white",
            iconColor: "white",
            padding: "10px 20px",
            width: 400,
            timerProgressBar: true,
          });
        }
      } else {
        // Update email or password
        await updateProfile({ [modalData.field]: modalData.value });
        Swal.fire({
          position: "top",
          icon: "success",
          title: "تم   التحديث بنجاح",
          showConfirmButton: false,
          timer: 500,
          toast: true,
          background: "#4b87a4",
          color: "white",
          iconColor: "white",
          padding: "10px 20px",
          width: 400,
          timerProgressBar: true,
        });
      }

      // Update local data
      const updatedData = { ...user, [modalData.field]: modalData.value };
      setUser(updatedData);
      localStorage.setItem("user", JSON.stringify(updatedData));
      Swal.fire({
        position: "top",
        icon: "success",
        title: "تم  التحديث  بنجاح",
        showConfirmButton: false,
        timer: 500,
        toast: true,
        background: "#4b87a4",
        color: "white",
        iconColor: "white",
        padding: "10px 20px",
        width: 400,
        timerProgressBar: true,
      });
      setModalData({ field: "", value: "", otp: "" });
    } catch (error) {
      console.error("Error during update:", error);
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
              if (e.target.classList.contains("modal")) {
                setModalData({ field: "", value: "", otp: "" });
              }
            }}
          >
            <div className="modal-content">
              <h6 className="">تغيير {modalData.field}</h6>
              <input
                type="text"
                className="changeinput"
                placeholder={`أدخل ${modalData.field}`}
                value={modalData.value}
                onChange={(e) =>
                  setModalData({ ...modalData, value: e.target.value })
                }
              />
              {modalData.field === "phone_number" && (
                <input
                  type="text"
                  className="changeinput my-2"
                  placeholder="أدخل OTP"
                  value={modalData.otp}
                  onChange={(e) =>
                    setModalData({ ...modalData, otp: e.target.value })
                  }
                />
              )}
              <div className="d-flex justify-content-center align-items-center my-2">
                <button onClick={handleUpdate} className=" form-control follow">
                  {loading ? (
                    <TailSpin
                      visible={true}
                      height="35"
                      width="35"
                      color="#fff"
                      ariaLabel="tail-spin-loading"
                    />
                  ) : (
                    "تحديث"
                  )}
                </button>
              </div>
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
