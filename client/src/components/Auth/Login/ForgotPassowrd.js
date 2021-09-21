import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/pakteki-logo.svg';
import './Login.css';
import FootBar from "../../FootBar/FootBar";
import Navbar from "../../NavBar/Navbar";
export default class ForgotPassowrd extends Component {
  render() {
    return (
      <div className="">
        <Navbar />
        <form>
          <div className="row m-0 forgot-section">
            <div className="col-11 col-md-8 col-lg-6 mx-auto mb-13">
              <div className="d-flex flex-column">
                <div className="align-items-center mx-auto">
                <Link to="/">
                  <img height={"73px"}
                    src={logo}
                    className="mb-4"
                    alt="img not found"
                  />
                </Link>
                </div>
                <div className="text-left mb-4">Recover with your Email</div>
                <input type="text" placeholder="Email" className="p-2 mb-2" />
                <Link to="/verificationcode">
                  <button className="btn info btn-block my-4 text-capitalize fw-bolder">
                    Submit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </form>
        <FootBar />
      </div>
      
    );
  }
}
