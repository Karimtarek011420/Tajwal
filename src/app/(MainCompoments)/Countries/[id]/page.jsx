
import React from "react";
import axios from "axios";
import "./details.css";

export default async function DetialsCountry({ params }) {
  const { id } = await params; // الحصول على معرّف الدولة من الروت
  console.log(id)

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
  console.log(" karim",countryDetails[0])

  return (
    <div className="countrydetials position-relative py-5">
      <div className="position-absolute country-list w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links bg-white mx-2"
            style={{ color: "#336279" }}
          >
            {countryDetails[0]?.title}
          </li>
        </ul>
      </div>
      <div className="country-content text-center">
        <h1>{countryDetails[0]?.title}</h1>

      </div>
    </div>
  );
}
