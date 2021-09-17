import React, { Component } from "react";
import "./NavBar.css";
import SideBar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";
import logo from "../assets/pakteki-logo.svg";

export default class Navbar extends Component {
  state = {
    show: false,
  };
  componentDidMount() {
    document.querySelector(".navbar").classList.value =
      "navbar row m-0 w-100 justify-content-between align-items-center";
  }

  render() {
    return (
      <React.Fragment>
        <div className="row m-0">
          <div
            id="fixed-tabsBar"
            className="navbar row m-0 w-100 justify-content-between align-items-center"
          >
            <div className="col-4 px-0">
              <Link to="/">
                <img
                  style={{ height: "40px" }}
                  src={logo}
                  className="img-fluid"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="col-1 px-0">
              <div className="d-flex align-items-center justify-content-end">
                {/* <i className="fas fa-search search_icon pr-3"></i>
        f        <i className="fas fa-bell notification_icon pr-2 pt-1"></i> */}
                <SideBar history={this.props.history} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
