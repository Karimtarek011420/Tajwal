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
import iconip from "@/assets/images/iconip.svg";
import "./details.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePackage } from "@/app/_Compontents/PackageContext/PackageContext";

export default function DetailsCountry({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;
  const router = useRouter();
  const [data, setData] = useState(null);
  const [selectedDay, setSelectedDay] = useState("1");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSelectedPackagepur } = usePackage(); // استخدام السياق

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
  const handlePurchase = () => {
    setSelectedPackagepur(selectedPackage);
    router.push("/Purchase");
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
            <div className=" d-flex justify-content-center align-items-center pt-5">
              <Link
                href="/Countries "
                className=" countryshow text-white  px-5 py-3"
              >
                عرض جميع الدول
              </Link>
            </div>
          </div>
        ))}
      {isModalOpen && selectedPackage && (
        <div className="modelopen">
          <div className="modal-content">
            <button className="closeModal" onClick={closeModal}>
              <i
                className="fa-solid fa-xmark text-white fs-6 p-3 rounded-2"
                style={{ backgroundColor: "#336279" }}
              ></i>
            </button>
            <div className="row gy-1 py-lg-3 justify-content-center align-items-center modal-contentmedia">
              <div className="  col-md-4">
                <div className=" text-center">
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
                          className=" py-lg-3 "
                          style={{
                            color: "#575050",
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
              <div className="col-md-8">
                <div>
                  <div className="d-flex justify-content-between align-items-center text-center  rounded-2 mt-3 contentsimmodel ">
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon1dark}
                        width={16}
                        height={16}
                        alt="iconcountry"
                      />
                      <p className="mx-2 my-0 contentsimmodelp">التغطية</p>
                    </div>
                    <div>
                      <p className="my-0 contentsimmodelp">
                        {selectedPackage.operator.coverages
                          .map((coverage) => coverage.name)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center text-center  rounded-2 mt-2 bg-white contentsimmodel">
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon2dark}
                        width={13}
                        height={16}
                        alt="iconcountry"
                        className=" text-white"
                      />
                      <p className="mx-2 my-0 contentsimmodelp">البيانات</p>
                    </div>
                    <div>
                      <p className="my-0 contentsimmodelp">
                        {selectedPackage.amount === -1
                          ? "لا محدود"
                          : `${selectedPackage.amount / 1000} غيغا بايت`}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center text-center  rounded-2 mt-2 contentsimmodel">
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon3dark}
                        width={13}
                        height={16}
                        alt="iconcountry"
                        className=" text-white"
                      />
                      <p className="mx-2 my-0 contentsimmodelp">الصلاحية</p>
                    </div>
                    <div>
                      <p className="my-0 contentsimmodelp">
                        {selectedPackage.day}{" "}
                        {selectedPackage.day <= 10 ? "أيام" : "يوم"}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center text-center  rounded-2 mt-2 bg-white contentsimmodel">
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon4dark}
                        width={13}
                        height={16}
                        alt="iconcountry"
                        className="text-white"
                      />
                      <p className="mx-2 my-0 contentsimmodelp">السعر</p>
                    </div>
                    <div>
                      <p className="my-0 contentsimmodelp">
                        {selectedPackage.price} ر.س
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center text-center  rounded-2 mt-2 contentsimmodel">
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon5dark}
                        width={16}
                        height={16}
                        alt="iconcountry"
                      />
                      <p className="mx-2 my-0 contentsimmodelp">
                        قابلة للتجديد
                      </p>
                    </div>
                    <div>
                      <p className="my-0 contentsimmodelp">
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
              className="row gy-1 py-lg-2 mt-lg-2 mt-1 pt-1"
              style={{ backgroundColor: "#F9F9F9" }}
            >
              <div className="col-md-4">
                <p className="textmodelp">
                  دول التغطية{" "}
                  <span className="mx-1">
                    ({selectedPackage.operator.coverages.length} دولة)
                  </span>
                </p>
                <div className="d-flex justify-content-between align-items-center w-100  rounded-2 bg-white shadow-sm p-lg-3 p-2">
                  <p
                    style={{
                      fontSize: "10px",
                    }}
                    className="text-center mb-0 textmodelp"
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
              </div>
              <div className="col-md-8 ">
                <p className="textmodelp">معلومات إضافية</p>
                <div className=" w-100  rounded-2 bg-white shadow-sm p-1">
                  <div>
                    <div className="d-flex justify-content-between align-items-center text-center px-lg-3 px-1 py-lg-1  mt-lg-2">
                      <div className="d-flex align-items-center justify-content-center ">
                        <Image
                          src={icon6m}
                          width={11}
                          height={11}
                          alt="iconcountry"
                          className=" text-white"
                        />
                        <p className="mx-2 my-0 textmodelpsecond">الشبكة</p>
                      </div>
                      <div>
                        <p className="my-0 textmodelpsecond">
                          {selectedPackage.operator.coverages.map(
                            (coverage) => (
                              <span key={coverage.name}>
                                {coverage.networks
                                  .map((network) => network.name)
                                  .join(", ")}
                              </span>
                            )
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center text-center px-lg-3 px-1 py-1  mt-lg-2">
                      <div className="d-flex align-items-center justify-content-center ">
                        <Image
                          src={icon6m}
                          width={11}
                          height={11}
                          alt="iconcountry"
                          className=" text-white"
                        />
                        <p className="mx-2 my-0 textmodelpsecond">نوع الباقة</p>
                      </div>
                      <div>
                        <p className="my-0 textmodelpsecond">
                          {selectedPackage.operator.plan_type}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center text-center  px-lg-3 px-1 py-1  mt-lg-2">
                      <div className="d-flex align-items-center justify-content-center">
                        <Image
                          src={icon6m}
                          width={11}
                          height={11}
                          alt="iconcountry"
                          className=" text-white"
                        />
                        <p className="mx-2 my-0 textmodelpsecond">
                          سياسة التفعيل
                        </p>
                      </div>
                      <div>
                        <p className="my-0 textmodelpsecond">
                          {selectedPackage.operator.activation_policy}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center text-center px-lg-3 px-1 py-1  mt-lg-2">
                      <div className="d-flex align-items-center justify-content-center textmodelpsecond">
                        <Image
                          src={icon5dark}
                          width={10}
                          height={10}
                          alt="iconcountry"
                          className=" text-white"
                        />
                        <p className="mx-2 my-0 textmodelpsecond">
                          امكانية شحن الرصيد
                        </p>
                      </div>
                      <div>
                        <p className="my-0 textmodelpsecond">
                          {selectedPackage.operator.rechargeability === true
                            ? "نعم "
                            : " لا"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center text-center px-lg-3 px-1 py-1  mt-lg-2">
                      <div className="d-flex align-items-center justify-content-center">
                        <Image
                          src={iconip}
                          width={11}
                          height={11}
                          alt="iconcountry"
                          className=" text-white"
                        />
                        <p className="mx-2 my-0 textmodelpsecond">توجيه IP</p>
                      </div>
                      <div>
                        <p className="my-0 textmodelpsecond">لا</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center text-center px-lg-3 px-1 py-1  mt-lg-2">
                      <div className="d-flex align-items-center justify-content-center">
                        <Image
                          src={icon6m}
                          width={11}
                          height={11}
                          alt="iconcountry"
                          className=" text-white"
                        />
                        <p className="mx-2 my-0 textmodelpsecond">
                          معلومات اخرى
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="   bg-white d-flex justify-content-between  align-items-center">
              <button
                style={{
                  padding: "10px ",
                  backgroundColor: "#626E7B",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                className=" px-5 py-lg-2 py-1 mx-3"
                onClick={handlePurchase}
              >
                شراء
              </button>
              <div
                className="p-lg-2 p-1"
                style={{
                  color: "#575050",
                  fontSize: "17px",
                  fontWeight: "700",
                }}
              >
                <p>{selectedPackage.price} ر.س</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
