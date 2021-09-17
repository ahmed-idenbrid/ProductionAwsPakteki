import React, { Component, Fragment } from "react";
import SmallNewsComponent from "../NewsComponents/smallNewsComponent";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { BaseURL } from "../../../app/common";
import { toast } from "react-toastify";
import { InView } from "react-intersection-observer";

class BusinessNews extends Component {
  state = {
    NewsData: [],
    mounted: false,
    chunkIndex: 0,
  };

  componentDidMount() {
    this.getData(this.state.chunkIndex);
  }
  getData = (chunkIndex) => {
    axios
      .get(`${BaseURL}/news/all/getCategoryNews/${chunkIndex}`, {
        headers: {
          newsCategoryName: "Business",
        },
      })
      .then(async (res) => {
        if (res.data.success && res.data.chunkData) {
          const map = await res.data.chunkData.map((chunk) => {
            return this.state.NewsData.push(chunk);
          });
          this.setState({
            NewsData: [...this.state.NewsData, map],
            mounted: true,
          });
        }
      });
  };

  render() {
    return (
      <Fragment>
        {this.state.NewsData.length === 0 && this.state.mounted ? (
          <div
            style={{ height: "78vh", width: "100%" }}
            className="d-flex align-items-center justify-content-center bg-white"
          >
            <h1>No News To Show</h1>
          </div>
        ) : null}
        {this.state.mounted === false ? (
          <div
            style={{ height: "50vh", width: "100%" }}
            className="d-flex align-items-center justify-content-center"
          >
            <Spinner animation="border" />
          </div>
        ) : (
          this.state.NewsData.map((obj, index) => {
            return (
              <Fragment key={index}>
                {obj instanceof Array ? null : (
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
                )}
              </Fragment>
            );
          })
        )}
        <InView
          as="div"
          style={{
            padding: "20px 0px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          rootMargin="0px"
          threshold="0.3"
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
        >
          <Spinner animation="border" />
        </InView>
      </Fragment>
    );
  }
}

export default BusinessNews;
