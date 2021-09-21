import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Login.css';
import logo from '../../assets/pakteki-logo.svg';

export default class VerificationCode extends Component {
  render() {
    return (
      <div>
        <form>
          <div className="row m-0 verify-section">
            <div className="col-11 col-md-8 col-lg-6 mx-auto">
              <div className="d-flex align-items-center flex-column">
              <Link to="/">
                  <img height={"73px"}
                    src={logo}
                    className="mb-4"
                    alt="img not found"
                  />
                </Link>
                <input
                  type="text"
                  placeholder="verification code"
                  className="p-2 w-100"
                />
                <Link to="/newpassword" style={{ display: "contents" }}>
                  <button className="btn info btn-block my-4 text-capitalize fw-bolder">
                    next
                  </button>
                </Link>
                <div className="text_medium">
                  <span>Resend verification code</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
