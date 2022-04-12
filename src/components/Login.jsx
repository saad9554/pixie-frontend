import React, { useEffect } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import PreHeader from "./PreHeader";
import Subscribe from "./Subscribe";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { propTypes } from "react-bootstrap/esm/Image";

export default function Login(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let res = await fetch("http://localhost:9192/user/" + data.email, {
        method: "GET",
      });
      try {
        let resJson = await res.json();
        if (res.status === 200) {
          if (resJson.password !== data.password) {
            alert("Password is incorrect");
          } else {
            localStorage.setItem("email", data.email);
            alert("Login successfull");
            window.open("/", "_self");
          }
        }
      } catch (err) {
        alert("User with this email does not exist");
      }
    } catch (err) {
      console.log(err);
    }
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
                <h1>Login</h1>
              </div>
            </div>
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <div class="right-content">
                <div class="container">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="row">
                      <div class="col-md-12">
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
                      <div class="col-md-12">
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
                      <div class="col-md-12">
                        <fieldset>
                          <input
                            type="submit"
                            value="login"
                            className="button"
                          />
                          &nbsp;&nbsp;Not a member?{" "}
                          <a href="register">Register</a>
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
