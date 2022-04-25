import React, { useState } from "react";

import emailjs from "@emailjs/browser";

export default function Subscribe() {
  const [result, showResult] = useState(false);

  // const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_g41qcwl",
        "template_4b5rjlb",
        e.target,
        "eHpvDndZspF-z_HeX"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
    showResult(true);
  };

  return (
    <div className="subscribe-form">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <div className="line-dec"></div>
              <h1>Subscribe on PIXIE now!</h1>
            </div>
          </div>
          <div className="col-md-8 offset-md-2">
            <div className="main-content">
              <p>Be the first to hear about new product launches!</p>
              <div className="container">
                <form id="subscribe" action="" onSubmit={sendEmail}>
                  <div className="row">
                    <div className="col-md-7">
                      <fieldset>
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                          id="email"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div className="col-md-5">
                      <fieldset>
                        <button
                          type="submit"
                          id="form-submit"
                          className="button"
                        >
                          {result
                            ? "Thanks for subscribing PIXIE"
                            : "Subscribe Now!"}
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
