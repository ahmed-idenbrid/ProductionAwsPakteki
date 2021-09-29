import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../assets/pakteki-logo.svg";
import FootBar from "../../FootBar/FootBar";
import Navbar from "../../NavBar/Navbar";

export default class Login extends Component {
  state = { email: "", password: "" };

  componentDidMount() {
    if (localStorage.getItem("userData")) {
      this.props.history.push("/news/all");
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://3.142.50.232:5000/api/auth/login", {
        emailAddress: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        if (res.data.Message === "Success") {
          // toast.success("Login Successful");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userData", JSON.stringify(res.data.userData));
          this.props.history.push("/news/all");
        } else {
          toast.warn(`Error:${res.data.Message}`);
        }
      });
  };

  handleChangeType = (e) => {
    var menu = document.querySelector(".fa-eye");
    menu.classList.toggle("fa-eye-slash");
    const password = document.querySelector("#password_input");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="login-section">
          <form onSubmit={this.handleSubmit} className="w-100">
            <div className="row m-0 w-100 justify-content-center">
              <div className="col-11 col-md-8 col-lg-6">
                <div className="d-flex align-items-center flex-column">
                  <Link to="/">
                    <img
                      height={"73px"}
                      src={logo}
                      className="mb-4"
                      alt="img not found"
                    />
                  </Link>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-100 text_medium p-2"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required
                  />
                  <li className="w-100 d-flex align-items-center position-relative">
                    <input
                      type="password"
                      pattern=".{8,}"
                      id="password_input"
                      placeholder="Password"
                      className="w-100 p-2 my-2"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      required
                    />
                    <i
                      className="eyeicon far fa-eye"
                      onClick={this.handleChangeType}
                    ></i>
                  </li>
                  <button
                    className="btn info w-100 mt-4 text-capitalize"
                    type="submit">
                    Login
                  </button>
                  <span className="py-2 pt-3">OR</span>
                  <div className="d-flex flex-column mt-2">
                    <Link to="/forgotpassword" className="my-links">
                      Forgot Your Password.?
                    </Link>
                    <Link to="/register" className="my-links">
                      Create New Account..?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <FootBar />
      </React.Fragment>
    );
  }
}
