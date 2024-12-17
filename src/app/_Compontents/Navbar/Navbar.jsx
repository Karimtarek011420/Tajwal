"use client";
import React from "react";
import Link from "next/link";
import logonavbar from "../../../assets/images/logonavbar.svg";
import Image from "next/image";
import { useEffect } from "react";

import "./navbar.css";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathName = usePathname();
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg py-1  ">
        <div className="container-fluid">
          <Link className="navbar-brand px-lg-5" href="#">
            <Image
              className="logo"
              src={logonavbar}
              width={200}
              height={100}
              alt="Company logo"
            />{" "}
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
                  className={`nav-link  text-white ${
                    pathName === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  href="/"
                >
                  البداية
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  text-white" href="#">
                  {" "}
                  الدول
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  text-white" href="#">
                  {" "}
                  العروض
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  text-white" href="#">
                  مركز المساعدة
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  text-white" href="#">
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
                <li className="nav-item">
                  <Link
                    className="nav-link  text-white"
                    aria-current="page"
                    href="/Login"
                  >
                    الدخول
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link  text-white resgister px-3"
                    href="/Register"
                  >
                    تسجيل الدخول
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
