"use client";
import React from "react";
import "./purchase.css";
import { usePackage } from "@/app/_Compontents/PackageContext/PackageContext";
import icon1 from "@/assets/images/Icon1dark.svg";

import icon2 from "@/assets/images/Icon2.svg";
import icon3 from "@/assets/images/icon3dark.svg";
import icon4 from "@/assets/images/icon4.svg";
import icon5 from "@/assets/images/icon5dark.svg";
import Image from "next/image";

export default function page() {
  const { selectedPackage } = usePackage();
  if (!selectedPackage) {
    return (
      <div className=" d-flex justify-content-center align-items-center py-5 selectedPackagereturn ">
        <p>
          لم يتم اختيار أي باقة. الرجاء العودة إلى الصفحة السابقة واختيار باقة.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="Purchasedateils position-relative py-5">
        <div className="position-absolute country-list w-100">
          <ul className="list-unstyled d-flex justify-content-center align-items-center">
            <li
              className="country-list-linkslist bg-white mx-lg-2"
              style={{ color: "#336279" }}
            >
              <span>إتمام الطلب</span>
            </li>
          </ul>
        </div>
        <div className=" container py-5">
          <div className=" row gy-3">
            <div className=" col-md-4">
              <div className="cardpurchase  bg-white shadow-lg rounded-2 position-relative">
                <div className=" countydtailsup d-flex justify-content-around align-items-center position-absolute ">
                  <div>
                    {selectedPackage.operator.countries.map((country) => {
                      return (
                        <Image
                          key={country.country_code}
                          src={country.image}
                          height={58}
                          width={80}
                          alt={country.title}
                        />
                      );
                    })}
                  </div>
                  <div>
                    <span
                      style={{
                        backgroundColor:
                          selectedPackage.amount === -1 ? "#F9F9F9" : "#D9DEE4",
                        fontSize: "13px",
                        fontWeight: "300",
                      }}
                      dir="ltr"
                      className=" px-4 py-2 rounded-2"
                    >
                      {selectedPackage.amount === -1
                        ? "لا محدود"
                        : `${selectedPackage.amount / 1000}GB`}
                    </span>
                  </div>
                </div>
                <div className="py-5">
                  <div
                    className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                    style={{
                      backgroundColor: "#F1F3F666",
                      color: "#626E7B",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon1}
                        width={16}
                        height={16}
                        alt="iconcountry"
                      />
                      <p className="mx-2 my-0">التغطية</p>
                    </div>
                    <div>
                      <p className="my-0">
                        {selectedPackage.operator.coverages
                          .map((coverage) => coverage.name)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                    style={{
                      backgroundColor: "#fff",
                      color: "#626E7B",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon2}
                        width={13}
                        height={16}
                        alt="iconcountry"
                        className=" text-white"
                      />
                      <p className="mx-2 my-0">البيانات</p>
                    </div>
                    <div>
                      <p className="my-0">
                        {selectedPackage.amount === -1
                          ? "لا محدود"
                          : `${selectedPackage.amount / 1000} غيغا بايت`}
                      </p>
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                    style={{
                      backgroundColor: "#F1F3F666",
                      color: "#626E7B",

                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon3}
                        width={13}
                        height={16}
                        alt="iconcountry"
                        className=" text-white"
                      />
                      <p className="mx-2 my-0">الصلاحية</p>
                    </div>
                    <div>
                      <p className="my-0">
                        {selectedPackage.day}{" "}
                        {selectedPackage.day <= 10 ? "أيام" : "يوم"}
                      </p>
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                    style={{
                      backgroundColor: "#fff",
                      color: "#626E7B",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon4}
                        width={13}
                        height={16}
                        alt="iconcountry"
                        className="text-white"
                      />
                      <p className="mx-2 my-0">السعر</p>
                    </div>
                    <div>
                      <p className="my-0">{selectedPackage.price} ر.س</p>
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                    style={{
                      backgroundColor: "#F1F3F666",
                      color: "#626E7B",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon5}
                        width={16}
                        height={16}
                        alt="iconcountry"
                      />
                      <p className="mx-2 my-0">قابلة للتجديد</p>
                    </div>
                    <div>
                      <p className="my-0">
                        {selectedPackage.operator.rechargeability === true
                          ? "نعم"
                          : "لا"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}