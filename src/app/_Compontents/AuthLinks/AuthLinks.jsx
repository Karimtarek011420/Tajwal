import Image from "next/image";
import "./authlinks.css";
import xauth from "../../../assets/images/xauth.svg";
import google from "../../../assets/images/googleauth.svg";
import appleauth from "../../../assets/images/appleauth.svg";
import Link from "next/link";

const AuthLinks = () => {
  return (
    <>
      <div className="position-relative mb-3 text-center authlinks">
        <p className="bg-white position-relative z-2 px-3 d-inline-block  authlinkspara">
          المتابعة باستخدام
        </p>
        <div className="position-absolute  top-50 start-0  w-100  border-top  text-black-50 p-0 m-0 "></div>
      </div>

      <div className="mb-4 d-flex justify-content-center gap-3">
        <Link href="#" aria-label="Sign in with Twitter" className=" ms-3">
          <Image
            src={xauth}
            className="authlinksicon"
            alt="Sign in with Twitter account"
          />
        </Link>
        <Link href="#" aria-label="Sign in with google" className=" ms-3">
          <Image src={google} alt="Sign in with google account" />
        </Link>
        <Link href="#" aria-label="Sign in with appleauth">
          <Image src={appleauth} alt="Sign in with appleauth account" />
        </Link>
      </div>
    </>
  );
};

export default AuthLinks;
