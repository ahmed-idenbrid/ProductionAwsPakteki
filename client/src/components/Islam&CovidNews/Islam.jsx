import React, { Component, Fragment } from "react";
import SmallNewsComponent from "../NewsPagesComponents/NewsComponents/smallNewsComponent";
import { Spinner } from "react-bootstrap";
import FootBar from "../FootBar/FootBar";
import { BaseURL } from "../../app/common";
import axios from "axios";
import { toast } from "react-toastify";
import NavBar from "../NavBar/Navbar";

class Islam extends Component {
  state = {
    NewsData: [],
    mounted: false,
    userId: "",
  };

  componentDidMount() {
    if (localStorage.getItem("allNewsData")) {
      this.setState({
        NewsData: this.props.allNewsData,
        mounted: true,
      });
    }
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
            userId: res.data._id,
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
      <Fragment>
        <NavBar />
        {this.state.mounted === false ? (
          <div
            style={{ height: "50vh", width: "100%" }}
            className="d-flex align-items-center justify-content-center"
          >
            <Spinner animation="border" />
          </div>
        ) : (
          this.state.NewsData.map((obj, index) => {
            return obj.category === "Local" ? (
              <Fragment key={index}>
                <article
                  className="row m-0 p-0 single_article"
                  onClick={() => {
                    axios
                      .post(BaseURL + "/news/increaseViews", {
                        newsId: obj._id,
                        userId:
                          this.props.userData._id === ""
                            ? ""
                            : this.props.userData._id,
                      })
                      .then((res) => {
                        if (res.data.success) {
                          this.props.routerParams.history.push(
                            `/news/single/${obj._id}`
                          );
                        } else {
                          toast.warn("Error Occurred");
                        }
                      });
                  }}
                >
                  <SmallNewsComponent newsObj={obj} />
                </article>
              </Fragment>
            ) : null;
          })
        )}
        <FootBar />
      </Fragment>
    );
  }
}

export default Islam;
