import React from "react";
import { FaHome, FaCrown, FaUser } from "react-icons/fa";
import { FiMonitor } from "react-icons/fi";
import "./FootBar.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default class FootBar extends React.Component {
  state = {
    userData: {},
  };
  componentDidMount() {
    const config = {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };
    axios.get("http://3.142.50.232:5000/api/auth/user", config).then((res) => {
      if (res.data.Message) {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
      } else {
        this.setState(
          {
            userData: res.data,
          },
          () => {
            localStorage.setItem("userData", JSON.stringify(res.data));
          }
        );
      }
    });
  }
  render() {
    return (
      <div className="Footbar-container container d-flex p-0">
        <NavLink
          className="footer-home d-flex flex-column align-items-center"
          activeStyle={{
            color: "#007bff",
            backgroundColor: "rgb(230, 242, 255)",
            borderRadius: "5px",
            padding: "5px 15px",
          }}
          to="/news/all"
        >
          <span className="footbar-item-container d-flex flex-column align-items-center">
            <FaHome className="footbar-icons" />
            <font className="font-size-14">Home</font>
          </span>
        </NavLink>
        <NavLink
          className="footer-home pt-1 d-flex flex-column align-items-center"
          activeStyle={{
            color: "#007bff",
            backgroundColor: "rgb(230, 242, 255)",
            borderRadius: "5px",
            padding: "5px 25px",
          }}
          to="/watch"
        >
          <span className="footbar-item-container d-flex flex-column align-items-center">
            <FiMonitor className="footbar-icons" />
            <font className="font-size-14">Live</font>
          </span>
        </NavLink>
        <NavLink
          className="footer-home d-flex flex-column align-items-center"
          activeStyle={{
            color: "#007bff",
            backgroundColor: "rgb(230, 242, 255)",
            borderRadius: "5px",
            padding: "5px 10px",
          }}
          to="/ranking"
        >
          <span className="footbar-item-container d-flex flex-column align-items-center">
            <FaCrown className="footbar-icons" />
            <font className="font-size-14">Ranking</font>
          </span>
        </NavLink>
        <NavLink
          className="footer-home d-flex flex-column align-items-center"
          activeStyle={{
            color: "#007bff",
            backgroundColor: "rgb(230, 242, 255)",
            borderRadius: "5px",
            padding: "5px 10px",
          }}
          to="/mypage"
        >
          <span className="footbar-item-container d-flex flex-column align-items-center">
            <FaUser className="footbar-icons" />
            <font className="font-size-14">My Page</font>
          </span>
        </NavLink>
      </div>
    );
  }
}
