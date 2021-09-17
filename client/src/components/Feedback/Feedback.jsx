import React, { Fragment, Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { BaseURL } from "../../app/common";
import FootBar from "../FootBar/FootBar";
import NavBar from "../NavBar/Navbar";

export default class Feedback extends Component {
  state = {
    emailAddress: "",
    message: "",
  };
  render() {
    return (
      <Fragment>
        <NavBar />
        <div className="bg-white min-h-100 row container d-flex flex-column align-items-center justify-content-center m-0">
          <div className="h4 text-center py-2 col-12">
            Share your feedback with Pakteki
          </div>
          <Form
            className="mt-2 w-100 col-12 col-md-6"
            onSubmit={(e) => {
              e.preventDefault();
              axios.post(BaseURL + "/user/feedback", this.state).then((res) => {
                if (res.data.message === "Success") {
                  toast.success("Feedback Submitted Successfully");
                  this.setState({
                    emailAddress: "",
                    message: "",
                  });
                }
              });
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email Address"
                name="emailAddress"
                value={this.state.emailAddress}
                onChange={(e) => {
                  this.setState({ emailAddress: e.target.value });
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                value={this.state.message}
                placeholder="Enter Message"
                onChange={(e) => {
                  this.setState({ message: e.target.value });
                }}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </div>
        <FootBar />
      </Fragment>
    );
  }
}
