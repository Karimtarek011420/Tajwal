"use client";
import { createContext, useEffect, useState } from "react";
export const authtoken = createContext();
export default function AuthTokenProvider({ children }) {
  const [token, settoken] = useState(() => localStorage.getItem("token"));
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
