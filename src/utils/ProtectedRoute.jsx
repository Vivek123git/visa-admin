import React, { useState } from "react";
import Cookies from "js-cookie";
import Home from "../pages/Home";
const Protected = ({ children }) => {
  const auth = Cookies.get("auth");
  if (auth === "true") {
    return children;
  }
  return <Home />;
};

export default Protected;
