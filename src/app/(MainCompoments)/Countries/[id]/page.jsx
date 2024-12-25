"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import icon1 from "@/assets/images/Icon1.svg";
import icon1dark from "@/assets/images/Icon1dark.svg";
import icon2 from "@/assets/images/Icon2dark.svg";
import icon2dark from "@/assets/images/Icon2.svg";
import icon3 from "@/assets/images/icon3.svg";
import icon3dark from "@/assets/images/icon3dark.svg";
import icon4dark from "@/assets/images/icon4.svg";
import icon4 from "@/assets/images/icon4dark.svg";
import icon5 from "@/assets/images/icon5.svg";
import icon5dark from "@/assets/images/icon5dark.svg";
import icon6m from "@/assets/images/icon6m.svg";
import "./details.css";
import Image from "next/image";

export default function DetailsCountry({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;
  const [data, setData] = useState(null);
  const [selectedDay, setSelectedDay] = useState("1");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getCountryDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.tajwal.co/api/v1/countrie/${id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setData(response.data?.data); // تأكد من وجود البيانات
    } catch (error) {
      console.error("Error fetching country details:", error);
    }
  };

  useEffect(() => {
    if (id) getCountryDetails();
  }, [id]);
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const openModal = (pkg, operator) => {
    setSelectedPackage({ ...pkg, operator });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPackage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="countrydetials position-relative py-5">
      {Array.isArray(data) &&
        data.map((country) => (
          <div key={country.country_code}>
            <div className="position-absolute country-list w-100">
              <ul className="list-unstyled d-flex justify-content-center align-items-center">
                <li
                  className="country-list-linkslist bg-white mx-lg-2"
                  style={{ color: "#336279" }}
                >
                  <Image
                    src={country.image}
                    width={35}
                    height={25}
                    alt={country.title}
                  />
                  <span className="mx-3">{country.title}</span>
                </li>
              </ul>
            </div>
            <div className="container">
              <div className="d-flex flex-wrap justify-content-center align-items-center pt-2 pb-4">
                {country?.days?.map((day) => (
                  <button
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className="btn-day mx-1 my-2 px-3 py-1 rounded-1"
                    style={{
                      backgroundColor:
                        selectedDay === day ? "#336279" : "transparent",
                      color: selectedDay === day ? "#fff" : "#336279",
                    }}
                  >
                    {day} {day <= 10 ? "أيام" : "يوم"}
                  </button>
                ))}
              </div>

              <div className="row gy-5 py-5">
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "30px",
                    justifyContent: "center",
                  }}
                >
                  {country.operators.map((operator) =>
                    operator.packages
                      .filter((pkg) => pkg.day === parseInt(selectedDay))
                      .map((pkg) => (
                        <div
                          key={pkg.id}
                          style={{
                            width: "400px",
                            borderRadius: "10px",
                            boxShadow: "0 5px 5px rgba(0,0,0,0.1)",
                            background:
                              pkg.amount === -1
                                ? "linear-gradient(to top, #336279, #5EB5DF)" // تدرج لوني للحزم غير المحدودة
                                : "white", // تدرج لوني للحزم المحدودة
                          }}
                          className=" position-relative"
                        >
                          <div className=" countydtailsup d-flex justify-content-around align-items-center position-absolute ">
                            <div>
                              {operator.countries.map((country) => {
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
                                    pkg.amount === -1 ? "#F9F9F9" : "#D9DEE4",
                                  fontSize: "13px",
                                  fontWeight: "300",
                                }}
                                dir="ltr"
                                className=" px-4 py-2 rounded-2"
                              >
                                {pkg.amount === -1
                                  ? "لا محدود"
                                  : `${pkg.amount / 1000}GB`}
                              </span>
                            </div>
                          </div>
                          <div className="py-5">
                            <div
                              className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                              style={{
                                backgroundColor:
                                  pkg.amount === -1 ? "#F1F3F666" : "#F1F3F666",
                                color:
                                  pkg.amount === -1 ? "#FFFFFF" : "#626E7B",
                                fontSize: "12px",
                                fontWeight: "400",
                              }}
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                <Image
                                  src={pkg.amount === -1 ? icon1 : icon1dark}
                                  width={16}
                                  height={16}
                                  alt="iconcountry"
                                />
                                <p className="mx-2 my-0">التغطية</p>
                              </div>
                              <div>
                                <p className="my-0">
                                  {operator.coverages
                                    .map((coverage) => coverage.name)
                                    .join(", ")}
                                </p>
                              </div>
                            </div>
                            <div
                              className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                              style={{
                                backgroundColor:
                                  pkg.amount === -1 ? "#F1F3F666" : "#fff",
                                color:
                                  pkg.amount === -1 ? "#FFFFFF" : "#626E7B",
                                fontSize: "12px",
                                fontWeight: "400",
                              }}
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                <Image
                                  src={pkg.amount === -1 ? icon2 : icon2dark}
                                  width={13}
                                  height={16}
                                  alt="iconcountry"
                                  className=" text-white"
                                />
                                <p className="mx-2 my-0">البيانات</p>
                              </div>
                              <div>
                                <p className="my-0">
                                  {pkg.amount === -1
                                    ? "لا محدود"
                                    : `${pkg.amount / 1000} غيغا بايت`}
                                </p>
                              </div>
                            </div>
                            <div
                              className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                              style={{
                                backgroundColor:
                                  pkg.amount === -1 ? "#F1F3F666" : "#F1F3F666",
                                color:
                                  pkg.amount === -1 ? "#FFFFFF" : "#626E7B",
                                fontSize: "12px",
                                fontWeight: "400",
                              }}
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                <Image
                                  src={pkg.amount === -1 ? icon3 : icon3dark}
                                  width={13}
                                  height={16}
                                  alt="iconcountry"
                                  className=" text-white"
                                />
                                <p className="mx-2 my-0">الصلاحية</p>
                              </div>
                              <div>
                                <p className="my-0">
                                  {pkg.day} {pkg.day <= 10 ? "أيام" : "يوم"}
                                </p>
                              </div>
                            </div>
                            <div
                              className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                              style={{
                                backgroundColor:
                                  pkg.amount === -1 ? "#F1F3F666" : "#fff",
                                color:
                                  pkg.amount === -1 ? "#FFFFFF" : "#626E7B",
                                fontSize: "12px",
                                fontWeight: "400",
                              }}
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                <Image
                                  src={pkg.amount === -1 ? icon4 : icon4dark}
                                  width={13}
                                  height={16}
                                  alt="iconcountry"
                                  className="text-white"
                                />
                                <p className="mx-2 my-0">السعر</p>
                              </div>
                              <div>
                                <p className="my-0">{pkg.price} ر.س</p>
                              </div>
                            </div>
                            <div
                              className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                              style={{
                                backgroundColor:
                                  pkg.amount === -1 ? "#F1F3F666" : "#F1F3F666",
                                color:
                                  pkg.amount === -1 ? "#FFFFFF" : "#626E7B",
                                fontSize: "12px",
                                fontWeight: "400",
                              }}
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                <Image
                                  src={pkg.amount === -1 ? icon5 : icon5dark}
                                  width={16}
                                  height={16}
                                  alt="iconcountry"
                                />
                                <p className="mx-2 my-0">قابلة للتجديد</p>
                              </div>
                              <div>
                                <p className="my-0">
                                  {operator.rechargeability === true
                                    ? "نعم"
                                    : "لا"}
                                </p>
                              </div>
                            </div>
                            <div className=" d-flex justify-content-center align-items-center">
                              <button
                                onClick={() => openModal(pkg, operator)}
                                style={{
                                  backgroundColor: "transparent",
                                  padding: "10px 60px",
                                  color: pkg.amount === -1 ? "#fff" : "#336279",
                                  border:
                                    pkg.amount === -1
                                      ? "2px #fff solid"
                                      : "2px #336279 solid",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  marginTop: "10px",
                                }}
                              >
                                اختيار
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      {isModalOpen && selectedPackage && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "15px",
              width: "600px",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.7)",
              position: "relative",
              background:
                selectedPackage.amount === -1
                  ? "linear-gradient(to top, #336279, #5EB5DF)" // تدرج لوني للحزم غير المحدودة
                  : "white", // تدرج لوني للحزم المحدودة
            }}
          >
            <button
              onClick={closeModal}
              style={{
                float: "left",
                border: "none",
                background: "transparent",
                fontSize: "20px",
                cursor: "pointer",
                position: "absolute",
                right: "87%",
                top: "-20px",
              }}
            >
              <i
                className="fa-solid fa-xmark text-white fs-3 p-3 rounded-2"
                style={{ backgroundColor: "#336279" }}
              ></i>
            </button>
            <div className="row py-5 justify-content-center align-items-center">
              <div className="  col-md-4">
                <div className="py-3 text-center">
                  <div>
                    {selectedPackage.operator.countries.map((country) => {
                      return (
                        <Image
                          key={country.country_code}
                          src={country.image}
                          height={54}
                          width={75}
                          alt={country.title}
                        />
                      );
                    })}
                  </div>
                  <div>
                    {selectedPackage.operator.countries.map((country) => {
                      return (
                        <p
                          key={country.country_code}
                          className=" py-3"
                          style={{
                            color:
                              selectedPackage.amount === -1
                                ? "#fff"
                                : "#575050",
                            fontSize: "13px",
                            fontWeight: "700",
                          }}
                        >
                          {country.title}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className=" col-md-8">
                <div>
                  <div
                    className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                    style={{
                      backgroundColor:
                        selectedPackage.amount === -1
                          ? "#F1F3F666"
                          : "#F1F3F666",
                      color:
                        selectedPackage.amount === -1 ? "#FFFFFF" : "#626E7B",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={selectedPackage.amount === -1 ? icon1 : icon1dark}
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
                      backgroundColor:
                        selectedPackage.amount === -1 ? "#F1F3F666" : "#fff",
                      color:
                        selectedPackage.amount === -1 ? "#FFFFFF" : "#626E7B",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={selectedPackage.amount === -1 ? icon2 : icon2dark}
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
                      backgroundColor:
                        selectedPackage.amount === -1
                          ? "#F1F3F666"
                          : "#F1F3F666",
                      color:
                        selectedPackage.amount === -1 ? "#FFFFFF" : "#626E7B",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={selectedPackage.amount === -1 ? icon3 : icon3dark}
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
                      backgroundColor:
                        selectedPackage.amount === -1 ? "#F1F3F666" : "#fff",
                      color:
                        selectedPackage.amount === -1 ? "#FFFFFF" : "#626E7B",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={selectedPackage.amount === -1 ? icon4 : icon4dark}
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
                      backgroundColor:
                        selectedPackage.amount === -1
                          ? "#F1F3F666"
                          : "#F1F3F666",
                      color:
                        selectedPackage.amount === -1 ? "#FFFFFF" : "#626E7B",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={selectedPackage.amount === -1 ? icon5 : icon5dark}
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
            <div
              className="row py-4 px-4 justify-content-center align-items-center"
              style={{ backgroundColor: "#F9F9F9" }}
            >
              <div className="col-md-6 d-flex flex-column align-items-center text-center">
                <p
                  style={{
                    color: "#575050",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  دول التغطية{" "}
                  <span className="mx-1">
                    ({selectedPackage.operator.coverages.length} دولة)
                  </span>
                </p>
                <div className="d-flex justify-content-between align-items-center w-100  rounded-2 bg-white shadow-sm p-3">
                  <p
                    style={{
                      color: "#575050",
                      fontSize: "10px",
                      fontWeight: "300",
                    }}
                    className="text-center mb-0"
                  >
                    {selectedPackage.operator.coverages
                      .map((c) => c.name)
                      .join(", ")}
                  </p>
                  <span className="d-flex">
                    {selectedPackage.operator.countries.map((country) => (
                      <Image
                        key={country.country_code}
                        src={country.image}
                        height={20}
                        width={28}
                        alt={country.title}
                      />
                    ))}
                  </span>
                </div>
                <hr />
              </div>
              <div className="col-md-6 d-flex flex-column align-items-center text-center">
                <p
                  style={{
                    color: "#575050",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  معلومات إضافية
                </p>
                <div
                  className=" w-100  rounded-2 bg-white shadow-sm"
                  style={{
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "#626E7B",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center text-center  rounded-2 m-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon6m}
                        width={13}
                        height={16}
                        alt="iconcountry"
                        className=" text-white"
                      />
                      <p className="mx-2 my-0">الشبكة</p>
                    </div>
                    <div>
                      <p className="my-0">
                        {selectedPackage.operator.coverages.map((coverage) => (
                          <span key={coverage.name}>
                            {coverage.networks
                              .map((network) => network.name)
                              .join(", ")}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className=" w-100  rounded-2 bg-white shadow-sm"
                  style={{
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "#626E7B",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center text-center  rounded-2 m-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon6m}
                        width={13}
                        height={16}
                        alt="iconcountry"
                        className=" text-white"
                      />
                      <p className="mx-2 my-0">نوع الباقة</p>
                    </div>
                    <div>
                      <p className="my-0">
                        {selectedPackage.operator.coverages.map((coverage) => (
                          <span key={coverage.name}>
                            {coverage.networks
                              .map((network) => network.name)
                              .join(", ")}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              شراء
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
