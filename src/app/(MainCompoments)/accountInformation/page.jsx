"use client";
import Link from "next/link";
import React, { useState } from "react";
import "./accountinform.css";

export default function accountInformation() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

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
        <div className=" container py-5">
          <div className=" row gy-4">
            <div className=" col-md-3">
              <div className=" cardinfo bg-info p-3">
                <div>
                  <h6> {user.first_name}</h6>
                  <span dir="ltr">{user.phone_number}</span>
                </div>
                <hr
                  style={{
                    borderColor: "gray",
                    marginTop: "20px",
                    width: "100%",
                  }}
                />
                <div>
                  <ul className=" list-unstyled">
                    <li>عنصر 1</li>
                    <li>عنصر 2</li>
                    <li>عنصر 3</li>
                    <li>عنصر 4</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
