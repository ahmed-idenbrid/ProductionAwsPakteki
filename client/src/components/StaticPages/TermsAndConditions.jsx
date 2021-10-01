import React, { Fragment, Component } from "react";
import "./static_pages_style.css";
import FootBar from "../FootBar/FootBar";
import NavBar from "../NavBar/Navbar";

export default class termsAndconditions extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <div className="container bg-white min-h-100 pb-5">
          <div className="pt-3 h4 my-2">Terms &amp; Conditions</div>
          <p className="mt-1">
            <b>1.</b>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Sit laboriosam voluptatum minima delectus beatae odit possimus
            assumenda quas, alias asperiores, commodi provident nam, cum quis
            repellat iure vero deserunt a.
          </p>
          <p className="mt-1">
            <b>2.</b>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Sit laboriosam voluptatum minima delectus beatae odit possimus
            assumenda quas, alias asperiores, commodi provident nam, cum quis
            repellat iure vero deserunt a.
          </p>
          <p className="mt-1">
            <b>3.</b>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Sit laboriosam voluptatum minima delectus beatae odit possimus
            assumenda quas, alias asperiores, commodi provident nam, cum quis
            repellat iure vero deserunt a.
          </p>
          <p className="mt-1">
            <b>4.</b>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Sit laboriosam voluptatum minima delectus beatae odit possimus
            assumenda quas, alias asperiores, commodi provident nam, cum quis
            repellat iure vero deserunt a.
          </p>
        </div>
        <FootBar />
      </Fragment>
    );
  }
}
