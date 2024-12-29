"use client";

import { createContext, useContext, useState } from "react";

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
  const [selectedPackage, setSelectedPackagepur] = useState(null);
  return (
    <PackageContext.Provider value={{ selectedPackage, setSelectedPackagepur }}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackage = () => useContext(PackageContext);
