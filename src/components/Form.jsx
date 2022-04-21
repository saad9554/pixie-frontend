// import React from "react";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Form.css";

const Result = () => {
  return <p>Feedback has been send successfully.Thank You</p>;
};

const Form = () => {
  const [result, showResult] = useState(false);

  // const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_t1lfjrt",
        "template_weo3h4k",
        e.target,
        "uz2pfCkFBdexY5yzu"
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
    <>
      <div class="contactme" id="contact">
        <div class="contactOverlay">
          <div class="container">
            <div class="form">
              <form className="my-form" action="" onSubmit={sendEmail}>
                <div class="formWord">
                  <span>Full Name</span>
                  <br />
                  <input
                    class="input100"
                    type="text"
                    name="fullName"
                    required
                  />
                  <br />
                  <span>Phone Number</span>
                  <br />
                  <input class="input100" type="text" name="phone" required />
                  <br />
                  <span>Enter Email</span>
                  <br />
                  <input class="input100" type="text" name="email" required />
                  <br />
                </div>
                <div class="formWord">
                  <span>Message</span>
                  <br />
                  <textarea name="message" required></textarea>
                  <br />
                  <button>SUBMIT</button>

                  <div class="row">{result ? <Result /> : null}</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Form;
