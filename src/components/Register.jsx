import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import PreHeader from "./PreHeader";
import Subscribe from "./Subscribe";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
let base64 = require("base-64");

export default function Register(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let res = await fetch("http://localhost:9192/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.firstName,
          email: data.email,
          mobile: data.mob_number,
          password: data.password,
          role: "customer",
          address: data.address,
          pincode: data.pincode,
        }),
      });
      // let resJson = res.json();
      if (res.status === 200) {
        alert("User registered. Now please login.");
        reset();
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
    console.log(data);
  };
  return (
    <div>
      <PreHeader />
      <Navigation show_cart={false} isActiveRegister={props.isActive} />
      <div class="contact-page">
        {/* <p class="display-4 text-center" style={{ color: "red" }}>
          User with this email already exists.
        </p> */}
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="section-heading">
                <div class="line-dec"></div>
                <h1>Register</h1>
              </div>
            </div>
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <div class="right-content">
                <div class="container">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="row">
                      <div class="col-md-6">
                        <fieldset>
                          <ErrorMessage
                            className="error_message"
                            errors={errors}
                            name="firstName"
                            as="p"
                          />
                          <input
                            type="text"
                            {...register("firstName", {
                              required: {
                                value: true,
                                message: "Name is required",
                              },
                            })}
                            className="form-control"
                            placeholder="Your name"
                          />
                        </fieldset>
                      </div>
                      <div class="col-md-6">
                        <fieldset>
                          <ErrorMessage
                            className="error_message"
                            errors={errors}
                            name="email"
                            as="p"
                          />
                          <input
                            type="text"
                            {...register("email", {
                              required: {
                                value: true,
                                message: "Email is required",
                              },
                              pattern: {
                                value:
                                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Email is invalid",
                              },
                            })}
                            className="form-control"
                            placeholder="Your email"
                          />
                        </fieldset>
                      </div>
                      <div class="col-md-6">
                        <fieldset>
                          <ErrorMessage
                            className="error_message"
                            errors={errors}
                            name="password"
                            as="p"
                          />
                          <input
                            type="password"
                            {...register("password", {
                              required: {
                                value: true,
                                message: "Password is required",
                              },
                              minLength: {
                                value: 6,
                                message: "Password sholud be of length 6",
                              },
                            })}
                            className="form-control"
                            placeholder="Password (6 characters long)"
                          />
                        </fieldset>
                      </div>
                      <div class="col-md-6">
                        <fieldset>
                          <ErrorMessage
                            className="error_message"
                            errors={errors}
                            name="confirm_password"
                            as="p"
                          />
                          <input
                            type="password"
                            {...register("confirm_password", {
                              required: {
                                value: true,
                                message: "Confirm password is required",
                              },
                              validate: {
                                emailEqual: (value) =>
                                  value === getValues().password ||
                                  "Password do not match",
                              },
                              minLength: {
                                value: 6,
                                message: "Password sholud be of length 6",
                              },
                            })}
                            className="form-control"
                            placeholder="Confirm Password"
                          />
                        </fieldset>
                      </div>
                      <div class="col-md-12">
                        <fieldset>
                          <ErrorMessage
                            className="error_message"
                            errors={errors}
                            name="address"
                            as="p"
                          />
                          <input
                            type="text"
                            {...register("address", {
                              required: {
                                value: true,
                                message: "Address is required",
                              },
                            })}
                            className="form-control"
                            placeholder="Your address"
                          />
                        </fieldset>
                      </div>
                      <div class="col-md-6">
                        <fieldset>
                          <ErrorMessage
                            className="error_message"
                            errors={errors}
                            name="mob_number"
                            as="p"
                          />
                          <input
                            type="text"
                            {...register("mob_number", {
                              required: {
                                value: true,
                                message: "Mobile number is required",
                              },
                              minLength: {
                                value: 10,
                                message:
                                  "Mobile number should be 10 digit long",
                              },
                              pattern: {
                                value:
                                  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                                message: "Only digits allowed in number",
                              },
                            })}
                            className="form-control"
                            placeholder="Your mobile number"
                          />
                        </fieldset>
                      </div>
                      <div class="col-md-6">
                        <fieldset>
                          <ErrorMessage
                            className="error_message"
                            errors={errors}
                            name="pincode"
                            as="p"
                          />
                          <input
                            type="text"
                            {...register("pincode", {
                              required: {
                                value: true,
                                message: "Pincode is required",
                              },
                              minLength: {
                                value: 6,
                                message: "Pincode should be 6 digit long",
                              },
                              pattern: {
                                value: /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/,
                                message: "Only digits allowed in pincode",
                              },
                            })}
                            className="form-control"
                            placeholder="Your pincode"
                          />
                        </fieldset>
                      </div>
                      <div class="col-md-12">
                        <fieldset>
                          <input
                            type="submit"
                            value="register"
                            className="button"
                          />
                          &nbsp;&nbsp;Already a member?{" "}
                          <a href="login">Login</a>
                        </fieldset>
                      </div>
                      <div class="col-md-12">
                        <div class="share">
                          <h6>
                            You can also keep in touch on:
                            <span>
                              <a href="#">
                                <i class="fa fa-facebook"></i>
                              </a>
                              <a href="#">
                                <i class="fa fa-linkedin"></i>
                              </a>
                              <a href="#">
                                <i class="fa fa-twitter"></i>
                              </a>
                            </span>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-3"></div>
          </div>
        </div>
      </div>
      <Subscribe />
      <Footer />
    </div>
  );
}
