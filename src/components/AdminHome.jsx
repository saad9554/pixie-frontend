import React, { useEffect, useState } from "react";
import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";

export default function AdminHome(props) {
  const [data, setData] = useState([]);
  const [select, setSelect] = useState([]);
  const handleChange = (event, id) => {
    setSelect({ value: event.target.value, id: id });
  };
  useEffect(() => {
    console.log(select);
    fetch("http://localhost:9192/order/" + select.id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: select.value,
      }),
    });
    if (select.value) window.location.reload();
  }, [select]);
  useEffect(() => {
    fetch("http://localhost:9192/order", {
      method: "GET",
    }).then((result) => {
      result.json().then((resp) => {
        setData(resp);
      });
    });
  }, []);
  //   to redirect to login page if admin is not logged in
  if (!localStorage.getItem("isAdmin")) {
    window.open("admin", "_self");
  }
  return (
    <div className="tm-body tm-html">
      <AdminNavbar isActiveHome={props.isActive} />
      <div className="container tm-container">
        <div className="row">
          <div className="col">
            <p className="text-white mt-5 mb-5">
              Welcome back, <b>Admin</b>
            </p>
          </div>
        </div>
        <div className="row tm-content-row">
          <div className="col-12 tm-block-col">
            <div
              className="
                tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll
              "
            >
              <h2 className="tm-block-title">Orders List</h2>
              <table className="tm-table">
                <thead>
                  <tr>
                    <th scope="col">PAYMENT ID</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">Item(s)</th>
                    <th scope="col">Amount</th>
                    <th scope="col">DATE UTC</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                {data && (
                  <tbody>
                    {data &&
                      data.map((x) => (
                        <tr>
                          <th scope="row">
                            <b>{x.payment_id}</b>
                          </th>
                          <td>
                            {x.status}
                            <br />
                            <br />
                            <select
                              name="select"
                              value={select}
                              onChange={(e) => handleChange(e, x.payment_id)}
                            >
                              <option value="">Update status</option>
                              <option value="moving">Moving</option>
                              <option value="pending">Pending</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </td>
                          <td>
                            <b>{x.email}</b>
                          </td>
                          <td>
                            <b>{x.items}</b>
                          </td>
                          <td>
                            <b>${x.amount}</b>
                          </td>
                          <td>{x.date}</td>
                          <td></td>
                        </tr>
                      ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
}
