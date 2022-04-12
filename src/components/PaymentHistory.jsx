import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import PreHeader from "./PreHeader";
import Subscribe from "./Subscribe";

export default function PaymentHistory(props) {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    fetch("http://localhost:9192/order/" + localStorage.getItem("email"), {
      method: "GET",
    })
      .then((result) => {
        result.json().then((resp) => {
          if (resp.length == 0) {
            setText(
              <div>
                <PreHeader />
                <Navigation
                  show_cart={false}
                  isActivePayment={props.isActive}
                />
                <p className="p-5 text-center" style={{ margin: "30px" }}>
                  You havn't purchased anything.
                </p>
                <Subscribe />
                <Footer />
              </div>
            );
          }
          setData(resp);
        });
      })
      .catch((err) => {
        alert("Failed to fetch");
        console.log(err);
      });
  }, []);
  if (text != "") return text;
  return (
    <div>
      <PreHeader />
      <Navigation show_cart={false} />
      <p className="display-4 p-4 text-center" style={{ margin: "30px" }}>
        Payment History
      </p>

      {data &&
        data.map((x) => (
          <div>
            <ul>
              <li>
                <b>Payement ID:</b> {x.payment_id}
              </li>
              <li>
                <b>Item Name(s):</b> {x.items}
              </li>
              <li>
                <b>Amount:</b> ${x.amount}
              </li>
              <li>
                <b>Date and time (UTC):</b> {x.date}
              </li>
              <li>
                <b>Status:</b> {x.status}
              </li>
            </ul>
            <hr
              style={{
                height: "1px",
                border: "none",
                color: "#333",
                backgroundColor: "#333",
                width: "90%",
              }}
            />
          </div>
        ))}
      <Subscribe />
      <Footer />
    </div>
  );
}
