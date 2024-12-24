import React from "react";
import Image from "next/image";
import Link from "next/link";
import arrow from "../../../assets/images/arrow.svg";
import "./country.css";
import axios from "axios";

export default async function CountryHeader() {
  const getCountry = async () => {
    const { data } = await axios.get(
      "https://api.tajwal.co/api/v1/countries/home_countries",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data.data;
  };
  const countries = await getCountry();

  return (
    <div className="countryheader  py-5">
      <div className="px-5">
        <div className="row gy-4">
          {countries?.map((country) => {
            return (
              <div key={country.country_code} className="col-md-3">
                <div className="bg-white shadow-sm text-center">
                  <Link href="">
                    <div className="d-flex justify-content-between align-items-center p-3">
                      <div className="country-flag d-flex justify-content-center align-items-center">
                        <Image
                          src={country.image}
                          width={60}
                          height={40}
                          alt="img-country"
                        />
                        <p className="text-black mb-0 ms-lg-4 px-lg-3 countryname">
                          {" "}
                          {country.title}
                        </p>
                      </div>
                      <Image src={arrow} width={20} height={20} alt="arrow" />
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
