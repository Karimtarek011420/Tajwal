"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import "./accountinform.css";
import { usePathname, useRouter } from "next/navigation";
import { authtoken } from "@/app/_Compontents/Authtoken/Authtoken";
import { logoutApi } from "@/app/Hookshelp/logout";

export default function AccountInformation() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  });
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
                style={{
                  borderColor: "gray",
                  margin: "10px",
                  width: "100%",
                }}
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
                <h6
                  style={{
                    color: "#B6BCC3",
                    fontSize: "13px",
                    fontWeight: "300",
                  }}
                >
                  الاسم
                </h6>
                <h6>
                  {" "}
                  <h6
                    style={{
                      color: "#575050",
                      fontSize: "13px",
                      fontWeight: "300",
                    }}
                  >
                    {user?.first_name}
                  </h6>
                </h6>
              </div>
              <div
                className=" boxchange rounded-4 shadow-sm px-5 py-3 my-4 d-flex justify-content-between align-items-center"
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
                    رقم الجوال
                  </h6>

                  <h6
                    style={{
                      color: "#575050",
                      fontSize: "13px",
                      fontWeight: "300",
                    }}
                  >
                    <span dir="ltr">{user?.phone_number}</span>
                  </h6>
                </div>
                <div>
                  <button className=" btnchange border-0"> تغيير</button>
                </div>
              </div>
              <div
                className=" boxchange  rounded-4 shadow-sm px-5 py-3 my-4 d-flex justify-content-between align-items-center"
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
                    البريد الإلكترونى
                  </h6>
                  <h6>
                    {" "}
                    <h6
                      style={{
                        color: "#575050",
                        fontSize: "13px",
                        fontWeight: "300",
                      }}
                    >
                      <span>{user?.email}</span>
                    </h6>
                  </h6>
                </div>
                <div>
                  <button className=" btnchange border-0"> تغيير</button>
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

                  <h6>
                    {" "}
                    <h6
                      style={{
                        color: "#575050",
                        fontSize: "13px",
                        fontWeight: "300",
                      }}
                    >
                      ********
                    </h6>
                  </h6>
                </div>
                <div>
                  <button className=" btnchange border-0"> تغيير</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
