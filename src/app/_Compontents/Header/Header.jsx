import React from "react";
import "./header.css";
import Navbar from "../Navbar/Navbar";

export default function Header() {
  return (
    <>
      <main className="home py-2 pb-5">
        <Navbar />
        <div className="content-center py-5">
          <div>
            <h1 className="text-white text-center">
              ابقى متصلاً <span className="text">اينما كنت</span>
            </h1>
            <p className="text-white text-center">في اكثر من 200 دولة</p>
            <div className="search-bar">
              <button className="search-button" aria-label="Search">
                <i className="fas fa-search"></i>
              </button>
              <input type="text" placeholder="ابحث" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
