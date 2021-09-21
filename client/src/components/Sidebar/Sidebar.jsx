import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import forward from '../assets/forward.png';
import IdenridCompanyLogo from '../assets/Logo/idenbridLogo.svg';
import {IoIosArrowForward} from 'react-icons/io'

export default function Sidebar({ history }) {
  function openNav() {
    document.getElementById("myNav").style.width = "100%";
    // document.getElementById('body_scroll').style.overflow = 'hidden'
  }

  function closeNav() {
    document.getElementById("myNav").style.width = "0";
    // document.getElementById('body_scroll').style.overflow = 'scroll'
  }
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    localStorage.getItem("userData")
      ? setUserData(JSON.parse(localStorage.getItem("userData")))
      : setUserData({});
  }, [localStorage.getItem("userData")]);

  const handleLogOut = () => {
    if (localStorage.getItem("token")) {
      closeNav();
      toast.success("Logged out successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      window.location.reload()
      if (history !== undefined) {
        history.push("/login");
      }
    }
  };

  return (
    <React.Fragment>
      <div id="myNav" className="overlay-nav-right d-flex">
        <div
          className="w-100 shadow position-relative"
          onClick={closeNav}
        ></div>
        <div className="overlay-content-right">
          <div>
            <img
              src="/assets/images/sidebar_banner.jpg"
              className="sidebar_banner"
              alt="banner"
            />
          </div>
          <div>
            {/* {Object.keys(userData).length === 0 &&
            userData.constructor === Object ? (
              <Link
                to="/login"
                className="user_name py-2 d-block"
                onClick={closeNav}
              >
                Login
              </Link>
            ) : (
              <div className="py-2">{userData.username}</div>
            )} */}
            <div className="row m-0 p-2">
              {Object.keys(userData).length === 0 &&
                userData.constructor === Object ? 
                <Link onClick={closeNav} className="loginLink" to="/login">Login</Link> : <div className="col-12 p-0 profileInfo">
                <img
                  src="https://s.yimg.jp/images/jpnews/cre/comment/all/images/user_icon_color_blue.png"
                  className="profileImage"
                  alt="img not found"
                />
                <div className="sideBarUserName ml-2">
                  <span>Username:</span>
                  <small>
                    <b>{Object.keys(userData).length === 0 &&
                      userData.constructor === Object
                      ? null
                      : userData.username}</b>
                  </small>
                </div>
              </div>}
            </div>
            <div className="row m-0">
              <div className="col-12 py-3 myPageLink">
              <Link
                className=""
                to="/mypage"
                onClick={closeNav}>
                My page
              </Link>
              <Link to="/login" onClick={closeNav}>
              {userData.username ? '' :  <small className="text-fade">Please login <IoIosArrowForward className='rightArrow' /></small> }
              </Link>
              </div>
              <div className="bgDarkTitle">
                <small>About Pakteki</small>
              </div>
              <Link
                className="pageLinksLight"
                to="/about-us"
                onClick={closeNav}>
                About Us
              </Link>
              <Link
                className="pageLinksLight"
                to="/feedback"
                onClick={closeNav}
              >
                Feedback
              </Link>
              <Link
                className="pageLinksLight"
                to="/news"
                onClick={closeNav}
              >
                News
              </Link>
              <Link
                className="pageLinksLight"
                to="/privacy-policy"
                onClick={closeNav}
              >
                Privacy Policy
              </Link>
              <Link
                className="pageLinksLight"
                to="/terms-condition"
                onClick={closeNav}
              >
                Terms and Conditions
              </Link>
              <div
                className="bgDarkTitle"
                to="/mypage"
              >
                <small>Others</small>
              </div>
              {/*  */}
              <div className="col-12 settingLink">
              <Link
                to="/user/setting"
                onClick={closeNav}>
                Setting
              </Link>
              <Link to="/login" onClick={closeNav}>
              {userData.username ? '' :  <small className="text-fade">Please login <IoIosArrowForward className='rightArrow' /></small> }
              </Link>
              </div>
              {Object.keys(userData).length === 0 &&
                userData.constructor === Object ? null : (
                <div
                  className="handleLogOut"
                  onClick={handleLogOut}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </div>
              )}
              <div className="Companies">
                <a href="https://idenbrid.com" className="m-0 d-block pt-2" rel="noreferrer">
                  <img className="IdenbridCompanyLogo" src={IdenridCompanyLogo} alt="" />
                </a>
                    <b className="titleCompany">IDENBRID INC.</b>
                <small>Operational Company</small>
              </div>
              
              <div className="Companies">
                <a
                  href="#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="m-0"
                >
                  <b>Pakteki</b>
                </a>
                <small>
                  &#169; 2021 All rights reserved
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <i onClick={openNav}>
          <div className="HamburgerMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </i>
      </div>
    </React.Fragment>
  );
}
