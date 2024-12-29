import React from "react";
import "./purchase.css";

export default function page() {
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
              <div className="cardpurchase  bg-white shadow-lg rounded-2">
                {/* <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "30px",
                    justifyContent: "center",
                  }}
                >
                        <div
                          
                          style={{
                            width: "400px",
                            borderRadius: "10px",
                            boxShadow: "0 5px 5px rgba(0,0,0,0.1)",
                            backgroundColor:'#fff',
                          className=" position-relative" }}
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
                           
                          </div>
                        </div>
                    
                  
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
