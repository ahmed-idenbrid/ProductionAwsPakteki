import React, { Component, Fragment } from "react";
import "./allNewsCategories.css";
import SmallNewsComponent from "../NewsComponents/smallNewsComponent";
import BigNewsComponent from "../NewsComponents/bigNewsComponent";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { BaseURL } from "../../../app/common";
import { toast } from "react-toastify";
import { InView } from "react-intersection-observer";

class AllNewsCategories extends Component {
  state = {
    AllNewsData: [],
    chunkIndex: 0,
    mounted: false,
    redirect: false,
  };

  async componentDidMount() {
    await this.getData(this.state.chunkIndex);
  }
  getData = async (chunkIndex) => {
    await axios.get(`${BaseURL}/news/all/${chunkIndex}`).then(async (res) => {
      if (res.data.success && res.data.chunkData) {
        const map = await res.data.chunkData.map((obj) => {
          return this.state.AllNewsData.push(obj);
        });
        this.setState({
          AllNewsData: [...this.state.AllNewsData, map],
          mounted: true,
        });
      }
      if (res.data.message) {
      }
    });
  };
  render() {
    return (
      <Fragment>
        {this.state.AllNewsData.length === 0 && this.state.mounted ? (
          <div
            style={{ height: "78vh", width: "100%" }}
            className="d-flex align-items-center justify-content-center bg-white"
          >
            <h1>No News To Show</h1>
          </div>
        ) : null}
        {this.state.mounted === false ? (
          <div
            style={{ height: "50vh", width: "100%", marginBottom: "100px" }}
            className="d-flex align-items-center justify-content-center"
          >
            <Spinner animation="border" />
          </div>
        ) : (
          this.state.AllNewsData.map((obj, index) => {
            return (
              <Fragment key={index}>
                {obj instanceof Array ? null : index === 0 ||
                  index % 7 === 0 ? (
                  <div
                    onClick={() => {
                      this.setState({
                        redirect: true,
                      });
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
                            this.setState(
                              {
                                redirect: false,
                              },
                              () => {
                                this.props.routerParams.history.push(
                                  `/news/single/${obj._id}`
                                );
                              }
                            );
                          } else {
                            toast.warn("Error Occurred");
                          }
                        });
                    }}
                  >
                    <BigNewsComponent newsObj={obj} />
                  </div>
                ) : (
                  <article
                    onClick={() => {
                      this.setState({
                        redirect: true,
                      });
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
                            this.setState(
                              {
                                redirect: false,
                              },
                              () => {
                                this.props.routerParams.history.push(
                                  `/news/single/${obj._id}`
                                );
                              }
                            );
                          } else {
                            toast.warn("Error Occurred");
                          }
                        });
                    }}
                  >
                    <SmallNewsComponent newsObj={obj} />
                  </article>
                )}
              </Fragment>
            );
          })
        )}
        <InView
          as="div"
          className="LoadingNewsSpinner"
          rootMargin="0px 0px 58px 0px"
          onChange={(inView) => {
            if (inView) {
              this.setState(
                {
                  chunkIndex: this.state.chunkIndex + 1,
                },
                () => {
                  this.getData(this.state.chunkIndex);
                }
              );
            }
          }}
          threshold="0.5"
        >
          <div className="spinnerLoadingNews">
            <Spinner animation="border" />
          </div>
        </InView>

        {this.state.redirect ? (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              position: "fixed",
              height: "100vh",
              width: "100%",
              top: "0",
              opacity: "0.5",
              zIndex: "9",
              backgroundColor: "white",
            }}
          >
            <Spinner animation="border" />
          </div>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}

export default AllNewsCategories;
