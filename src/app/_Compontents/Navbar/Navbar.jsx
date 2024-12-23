"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import logonavbar from "../../../assets/images/logonavbar.svg";
import { authtoken } from "../Authtoken/Authtoken";
import "./navbar.css";
import Swal from "sweetalert2";
import { logoutApi } from "@/app/Hookshelp/logout";

export default function Navbar() {
  const pathName = usePathname();
  const { token, settoken } = useContext(authtoken);
  const [user, setUser] = useState(null);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser); // تخزين بيانات المستخدم فقط
    }
  }, []);
  console.log(user);

  const handleLogout = () => {
    if (token) {
      logoutApi(token, settoken);
    }
  };

  const renderAuthLinks = () => {
    if (token) {
      return (
        <li className="nav-item dropdown dropacount">
          <Link
            className="nav-link dropdown-toggle d-flex align-items-center justify-content-between"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ color: "white" }}
          >
            <div className="d-flex align-items-center mx-2">
              <i className="fa-solid fa-user text-white"></i>
              <span
                className="mx-2 "
                style={{ fontSize: "20px", fontWeight: "500" }}
              >
                {user?.first_name}
              </span>
            </div>
          </Link>
          <ul className="dropdown-menu py-2">
            <li>
              <Link
                className="dropdown-item d-flex justify-content-between align-items-center px-3"
                href="/AccountInformation"
                style={{
                  color: "#575050",
                  padding: "10px",
                  fontSize: "12px",
                  fontWeight: "300",
                  width: "100%",
                }}
              >
                <span className="ps-5">معلومات الحساب</span>
                <i className="fa-solid fa-chevron-left  pe-lg-5 pe-md-1"></i>
              </Link>
              <hr
                style={{
                  borderColor: "gray",
                  margin: 0,
                  width: "100%",
                }}
              />
            </li>

            <li>
              <Link
                className="dropdown-item d-flex justify-content-between align-items-center px-3"
                href="#"
                style={{
                  color: "#575050",
                  padding: "10px",
                  fontSize: "12px",
                  fontWeight: "300",
                  width: "100%",
                }}
              >
                <span className="ps-5">الطلبات السابقة</span>
                <i className="fa-solid fa-chevron-left pe-lg-5 pe-md-1"></i>
              </Link>
              <hr
                style={{
                  borderColor: "gray",
                  margin: 0,
                  width: "100%",
                }}
              />
            </li>

            <li>
              <Link
                className="dropdown-item d-flex justify-content-between align-items-center px-3"
                href="#"
                style={{
                  color: "#E14F72",
                  padding: "10px",
                  fontSize: "12px",
                  fontWeight: "300",
                  width: "100%",
                }}
                onClick={handleLogout}
              >
                <span className="ps-5">تسجيل الخروج</span>
                <i className="fa-solid fa-chevron-left pe-lg-5 pe-md-1"></i>
              </Link>
              <hr style={{ borderColor: "gray", margin: 0, width: "100%" }} />
            </li>
          </ul>
        </li>
      );
    }
    return (
      <>
        <li className="nav-item">
          <Link className="nav-link text-white" href="/Login">
            دخول
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link text-white resgister my-1 mx-lg-5 me-lg-4"
            href="/Register"
          >
            تسجيل
          </Link>
        </li>
      </>
    );
  };

  const DropdownItem = ({ text }) => (
    <li>
      <Link
        className="dropdown-item d-flex justify-content-between align-items-center px-3"
        href="#"
        style={{
          color: "#575050",
          padding: "10px",
          fontSize: "12px",
          fontWeight: "300",
          width: "100%",
        }}
      >
        <span className="ps-5">{text}</span>
        <i className="fa-solid fa-chevron-left pe-lg-5 pe-md-2"></i>
      </Link>
      <hr style={{ borderColor: "gray", margin: 0, width: "100%" }} />
    </li>
  );

  return (
    <nav className="navbar navbar-expand-lg py-1">
      <div className="container-fluid">
        <Link className="navbar-brand px-lg-5" href="#">
          <Image
            className="logo"
            src={logonavbar}
            width={200}
            height={100}
            alt="Company logo"
          />
        </Link>

        <button
          className="navbar-toggler toggler-mobile"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link text-white ${
                  pathName === "/" ? "active" : ""
                }`}
                href="/"
              >
                البداية
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link text-white ${
                  pathName === "/Countries" ? "active" : ""
                }`}
                href="/Countries"
              >
                الدول
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="#">
                العروض
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="#">
                مركز المساعدة
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="#">
                اتصل بنا
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-white"
                aria-label="Switch to English"
              >
                English
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-white"
                aria-label="Switch currency to SAR"
              >
                ر.س
              </button>
            </li>
          </ul>

          <div className="d-flex">
            <ul className="navbar-nav ms-auto mb-2 mx-lg-5 mb-lg-0">
              {renderAuthLinks()}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
