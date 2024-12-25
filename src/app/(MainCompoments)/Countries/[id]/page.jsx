"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import "./details.css";
import Image from "next/image";

export default function DetailsCountry({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;
  const [data, setData] = useState(null);
  const [selectedDay, setSelectedDay] = useState("1");
  const [selectedPackage, setSelectedPackage] = useState(null); // الحزمة المختارة
  const [isModalOpen, setIsModalOpen] = useState(false); // حالة المودال

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

  const openModal = (pkg) => {
    setSelectedPackage(pkg);
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
                  className="country-list-links bg-white mx-2"
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
              <div className="d-flex justify-content-center align-items-center">
                {country?.days?.map((day) => (
                  <button
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className="mx-2 px-4 rounded-1 py-1 btnesim"
                    style={{
                      backgroundColor:
                        selectedDay === day ? "#336279" : "transparent",
                      color: selectedDay === day ? "#fff" : "#336279",
                      border: selectedDay === day ? "none" : "1px solid #ccc",
                    }}
                  >
                    {day} {day <= 10 ? "أيام" : "يوم"}
                  </button>
                ))}
              </div>
              <div className="row gy-3 py-5">
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
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
                            width: "300px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            overflow: "hidden",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                          }}
                        >
                          <div
                            style={{
                              padding: "20px",
                              backgroundColor: "#007BFF",
                              color: "#fff",
                            }}
                          >
                            <h3>{operator.plan_type}</h3>
                            <p>التفعيل: {operator.activation_policy}</p>
                            <p>
                              الشبكة:{" "}
                              {operator.coverages
                                .map((coverage) => coverage.name)
                                .join(", ")}
                            </p>
                          </div>
                          <div style={{ padding: "20px" }}>
                            <p>السعر: {pkg.price} $</p>
                            <p>عدد الأيام: {pkg.day}</p>
                            <p>
                              البيانات:{" "}
                              {pkg.amount === -1
                                ? "لا محدود"
                                : `${pkg.amount} ميجابايت`}
                            </p>
                            <button
                              onClick={() => openModal(pkg)}
                              style={{
                                padding: "10px 20px",
                                backgroundColor: "#007BFF",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginTop: "10px",
                              }}
                            >
                              اختيار
                            </button>
                          </div>
                        </div>
                      ))
                  )}
                </div>
                {/* {country?.operators?.map((operator) => (
                  <div
                    key={operator.id}
                    className="col-12 col-xxl-3 col-lg-4 col-sm-6"
                  >
                    <div className="cartesim"></div>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
