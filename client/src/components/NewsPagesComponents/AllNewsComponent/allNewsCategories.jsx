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
    mounted: false,
    redirect: false,
    limit: 20,
    page: 1
  };

  async componentDidMount() {
    await this.getData(this.state.page, this.state.limit);
  }
  getData = async (page, limit) => {
    await axios.get(`${BaseURL}/news/all/?page=${page}&limit=${limit}`).then((res) => {
      if (res.data.success && res.data.newsData) {
        let allnewsData = res.data.newsData.map((obj) => {
          return this.state.AllNewsData.push(obj)
        })
        this.setState({
          mounted: true,
          AllNewsData: [...this.state.AllNewsData, allnewsData]
        })
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

        {this.state.mounted ? <InView
          as="div"
          className="LoadingNewsSpinner"
          rootMargin="0px 0px 58px 0px"
          onChange={(inView) => {
            if (inView) {
              this.setState(
                {
                  page: this.state.page + 1,
                  limit: this.state.limit + 20,
                },
                () => {
                  this.getData(this.state.page, this.state.limit);
                }
              );
            }
          }}
          threshold="0.5"
        >
          <div className="spinnerLoadingNews">
            <Spinner animation="border" />
          </div>
        </InView> : null}

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
