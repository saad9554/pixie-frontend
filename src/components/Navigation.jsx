import React from "react";
import header_logo from "../images/header-logo.png";

export default function Navigation(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={header_logo} alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className={"nav-item " + props.isActiveHome}>
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="about">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact">
                  Contact Us
                </a>
              </li>
              {localStorage.getItem("email") && (
                <li className={"nav-item dropdown" + props.isActivePayment}>
                  <a
                    className="nav-link dropdown-toggle {% block current_history %}{% endblock %}"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Account
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a className="dropdown-item" href="payment-history">
                      Payment History
                    </a>
                    <a className="dropdown-item" href="logout">
                      Logout
                    </a>
                  </div>
                </li>
              )}
              {!localStorage.getItem("email") && (
                <li className={"nav-item " + props.isActiveRegister}>
                  <a className="nav-link" href="register">
                    Register/Login
                  </a>
                </li>
              )}
              {props.show_cart && (
                <li
                  className="nav-item"
                  data-toggle="modal"
                  data-target="#modelId"
                >
                  <a className="nav-link">
                    Cart{" "}
                    <span className="badge badge-primary">
                      {props.cart.length}
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
