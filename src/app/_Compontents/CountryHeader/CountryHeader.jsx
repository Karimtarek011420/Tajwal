import React from "react";
import Image from "next/image";
import Link from "next/link";
import germany from "../../../assets/images/germany.svg";
import uk from "../../../assets/images/united-k.svg";
import china from "../../../assets/images/china.svg";
import france from "../../../assets/images/france.svg";
import arrow from "../../../assets/images/arrow.svg";
import "./countryheader.css";
import jwt from 'jsonwebtoken';


export default function CountryHeader() {
  const list1 = [
    { name: "المملكة المتحدة", flag: uk },
    { name: "المانيا", flag: germany },
    { name: "فرنسا", flag: france },
    { name: "الصين", flag: china },
    { name: "المملكة المتحدة", flag: uk },
    { name: "المانيا", flag: germany },
    { name: "فرنسا", flag: france },
    { name: "الصين", flag: china },
    { name: "المملكة المتحدة", flag: uk },
    { name: "المانيا", flag: germany },
    { name: "فرنسا", flag: france },
    { name: "الصين", flag: china },
  ];
  

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
          {list1.map((country, index) => {
            return (
              <div key={index} className="col-md-3">
                <div className="bg-white shadow-sm text-center">
                  <Link href="">
                    <div className="d-flex justify-content-between align-items-center p-3">
                      <div className="country-flag d-flex justify-content-center align-items-center">
                        <Image
                          src={country.flag}
                          width={60}
                          height={40}
                          alt="img-country"
                        />
                        <p className="text-black mb-0 ms-lg-4 px-lg-2 countryname">
                          {" "}
                          {country.name}
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
        <Link href=" " className=" countryshow text-white  px-5 py-3">
          عرض جميع الدول
        </Link>
      </div>
    </div>
  );
}
