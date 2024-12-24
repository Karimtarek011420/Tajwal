import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingSkeleton() {
  return (
    <div className="px-5 py-5">
      <div className="row gy-4">
        {Array.from({ length: 50 }).map((_, index) => (
          <div key={index} className="col-md-3">
            <div className="bg-white shadow-sm text-center">
              <div className="d-flex justify-content-between align-items-center p-3">
                <div className="country-flag d-flex justify-content-center align-items-center">
                  <Skeleton width={60} height={40} />
                  <Skeleton width={80} className="ms-lg-4 px-lg-3" />
                </div>
                <Skeleton width={20} height={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
