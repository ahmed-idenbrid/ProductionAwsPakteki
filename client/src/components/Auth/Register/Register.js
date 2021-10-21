import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Register.css";
import logo from "../../assets/pakteki-logo.svg";
import FootBar from "../../FootBar/FootBar";
import Navbar from "../../NavBar/Navbar";

export default class Register extends Component {
  state = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPass) {
      axios
        .post("http://localhost:5000/api/auth/register", {
          fullName: this.state.fullName,
          username: this.state.username,
          emailAddress: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          if (res.data.Message === "Success") {
            toast.success("Registration Successful");
            axios
              .post("http://localhost:5000/api/auth/login", {
                emailAddress: this.state.email,
                password: this.state.password,
              })
              .then((res) => {
                if (res.data.Message === "Success") {
                  // toast.success("Login Successful");
                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem(
                    "userData",
                    JSON.stringify(res.data.userData)
                  );
                  this.props.history.push("/news/all");
                } else {
                  toast.warn(`Error:${res.data.Message}`);
                }
              });
            // this.props.history.push("/login");
          } else {
            toast.warn(`Error:${res.data.Message}`);
          }
        });
    } else {
      toast.info("Password Not Match");
    }
  };

  handleChangeType = (e) => {
    var menu = document.querySelector(".fa-eye");
    menu.classList.toggle("fa-eye-slash");
    const password = document.querySelector("#password_input");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    const _confirm_password_input = document.querySelector(
      "#_confirm_password_input"
    );
    const type1 =
      _confirm_password_input.getAttribute("type") === "password"
        ? "text"
        : "password";
    _confirm_password_input.setAttribute("type", type1);
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <Navbar />
        <div className="pb-3">
          <form onSubmit={this.handleSubmit} className="w-100">
            <div className="row m-0 register-section">
              <div className="col-11 col-md-8 col-lg-8 mx-auto">
                <div className="d-flex flex-column">
                  <div className="align-items-center mx-auto">
                    <Link to="/">
                      <img
                        height={"73px"}
                        src={logo}
                        className="mb-4"
                        alt="img not found"
                      />{" "}
                      {/* <h5 className="my-3 pl-0 brand-name">Pakteki</h5> */}{" "}
                    </Link>{" "}
                  </div>{" "}
                  <div className="text-left mb-2">
                    ID registration with Email{" "}
                  </div>{" "}
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    className="p-2 mb-2"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Enter Username / Comment name"
                    className="p-2 mb-2"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="p-2 mb-2"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required
                  />
                  <div className="w-100 d-flex align-items-center position-relative">
                    <input
                      id="password_input"
                      pattern=".{8,}"
                      type="password"
                      placeholder="Password"
                      className="p-2 mb-2 w-100"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      required
                    />
                    <i
                      className="eyeicon far fa-eye"
                      onClick={this.handleChangeType}
                    ></i>{" "}
                  </div>
                  <li className="w-100 d-flex align-items-center position-relative">
                    <input
                      id="_confirm_password_input"
                      pattern=".{8,}"
                      type="password"
                      placeholder="Re-type password"
                      className="p-2 w-100"
                      name="confirmPass"
                      value={this.state.confirmPass}
                      onChange={this.handleInputChange}
                      required
                    />
                  </li>{" "}
                  <button className="btn info my-4 text-capitalize fw-bolder">
                    Register{" "}
                  </button>{" "}
                  <Link to="/login" className="text-center info">
                    if you already have an account.. ?
                  </Link>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </form>{" "}
        </div>{" "}
        <FootBar />
      </Fragment>
    );
  }
}
