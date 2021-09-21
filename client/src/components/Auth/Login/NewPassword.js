import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Login.css';
import logo from '../../assets/pakteki-logo.svg';
export default class NewPassword extends Component {
  render() {
    return (
      <div>
        <form>
          <div className="row m-0 update-section">
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
                  placeholder="new password"
                  className="p-2 mb-4 w-100"
                />
                <input
                  type="text"
                  placeholder="confirm new password"
                  className="p-2 w-100"
                />
                <Link to="/login" style={{ display: "contents" }}>
                  <button className="btn info btn-block my-4 text-capitalize fw-bolder">
                    Update
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
