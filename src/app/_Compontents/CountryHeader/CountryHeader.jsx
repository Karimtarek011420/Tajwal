import React from "react";
import Image from "next/image";
import Link from "next/link";
import arrow from "../../../assets/images/arrow.svg";
import "./countryheader.css";
import axios from "axios";
import LoadingSkeleton from "./LoadingSkeleton";

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
  const somecountries = await getCountry();
  const somecountriesshow = somecountries.slice(0, 12);
  if (!somecountriesshow) {
    // عرض صفحة التحميل أثناء جلب البيانات
    return <LoadingSkeleton />;
  }

  return (
    <div className="countryheader position-relative py-5">
      <div className="position-absolute country-list w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links bg-white mx-2"
            style={{ color: "#336279" }}
          >
            دولية
          </li>
          <Link href="" className="country-list-links text-white mx-2">
            قارية
          </Link>
          <Link href="" className="country-list-links text-white mx-2">
            عالمية
          </Link>
        </ul>
      </div>
      <div className="px-5">
        <div className="row gy-4">
          {somecountriesshow?.map((country) => {
            return (
              <div key={country.country_code} className="col-md-3">
                <div className="bg-white shadow-sm text-center">
                  <Link href={`/Countries/${country.country_code}`}>
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
      <div className=" d-flex justify-content-center align-items-center pt-5">
        <Link href="/Countries " className=" countryshow text-white  px-5 py-3">
          عرض جميع الدول
        </Link>
      </div>
    </div>
  );
}
