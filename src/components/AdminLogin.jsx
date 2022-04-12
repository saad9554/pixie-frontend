import React from "react";
import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export default function AdminLogin() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  const onSubmit = (data) => {
    if (data.username == "admin" && data.password == "admin123") {
      localStorage.setItem("isAdmin", true);
      window.open("admin_home", "_self");
    } else {
      alert("Incorrect username or password.");
    }
  };
  return (
    <div className="tm-body tm-html">
      <div className="container tm-container tm-mt-big tm-mb-big">
        <div className="row">
          <div className="col-12 mx-auto tm-login-col">
            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <div className="row">
                <div className="col-12 text-center">
                  <h2 className="tm-block-title mb-4">
                    Welcome to Dashboard, Login
                  </h2>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group tm-form-group">
                      <label for="username">Username</label>
                      <ErrorMessage
                        className="error_message2"
                        errors={errors}
                        name="username"
                        as="p"
                      />
                      <input
                        type="text"
                        {...register("username", {
                          required: {
                            value: true,
                            message: "Username is required",
                          },
                        })}
                        className="form-control tm-form-control"
                      />
                    </div>
                    <div className="form-group tm-form-group mt-3">
                      <label for="password">Password</label>
                      <ErrorMessage
                        className="error_message2"
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
                        className="form-control tm-form-control"
                      />
                    </div>
                    <div className="form-group tm-form-group mt-4">
                      <button
                        type="submit"
                        className="btn tm-btn btn-primary tm-btn-primary btn-block text-uppercase"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
}
