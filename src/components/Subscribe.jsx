import React from "react";

export default function Subscribe() {
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
                <form id="subscribe" action="" method="get">
                  <div className="row">
                    <div className="col-md-7">
                      <fieldset>
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                          id="email"
                          onfocus="if(this.value == 'Your Email...') { this.value = ''; }"
                          onBlur="if(this.value == '') { this.value = 'Your Email...';}"
                          value="Your Email..."
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
                          Subscribe Now!
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
