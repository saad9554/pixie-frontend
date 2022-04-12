import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";

export default function AdminEditProduct() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const t = {};
  const handleClick = () => {
    if (title != "") t.title = title;
    if (descr != "") t.descr = descr;
    if (price != "") t.price = price;
    if (stock != "") t.stock = stock;
    console.log(t);
    fetch("http://localhost:9192/product/" + id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(t),
    });
    window.location.reload();
  };
  useEffect(() => {
    fetch("http://localhost:9192/product/" + id, {
      method: "GET",
    }).then((result) => {
      result.json().then((resp) => {
        setData(resp);
      });
    });
  }, []);
  return (
    <div className="tm-body tm-html">
      <div className="p-5">
        <a
          href="http://localhost:3000/admin_all_products"
          style={{ color: "#fff" }}
        >
          Go Back
        </a>
      </div>
      <div className="container tm-container tm-mt-big tm-mb-big">
        <div className="row">
          <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <div className="row">
                <div className="col-12">
                  <h2 className="tm-block-title d-inline-block">
                    Edit Product
                  </h2>
                </div>
              </div>
              <div className="row tm-edit-product-row">
                <div className="col-md-12">
                  <div className="form-group tm-form-group mb-3">
                    <label for="name">Title</label>
                    <input
                      type="text"
                      value={title == "" ? data.title : title}
                      className="form-control tm-form-control"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group tm-form-group mb-3">
                    <label for="description">Description</label>
                    <textarea
                      className="form-control tm-form-control tm-small"
                      rows="5"
                      value={descr == "" ? data.descr : descr}
                      onChange={(e) => setDescr(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="form-group tm-form-group mb-3 col-xs-12 col-sm-6">
                      <label for="expire_date">Price</label>
                      <input
                        type="text"
                        value={price == "" ? data.price : price}
                        className="form-control tm-form-control"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="form-group tm-form-group mb-3 col-xs-12 col-sm-6">
                      <label for="stock">Units In Stock</label>
                      <input
                        type="text"
                        value={stock == "" ? data.stock : stock}
                        className="form-control tm-form-control"
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="button"
                    className="btn tm-btn btn-primary tm-btn-primary btn-block text-uppercase"
                    onClick={handleClick}
                  >
                    Update Now
                  </button>
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
