import React, { useEffect, useState } from "react";
import MyAlert from "./MyALert";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Circle, Spinner } from "react-spinners-css";
let base64 = require("base-64");

export default function Featured(props) {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  let { cart, setCart } = props;
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState();
  // const [show2, setShow2] = useState(false);
  useEffect(() => {
    fetch("http://localhost:9192/product", {
      method: "GET",
    }).then((result) => {
      result.json().then((resp) => {
        setData(resp);
      });
    });
    setIsLoading(false);
  }, []);
  useEffect(() => {
    if (id != undefined) {
      fetch("http://localhost:9192/product/" + id, {
        method: "GET",
      }).then((result) => {
        result.json().then((resp) => {
          setData2(resp);
        });
      });
    }
  }, [id]);
  const addToCart = (x) => {
    let flag = 0;
    cart.map((x2) => {
      if (x2.cart_item.id === x.id) {
        let t = cart;
        t[t.indexOf(x2)].quantity += 1;
        setCart([...t]);
        flag = 1;
      }
    });
    if (flag == 0) {
      setCart([...cart, { cart_item: x, quantity: 1 }]);
      setTotal(total + x.price);
    }
    setShow(true);
  };
  const calc_total = () => {
    let t = 0;
    cart &&
      cart.map((x) => {
        t += x.cart_item.price * x.quantity;
      });
    setTotal(t);
  };
  // to re calculate total based on cart state change
  useEffect(() => {
    if (cart) calc_total();
  }, [cart]);
  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
      let cart_items = "";
      cart.map((x) => (cart_items += x.cart_item.title + ","));
      try {
        let res = fetch("http://localhost:9192/order", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment_id: orderID,
            email: localStorage.getItem("email"),
            items: cart_items,
            amount: total,
            success: success,
          }),
        });
      } catch (err) {
        console.log(err);
      }
      setCart([]);
      window.open("payment-history", "_self");
    }
  }, [success]);
  // creates a paypal order
  const createOrder = (data2, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Pixie order",
            amount: {
              currency_code: "USD",
              value: total,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };
  // check Approval
  const onApprove = (data2, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };
  //capture likely error
  const onError = (data2, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AbISXjMfW_aHs1mFAhQMCpvfGlfLmc6WTrfaRJNa91nQIDD4gwETPwsKWlQn32kKy53wJnEqITxzneYd",
      }}
    >
      <div className="featured-items">
        <MyAlert show={show} setShow={setShow} />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <div className="line-dec"></div>
                <h1>Featured Items</h1>
              </div>
            </div>
            <div className="col-md-12">
              <div className="text-center">
                {isLoading && <Spinner color="#3A8BCD" />}
              </div>
              {data && (
                <div className="owl-carousel owl-theme">
                  {data &&
                    data.map((x) => (
                      <div key={x.id} className="featured-item">
                        <a>
                          <img
                            src={
                              "http://localhost:9192/product/image1Display?id=" +
                              x.id
                            }
                            alt="Item 1"
                            onClick={() => setId(x.id)}
                            data-toggle="modal"
                            data-target=".bd-example-modal-lg"
                          />
                          <h4>{x.title}</h4>
                          <h6>${x.price}</h6>
                          <span className="stock-left">
                            {x.stock} left on stock
                          </span>
                          <br />
                          <br />
                        </a>
                        <button
                          type="button"
                          className="cart-btn btn btn-outline-primary"
                          onClick={() => addToCart(x)}
                        >
                          Add to cart
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="modelId"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Shopping Cart</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody comment="item goes here">
                  {cart &&
                    cart.map((x) => (
                      <tr>
                        <td>{x.cart_item.title}</td>
                        <td>
                          <i
                            className="fa fa-minus-circle p-2"
                            onClick={() => {
                              let t = cart;
                              if (t[t.indexOf(x)].quantity != 0)
                                t[t.indexOf(x)].quantity -= 1;
                              setCart([...t]);
                              calc_total();
                            }}
                            aria-hidden="true"
                          ></i>
                          <span className="item-quantity">{x.quantity}</span>
                          <i
                            className="fa fa-plus-circle p-2"
                            aria-hidden="true"
                            onClick={() => {
                              let t = cart;
                              t[t.indexOf(x)].quantity += 1;
                              setCart([...t]);
                              calc_total();
                            }}
                          ></i>
                        </td>
                        <td>${x.cart_item.price}</td>
                        <td>
                          <i
                            className="fa fa-times-circle p-2"
                            onClick={() => {
                              let t = cart.filter(
                                (x2) => x2.cart_item.id !== x.cart_item.id
                              );
                              setCart(t);
                            }}
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot comment="sum of all cart elemets">
                  <tr>
                    <td></td>
                    <td>
                      <b>Total</b>
                    </td>
                    <td>${total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              {localStorage.getItem("email") && (
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  forceReRender={[total]}
                />
              )}
              {!localStorage.getItem("email") && (
                <a href="login">
                  <button type="button" className="btn btn-primary">
                    Login to Checkout
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
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
              <h5 class="modal-title">Single Product</h5>
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
              <div className="single-product">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="section-heading">
                        <div className="line-dec"></div>
                        <h1>Single Product</h1>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="product-slider">
                        <div id="slider" className="flexslider">
                          <ul className="slides">
                            <li>
                              <img
                                src={
                                  "http://localhost:9192/product/image1Display?id=" +
                                  data2.id
                                }
                                alt="image1"
                              />
                            </li>
                            <li>
                              <img
                                src={
                                  "http://localhost:9192/product/image2Display?id=" +
                                  data2.id
                                }
                              />
                            </li>
                            <li>
                              <img
                                src={
                                  "http://localhost:9192/product/image3Display?id=" +
                                  data2.id
                                }
                              />
                            </li>
                          </ul>
                        </div>
                        <div id="carousel" className="flexslider">
                          <ul className="slides">
                            <li>
                              <img
                                src={
                                  "http://localhost:9192/product/image1Display?id=" +
                                  data2.id
                                }
                              />
                            </li>
                            <li>
                              <img
                                src={
                                  "http://localhost:9192/product/image2Display?id=" +
                                  data2.id
                                }
                              />
                            </li>
                            <li>
                              <img
                                src={
                                  "http://localhost:9192/product/image3Display?id=" +
                                  data2.id
                                }
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="right-content" id="{{ data21.item_id }}">
                        <h4>{data2.title}</h4>
                        <h6>${data2.price}</h6>
                        <p>{data2.descr}</p>
                        <span className="stock-left">
                          {data2.stock} left on stock
                        </span>
                        <br />
                        <br />
                        <input
                          type="button"
                          className="button"
                          value="Add to Cart"
                          onClick={() => addToCart(data2)}
                        />
                        <div className="down-content">
                          <div className="share">
                            <h6>
                              Share:
                              <span>
                                <a href="#">
                                  <i className="fa fa-facebook"></i>
                                </a>
                                <a href="#">
                                  <i className="fa fa-linkedin"></i>
                                </a>
                                <a href="#">
                                  <i className="fa fa-twitter"></i>
                                </a>
                              </span>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
