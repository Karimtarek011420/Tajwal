"use client";
import { createContext, useEffect, useState } from "react";
export const authtoken = createContext();
export default function Authtoken({ children }) {
  const [token, settoken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      settoken(token);
    }
  }, []);

  return (
    <authtoken.Provider value={{ settoken, token }}>
      {children}
    </authtoken.Provider>
  );
}
