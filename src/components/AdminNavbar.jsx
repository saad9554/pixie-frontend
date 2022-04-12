import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";

export default function AdminNavbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-xl tm-navbar tm-navbar-expand-xl">
        <div className="container tm-container h-100">
          <a className="navbar-brand tm-navbar-brand" href="index.html">
            <h1 className="tm-site-title mb-0">Product Admin</h1>
          </a>
          <button
            className="navbar-toggler tm-navbar-toggler ml-auto mr-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars tm-nav-icon"></i>
          </button>

          <div
            className="collapse navbar-collapse tm-navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav tm-navbar-nav mx-auto h-100">
              <li className="nav-item tm-nav-item">
                <a
                  className={"nav-link tm-nav-link " + props.isActiveHome}
                  href="admin_home"
                >
                  <i className="fa fa-tachometer" aria-hidden="true"></i>
                  Dashboard
                  <span className="sr-only">(current)</span>
                </a>
              </li>

              <li className="nav-item tm-nav-item">
                <a
                  className={"tm-nav-link " + props.isActiveProduct}
                  href="admin_all_products"
                >
                  <i className="fa fa-shopping-cart"></i>
                  Products
                </a>
              </li>

              <li className="nav-item tm-nav-item">
                <a
                  className={"tm-nav-link " + props.isActiveAccount}
                  href="admin_accounts"
                >
                  <i className="fa fa-user"></i>
                  Accounts
                </a>
              </li>
            </ul>
            <ul className="navbar-nav tm-navbar-nav">
              <li>
                <a href="/" className="tm-nav-link">
                  Website
                </a>{" "}
              </li>
              <li className="nav-item tm-nav-item">
                <a
                  className="tm-a nav-link tm-nav-link d-block"
                  href="admin_logout"
                >
                  Admin, <b>Logout</b>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
