import React, { Component, Fragment } from "react";
import "./Mypage.css";
// import { Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { BaseURL } from "../../app/common";
import FootBar from "../FootBar/FootBar";
import SmallNewsComponent from "../NewsPagesComponents/NewsComponents/smallNewsComponent";
import { toast } from "react-toastify";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import NavBar from "../NavBar/Navbar";
import {AiFillSetting} from 'react-icons/ai'

export default class Mypage extends Component {
  state = {
    userHistoryData: [],
    mounted: false,
    userData: {},
    allNewsData: [],
  };

  componentDidMount() {
    if (localStorage.getItem("allNewsData")) {
      this.setState({
        allNewsData: JSON.parse(localStorage.getItem("allNewsData")),
      });
    }
    if (localStorage.getItem("userData")) {
      this.setState(
        {
          userData: JSON.parse(localStorage.getItem("userData")),
        },
        () => {
          axios
            .get(BaseURL + `/news/history/${this.state.userData._id}`)
            .then((response) => {
              if (response.data.length > 0) {
                this.setState({
                  userHistoryData: response.data,
                  mounted: true,
                });
              } else {
                this.setState({
                  mounted: true,
                });
              }
            });
        }
      );
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <Fragment>
        <NavBar history={this.props.history} />
        <div className="row m-0">
          <div className="col-12 pb-2 p-1">
            <img
              src="/assets/images/sidebar_banner.jpg"
              className="sidebar_banner w-100"
              alt="banner"
            />
       
            <div className="row m-0 profile-section p-2">
              <div className="col-2 p-0">
                <img
                  src="https://s.yimg.jp/images/jpnews/cre/comment/all/images/user_icon_color_blue.png"
                  className="profile-img"
                  alt="img not found"
                />
              </div>
              <div className="col-8 p-0">
                <div className="userName ml-2">
                  <div>Username</div>
                  <b>
                    {Object.keys(this.state.userData).length === 0 &&
                    this.state.userData.constructor === Object
                      ? null
                      : this.state.userData.fullName}
                  </b>
                </div>
              </div>
              {/* <Link className="col-2 p-0 userSetting" to="/user/setting">
                Setting
              </Link> */}
              <a className="col-2 p-0 userSetting" href="/user/setting" >
              <AiFillSetting />
              </a>
            </div>
          </div>
          <div className="col-12 p-0">
            <Tabs>
              <TabList>
                <Tab>Recommended</Tab>
                <Tab>History</Tab>
              </TabList>

              <TabPanel style={{ paddingBottom: "60px" }}>
                {this.state.allNewsData.slice(0, 20).map((obj, index) => {
                  return (
                    <div
                      key={index}
                      style={{ cursor: "pointer", width: "100%" }}
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
                    </div>
                  );
                })}
              </TabPanel>

              <TabPanel style={{ paddingBottom: "60px" }}>
                <div className="row m-0">
                  {this.state.userHistoryData.length === 0 &&
                  this.state.mounted ? (
                    <div
                      style={{ height: "70vh", width: "100%" }}
                      className="d-flex align-items-center justify-content-center bg-white"
                    >
                      <h4>No News To Show</h4>
                    </div>
                  ) : null}
                  {this.state.mounted ? (
                    this.state.userHistoryData.map((obj, index) => {
                      return (
                        <div
                          key={index}
                          style={{ cursor: "pointer", width: "100%" }}
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
                        </div>
                      );
                    })
                  ) : (
                    <div
                      style={{
                        height: "50vh",
                        width: "100%",
                      }}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <Spinner animation="border" />
                    </div>
                  )}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
        <FootBar />
      </Fragment>
    );
  }
}
