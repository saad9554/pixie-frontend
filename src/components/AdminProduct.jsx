import React, { useEffect, useState } from "react";
import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";

export default function AdminProduct(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9192/product", {
      method: "GET",
    }).then((result) => {
      result.json().then((resp) => {
        setData(resp);
      });
    });
  }, []);
  const delete_product = (event, id) => {
    fetch("http://localhost:9192/product/" + id, {
      method: "DELETE",
    }).then(() => alert("Item with id " + id + " deleted successfully."));
    window.location.reload();
  };
  return (
    <div className="tm-body tm-html">
      <AdminNavbar isActiveProduct={props.isActive} />
      <div className="container tm-container mt-5">
        <div className="row tm-content-row">
          <div className="col-sm-12 col-md-12 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-products">
              <div className="row">
                <div className="col-12">
                  <h2 className="tm-block-title d-inline-block">
                    Click title to edit a product
                  </h2>
                </div>
              </div>
              <div className="tm-product-table-container">
                <table className="table tm-table table-hover tm-table-hover tm-table-small tm-product-table">
                  <thead>
                    <tr>
                      <th scope="col">Product ID</th>
                      <th scope="col">Title</th>
                      <th scope="col">Price</th>
                      <th scope="col">IN STOCK</th>
                      <th scope="col">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((x) => (
                        <tr>
                          <td>{x.id}</td>
                          <td className="tm-product-name">
                            <a
                              href={"admin_edit_product/" + x.id}
                              style={{ color: "white", cursor: "pointer" }}
                            >
                              {x.title}
                            </a>
                          </td>
                          <td>${x.price}</td>
                          <td>{x.stock}</td>
                          <td>
                            <a
                              onClick={(e) => delete_product(e, x.id)}
                              className="tm-product-delete-link"
                            >
                              <i
                                className="fa fa-trash tm-product-delete-icon"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <a
                href="admin_add_product"
                className="btn tm-btn btn-primary tm-btn-primary btn-block text-uppercase mb-3"
              >
                Add new product
              </a>
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
}
