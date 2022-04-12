import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";

export default function AdminAddProduct(props) {
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [file1, setFile1] = useState();
  const [preview1, setPreview1] = useState();
  const [file2, setFile2] = useState();
  const [preview2, setPreview2] = useState();
  const [file3, setFile3] = useState();
  const [preview3, setPreview3] = useState();
  useEffect(() => {
    if (file1 != undefined) {
      setPreview1(URL.createObjectURL(file1));
    }
  }, [file1]);
  useEffect(() => {
    if (file2 != undefined) setPreview2(URL.createObjectURL(file2));
  }, [file2]);
  useEffect(() => {
    if (file3 != undefined) setPreview3(URL.createObjectURL(file3));
  }, [file3]);
  const buttonClicked = () => {
    const data = new FormData();
    data.append("file1", file1);
    data.append("file2", file2);
    data.append("file3", file3);
    console.log(
      JSON.stringify({
        descr: descr,
        price: parseFloat(price),
        title: title,
        stock: parseInt(stock),
      })
    );
    data.append(
      "p",
      new Blob(
        [
          JSON.stringify({
            descr: descr,
            price: price,
            title: title,
            stock: stock,
          }),
        ],
        { type: "application/json" }
      )
    );
    fetch("http://localhost:9192/product/create", {
      method: "POST",
      body: data,
    });
    alert("Product added successfully");
    window.open("admin_all_products");
  };
  return (
    <div className="tm-body tm-html">
      <AdminNavbar isActiveProduct={props.isActive} />
      <div className="container tm-container tm-mt-big tm-mb-big">
        <div className="row">
          <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <div className="row">
                <div className="col-12">
                  <h2 className="tm-block-title d-inline-block">Add Product</h2>
                </div>
              </div>
              <div className="row tm-edit-product-row">
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="form-group tm-from-graoup mb-3">
                    <label for="name">Title</label>
                    <input
                      id="name"
                      name="item_title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-control tm-form-control"
                    />
                  </div>
                  <div className="form-group tm-from-graoup mb-3">
                    <label for="description">Description</label>
                    <textarea
                      className="form-control tm-form-control validate tm-small"
                      id="description"
                      name="item_desc"
                      value={descr}
                      onChange={(e) => setDescr(e.target.value)}
                      rows="5"
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="form-group tm-from-graoup mb-3 col-xs-12 col-sm-6">
                      <label for="expire_date">Price</label>
                      <input
                        id="expire_date"
                        name="item_price"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control tm-form-control validate"
                        data-large-mode="true"
                      />
                    </div>
                    <div className="form-group tm-from-graoup mb-3 col-xs-12 col-sm-6">
                      <label for="stock">Units In Stock</label>
                      <input
                        id="stock"
                        name="item_stock"
                        type="text"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="form-control tm-form-control validate"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
                  <div className="tm-product-img-dummy mx-auto">
                    <img
                      src={preview1}
                      id="output"
                      alt="Product image1"
                      className="img-fluid d-block mx-auto"
                    />
                    <i
                      className="fas fa-cloud-upload-alt tm-upload-icon"
                      onclick="document.getElementById('fileInput').click();"
                    ></i>
                  </div>
                  <div className="custom-file mt-3 mb-3">
                    <input
                      id="fileInput"
                      name="item_pic1"
                      required
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setFile1(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="tm-product-img-dummy mx-auto">
                    <img
                      src={preview2}
                      id="output2"
                      alt="Product image2"
                      className="img-fluid d-block mx-auto"
                    />
                    <i
                      className="fas fa-cloud-upload-alt tm-upload-icon"
                      onclick="document.getElementById('fileInput2').click();"
                    ></i>
                  </div>
                  <div className="custom-file mt-3 mb-3">
                    <input
                      id="fileInput2"
                      name="item_pic2"
                      required
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile2(e.target.files[0])}
                    />
                  </div>
                  <div className="tm-product-img-dummy mx-auto">
                    <img
                      src={preview3}
                      id="output3"
                      alt="Product image3"
                      className="img-fluid d-block mx-auto"
                    />
                    <i
                      className="fas fa-cloud-upload-alt tm-upload-icon"
                      onclick="document.getElementById('fileInput3').click();"
                    ></i>
                  </div>
                  <div className="custom-file mt-3 mb-3">
                    <input
                      id="fileInput3"
                      name="item_pic3"
                      required
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile3(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="button"
                    onClick={buttonClicked}
                    className="btn tm-btn btn-primary tm-btn-primary btn-block text-uppercase"
                  >
                    Add Now
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
