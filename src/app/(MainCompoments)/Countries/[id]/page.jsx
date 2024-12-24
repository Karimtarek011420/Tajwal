import React from "react";
import axios from "axios";
import "./details.css";
import Image from "next/image";

export default async function DetialsCountry({ params }) {
  const { id } = await params; // الحصول على معرّف الدولة من الروت
  const getCountryDetails = async () => {
    const { data } = await axios.get(
      `https://api.tajwal.co/api/v1/countrie/${id}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data.data;
  };

  const countryDetails = await getCountryDetails();

  return (
    <div className="countrydetials position-relative py-5">
      {countryDetails.map((country) => {
        return (
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
                  <span className="mx-3"> {country.title}</span>
                </li>
              </ul>
            </div>
            <div className=" container">
              <div className=" d-flex justify-content-center  align-items-center">
                {country.days.map((day, index) => {
                  return (
                    <button
                      key={index}
                      className=" mx-2 px-4 rounded-1 py-1 btnesim"
                    >
                      {" "}
                      {day} أيام
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
