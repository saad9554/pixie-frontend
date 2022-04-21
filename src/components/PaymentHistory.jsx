import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Form from "./Form";
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
              <li>
                <b>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg"
                  >
                    Feedback
                  </button>
                </b>
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
      <div
        class="modal fade bd-example-modal-lg"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Feedback</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
