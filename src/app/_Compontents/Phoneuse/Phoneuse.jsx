import React from "react";
import layer1 from "../../../assets/images/layer1.svg";
import layer2 from "../../../assets/images/layer2.svg";
import layer3 from "../../../assets/images/layer3.svg";
import layer4 from "../../../assets/images/layer4.svg";
import "./phoneuse.css";
import Image from "next/image";

export default function Phoneuse() {
  return (
    <>
      <div className=" container py-3 phone">
        <h4 className=" headphone py-5 m-0">كيف تستخدم “تجوال”</h4>
        <div className="row gy-5 gx-2 ">
          <div className="col-md-3  text-center">
            <Image src={layer1} width={200} height={400} alt="phone-download" />
            <h4 className="  py-3 phoneusepra"> حمل التطبيق</h4>
          </div>
          <div className="col-md-3 text-center">
            <Image src={layer2} width={200} height={400} alt="phone-download" />
            <h4 className="  py-3 phoneusepra"> اختر الوجهة والباقة </h4>
          </div>
          <div className="col-md-3 text-center">
            <Image src={layer3} width={200} height={400} alt="phone-download" />
            <h4 className="  py-3 phoneusepra"> ثبت الشريحة</h4>
          </div>
          <div className="col-md-3 text-center">
            <Image src={layer4} width={200} height={400} alt="phone-download" />
            <h4 className="  py-3 phoneusepra"> استمتع بالباقة </h4>
          </div>
        </div>
      </div>
    </>
  );
}
