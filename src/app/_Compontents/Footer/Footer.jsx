import Image from "next/image";
import Link from "next/link";
import "./footer.css";
import Footerlogo from "../../../assets/images/footerHero.svg";
import appstoreqr from "../../../assets/images/appstoreqr.svg";
import googleplayqr from "../../../assets/images/googleplayqr.svg";
import appStore1 from "../../../assets/images/appStore1.svg";
import googlePlay2 from "../../../assets/images/googlePlay2.svg";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className=" px-3 py-3  ">
          <div className=" row gy-4">
            <div className=" col-md-3  offset-2">
              <div className=" d-flex">
                <Image
                  src={Footerlogo}
                  width={75}
                  height={75}
                  alt="Tajwal Logo"
                  className="me-4"
                />
                <div className=" mx-3">
                  <h6 className="tajwalh">شركة تجوال العالم للتجارة</h6>
                  <p className="tajwalp">
                    هي أول شركة سعودية مسجلة متخصصة في <br /> بيع شرائح التجوال
                    الالكترونية في السعودية، و مرخصة بالسجل التجاري رقم
                    7041398541
                  </p>
                  <div className=" d-flex  ">
                    <i className="fa-brands fa-square-instagram mx-3 fs-5"></i>
                    <i className="fa-brands fa-square-x-twitter fs-5"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="  col-md-3  offset-2">
              <h6 className="tajwalh text-center py-2">حمل التطبيق</h6>
              <div className="">
                <div className=" d-flex justify-content-center align-items-center   ">
                  <div className=" mx-3">
                    <Image
                      src={googleplayqr}
                      className=""
                      width={50}
                      height={50}
                      alt="QR code for Google Play Download"
                    />
                  </div>
                  <div className=" mx-3">
                    <Image
                      src={appstoreqr}
                      width={50}
                      height={50}
                      alt="QR code for  App Store Download"
                    />
                  </div>
                </div>
                <div className="  d-flex justify-content-center align-items-center ">
                  <div className="mx-1">
                    <Image
                      src={googlePlay2}
                      width={75}
                      height={25}
                      alt="Google Play"
                    />
                  </div>

                  <div className=" mx-1">
                    <Image
                      src={appStore1}
                      width={75}
                      height={25}
                      alt="App Store"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <h6 className="tajwalh text-center py-2">خريطة الموقع</h6>
              <ul
                className="row row-cols-2 g-2 text-center list-unstyled tajwalp "
                style={{ fontWeight: 400 }}
              >
                <li className="col">
                  <Link href="/login">دخول</Link>
                </li>
                <li className="col">
                  <Link href="/">البداية</Link>
                </li>
                <li className="col">
                  <Link href="/sign-up">تسجيل</Link>
                </li>
                <li className="col">
                  <Link href="/login">الدول</Link>
                </li>
                <li className="col">
                  <Link href="/login">خدمة العملاء</Link>
                </li>
                <li className="col">
                  <Link href="/login">العروض</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="allfooter d-flex flex-column flex-md-row justify-content-between align-items-center px-3 px-md-5 py-3 text-white">
        <p className="tajwalall text-center mb-2 mb-md-0">
          جميع الحقوق محفوظة لـ <span>تجوال</span>
        </p>
        <div className="d-flex flex-column flex-md-row align-items-center">
          <p className="tajwalall text-center mb-2 mb-md-0 mx-md-3">
            <span>سياسة الخصوصية</span>
          </p>
          <p className="tajwalall text-center mb-0 mx-md-3">
            {" "}
            <span>سياسة الاستخدام</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
