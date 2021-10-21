import React, { Fragment, Component } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { BaseURL } from "../../app/common";
import FootBar from "../FootBar/FootBar";
import SmallNewsComponent from "../NewsPagesComponents/NewsComponents/smallNewsComponent";
import { toast } from "react-toastify";
import NavBar from "../NavBar/Navbar";

export default class ChannelNews extends Component {
  state = {
    channelNewsData: [],
    mounted: false,
    userId: "",
  };
  componentDidMount() {
    axios.get(`${BaseURL}/news/all`).then((res) => {
      const channelNews = res.data.newsData.filter((obj) => {
        return obj.channel === this.props.routerParams.match.params.channelName;
      });
      this.setState(
        {
          channelNewsData: channelNews,
        },
        () => {
          this.setState({
            mounted: true,
          });
        }
      );
    });

    const config = {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };
    axios.get("hhttp://localhost:5000/api/auth/user", config).then((res) => {
      if (res.data.Message) {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
      } else {
        localStorage.setItem("userData", JSON.stringify(res.data));
        this.setState({
          userId: res.data._id,
        });
      }
    });
  }
  render() {
    return (
      <Fragment>
        <NavBar />
        {this.state.channelNewsData.length === 0 && this.state.mounted ? (
          <div
            style={{ height: "85vh", width: "100%" }}
            className="d-flex align-items-center justify-content-center bg-white"
          >
            <h4 className="text-center">No News To Show</h4>
          </div>
        ) : null}
        {this.state.mounted ? (
          <div style={{ paddingBottom: "60px" }}>
            {this.state.channelNewsData.map((obj, index) => {
              return (
                <article
                  key={index}
                  className="row m-0 p-0 single_article"
                  onClick={() => {
                    axios
                      .post(BaseURL + "/news/increaseViews", {
                        newsId: obj._id,
                        userId:
                          this.state.userId === "" ? "" : this.state.userId,
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
              );
            })}
          </div>
        ) : (
          <div
            style={{ height: "50vh", width: "100%", marginBottom: "100px" }}
            className="d-flex align-items-center justify-content-center"
          >
            <Spinner animation="border" />
          </div>
        )}
        <FootBar />
      </Fragment>
    );
  }
}
