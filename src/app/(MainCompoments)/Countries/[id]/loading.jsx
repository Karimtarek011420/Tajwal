import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingSkeletondtails() {
  return (
    <div className="countrydetials position-relative py-5">
      <div className="container">
        <Skeleton height={50} width="100%" count={1} className="mb-4" />
        <div className="d-flex flex-wrap gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              height={200}
              width={300}
              className="rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
