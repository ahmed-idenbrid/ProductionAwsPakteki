import React, { Component, Fragment } from "react";
import "./Ranking.css";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import CategoryBar from "../CategoryBar/Categorybar";
import { BaseURL } from "../../app/common";
import NewsRanked from "./NewsRanked";
import FootBar from "../FootBar/FootBar";
import NavBar from "../NavBar/Navbar";
import { toast } from "react-toastify";

export default class Ranking extends Component {
  state = {
    AllRankingNews: [],
    mounted: false,
    userId: "",
  };
  
  componentDidMount() {
    axios.get(BaseURL + "/news/rankedNews").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          AllRankingNews: response.data,
          mounted: true,
        });
      } else {
        this.setState({
          mounted: true,
        });
      }
    });
    const config = {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };
    axios.get("http://3.142.50.232:5000/api/auth/user", config).then((res) => {
      console.log(res);
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
    console.log(this.state.AllRankingNews);
    return (
      <Fragment>
        <NavBar />
        <CategoryBar
          pathname={this.props.location.pathname}
          history={this.props.history}
        />
        <div style={{ paddingBottom: "90px" }}>
          {this.state.AllRankingNews.length === 0 && this.state.mounted ? (
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
            this.state.AllRankingNews.splice(0, 20).map((obj, index) => {
              return (
                <article
                  key={index}
                  className="ranking-content-box col-12 my-1 p-2 d-flex align-items-start"
                  onClick={() => {
                    axios
                      .post(BaseURL + "/news/increaseViews", {
                        newsId: obj._id,
                        userId:
                          this.state.userId === "" ? "" : this.state.userId,
                      })
                      .then((res) => {
                        if (res.data.success) {
                          this.props.history.push(`/news/single/${obj._id}`);
                        } else {
                          toast.warn("Error Occurred");
                        }
                      });
                  }}
                >
                  <NewsRanked rankedNewsObj={obj} rankedNewsObjIndex={index} />
                </article>
              );
            })
          )}
        </div>
        <FootBar />
      </Fragment>
    );
  }
}
