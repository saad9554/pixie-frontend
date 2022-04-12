import React, { useEffect, useState } from "react";
import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";

export default function AdminAccount(props) {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [pincode, setPincode] = useState();
  const t = {};
  useEffect(() => {
    fetch("http://localhost:9192/user", {
      method: "GET",
    }).then((result) => {
      result.json().then((resp) => {
        setData(resp);
      });
    });
  }, []);
  const updateUser = (id) => {
    if (username != undefined) t.username = username;
    if (password != undefined) t.password = password;
    if (mobile != undefined) t.mobile = mobile;
    if (email != undefined) t.email = email;
    if (address != undefined) t.address = address;
    if (pincode != undefined) t.pincode = pincode;
    console.log(t);
    fetch("http://localhost:9192/user/" + id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(t),
    });
    window.location.reload();
  };
  const deleteUser = (id) => {
    fetch("http://localhost:9192/user/" + id, {
      method: "DELETE",
    }).then(() => alert("User with id " + id + " deleted successfully."));
    window.location.reload();
  };
  return (
    <div className="tm-body tm-html">
      <AdminNavbar isActiveAccount={props.isActive} />
      <div className="container tm-container mt-5">
        <div className="row tm-content-row">
          <div className="col-12 tm-block-col"></div>
        </div>
        <div className="row tm-content-row">
          <div className="tm-block-col tm-col-account-settings">
            <div className="tm-bg-primary-dark tm-block tm-block-settings">
              <h2 className="tm-block-title">Account Settings</h2>
              {data &&
                data.map((x) => (
                  <div
                    className="row"
                    style={{ marginBottom: "80px" }}
                    key={x.id}
                  >
                    <div className="form-group tm-form-group col-md-6">
                      <label for="phone">ID</label>
                      <p style={{ color: "#fff", fontSize: "1.5rem" }}>
                        {x.id}
                      </p>
                    </div>
                    <div className="form-group tm-form-group col-md-6">
                      <label for="name">Account Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control tm-form-control validate"
                        value={username == undefined ? x.username : username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group tm-form-group col-md-6">
                      <label for="email">Account Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control tm-form-control validate"
                        value={email == undefined ? x.email : email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group tm-form-group col-md-6">
                      <label for="password">New Password</label>
                      <input
                        id="password"
                        name="password"
                        type="text"
                        className="form-control tm-form-control validate"
                        value={password == undefined ? x.password : password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group tm-form-group col-md-6">
                      <label for="address">Address</label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        className="form-control tm-form-control validate"
                        value={address == undefined ? x.address : address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="form-group tm-form-group col-md-6">
                      <label for="phone">Phone</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="form-control tm-form-control validate"
                        value={mobile == undefined ? x.mobile : mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                    <div className="form-group tm-form-group col-md-6">
                      <label for="phone">Pincode</label>
                      <input
                        id="pincode"
                        name="pincode"
                        type="text"
                        className="form-control tm-form-control validate"
                        value={pincode == undefined ? x.pincode : pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                    </div>
                    <div className="form-group tm-form-group col-md-6">
                      <label className="tm-hide-sm">&nbsp;</label>
                      <button
                        type="button"
                        className="btn tm-btn btn-primary tm-btn-primary btn-block text-uppercase"
                        onClick={() => updateUser(x.id)}
                      >
                        Update This Profile
                      </button>
                    </div>
                    <div className="col-12">
                      <button
                        type="button"
                        className="btn tm-btn btn-primary tm-btn-primary btn-block text-uppercase"
                        onClick={() => deleteUser(x.id)}
                      >
                        Delete This Account
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
}
