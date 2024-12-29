"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logonavbar from "../../../assets/images/logonavbar.svg";
import { authtoken } from "../Authtoken/Authtoken";
import "./navbar.css";
import { logoutApi } from "@/app/Hookshelp/logout";

// مكون خاص برابط Dropdown
const DropdownItem = ({ href, text, onClick, customColor }) => (
  <li>
    <Link
      className="dropdown-item d-flex justify-content-between align-items-center px-3"
      href={href || "#"}
      onClick={onClick}
      style={{
        color: customColor || "#575050",
        padding: "10px",
        fontSize: "12px",
        fontWeight: "300",
        width: "100%",
      }}
    >
      <span className="ps-5">{text}</span>
      <i className="fa-solid fa-chevron-left pe-lg-5 pe-md-1"></i>
    </Link>
    <hr style={{ borderColor: "gray", margin: 0, width: "100%" }} />
  </li>
);

export default function Navbar() {
  const pathName = usePathname();
  const { token, settoken } = useContext(authtoken);
  const [user, setUser] = useState(null);

  // تحميل Bootstrap JS
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // استرجاع بيانات المستخدم من LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    if (token) {
      logoutApi(token, settoken);
    }
  };

  // روابط المستخدم المسجل
  const renderAuthLinks = () =>
    token ? (
      <li className="nav-item dropdown dropacount offnecmedia">
        <Link
          className="nav-link dropdown-toggle d-flex align-items-center justify-content-between"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ color: "white" }}
        >
          <div className="d-flex align-items-center mx-2">
            <i className="fa-solid fa-user text-white iconoffcen"></i>
            <span
              className="mx-2"
              style={{ fontSize: "20px", fontWeight: "500" }}
            >
              {user?.first_name}
            </span>
          </div>
        </Link>
        <ul className="dropdown-menu py-2 ">
          <DropdownItem href="/AccountInformation" text="معلومات الحساب" className="btnlist" />
          <DropdownItem href="#" text="الطلبات السابقة" className="btnlist" />
          <DropdownItem
            text="تسجيل الخروج"
            customColor="#E14F72"
            onClick={handleLogout}
            className="btnlist"
          />
        </ul>
      </li>
    ) : (
      <>
        <li className="nav-item offnecmedia">
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

  return (
    <nav className="navbar navbar-expand-lg py-1">
      <div className="container-fluid">
        <Link className="navbar-brand px-lg-5" href="/">
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
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header d-flex ">
            <button
              type="button"
              className="btn-close text-black  d-lg-none fs-6  border border-1 border-black "
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
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
      </div>
    </nav>
  );
}
