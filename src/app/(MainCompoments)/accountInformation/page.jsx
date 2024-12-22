import Link from "next/link";
import React from "react";
import "./accountinform.css";

export default function accountInformation() {
  return (
    <>
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
      </div>
    </>
  );
}
