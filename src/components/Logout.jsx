import React from "react";

export default function Logout() {
  localStorage.removeItem("email");
  window.open("/", "_self");
  return <div></div>;
}
