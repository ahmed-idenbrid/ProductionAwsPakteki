import React from "react";
import "./Categorybar.css";
import { Link } from "react-router-dom";
export default function Categorybar({ pathname, history }) {
  function openNav() {
    document.getElementById("myNavcat").style.right = "0";
    // document.getElementById('body_scroll').style.overflow = 'hidden'
  }

  function closeNav() {
    document.getElementById("myNavcat").style.right = "100%";
    // document.getElementById('body_scroll').style.overflow = 'scroll'
  }
  return (
    <React.Fragment>
      <div id="myNavcat" className="overlay d-flex">
        <div className="overlay-content">
          <div className="">
            News Categories
            <div className="row m-0">
              <Link
                to="/"
                className="col-12 border-light-color py-2 text-left"
                onClick={closeNav}
              >
                All News
              </Link>
              <Link
                className="col-12 border-light-color py-2 text-left"
                to="/ranking/Entertainment"
                onClick={closeNav}
              >
                Entertainment
              </Link>
              <Link
                className="col-12 border-light-color py-2 text-left"
                to="/ranking/Sports"
                onClick={closeNav}
              >
                Sports
              </Link>
              <Link
                className="col-12 border-light-color py-2 text-left"
                to="/ranking/Health"
                onClick={closeNav}
              >
                Health
              </Link>
              <Link
                className="col-12 border-light-color py-2 text-left"
                to="/ranking/National-Local"
                onClick={closeNav}
              >
                NATIONAL-LOCAL
              </Link>
              <Link
                className="col-12 border-light-color py-2 text-left"
                to="/ranking/International"
                onClick={closeNav}
              >
                INTERNATIONAL
              </Link>
              <Link
                className="col-12 border-light-color py-2 text-left"
                to="/ranking/Business"
                onClick={closeNav}
              >
                BUSINESS
              </Link>
              <Link
                className="col-12 border-light-color py-2 text-left"
                to="/ranking/IT-Science"
                onClick={closeNav}
              >
                IT/SCIENCES
              </Link>
              <Link
                className="col-12 border-light-color py-2 text-left"
                to="/ranking/Food"
                onClick={closeNav}
              >
                GOURMENT
              </Link>
              <Link
                className="col-12 border-light-color py-2 text-left"
                to="/ranking/Fashion"
                onClick={closeNav}
              >
                FASHION
              </Link>
              <Link
                className="col-12 border-light-color py-2 text-left"
                to="/ranking/Blog"
                onClick={closeNav}
              >
                WRITER
              </Link>
            </div>
          </div>
        </div>
        <div
          className="w-100 shadow position-relative"
          onClick={closeNav}
        ></div>
      </div>
      <div>
        <div className="col-12 py-2 ranking-container-heading">
          <span
            onClick={openNav}
            style={{ cursor: "pointer", padding: "6px 28px" }}
          >
            Category {'>'}
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (pathname !== "/ranking") {
                history.push("/ranking");
              }
            }}
          >
            Top ranking
          </span>
        </div>
 
      </div>
    </React.Fragment>
  );
}
