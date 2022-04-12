import React from "react";

export default function AdminLogout() {
  localStorage.removeItem("isAdmin");
  window.open("admin", "_self");
  return <div>AdminLogout</div>;
}
