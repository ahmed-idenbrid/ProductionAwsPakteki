import React, { Component, Fragment } from "react";
import SmallNewsComponent from "../NewsPagesComponents/NewsComponents/smallNewsComponent";
import { Spinner } from "react-bootstrap";
import FootBar from "../FootBar/FootBar";
import { BaseURL } from "../../app/common";
import axios from "axios";
import { toast } from "react-toastify";
import NavBar from "../NavBar/Navbar";
import InView from "react-intersection-observer";
class Covid extends Component {
  
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      NewsData: [],
      mounted: false,
      userId: "",
    };
  }
 
  componentDidMount() {
    this._isMounted = true;
    this.getData(this.state.page,this.state.limit);
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
        if (this._isMounted) {
        this.setState(
          {
            userId: res.data._id,
          },
          () => {
            localStorage.setItem("userData", JSON.stringify(res.data));
          });
        }
      }
    });
  }
  getData = (page,limit) => {
    axios
      .get(`${BaseURL}/news/all/getCategoryNews/?page=${page}&limit=${limit}`, {
        headers: {
          newsCategoryName: "Covid",
        },
      })
      .then(async (res) => {
        if (res.data.success && res.data.newsData) {
          const map = await res.data.newsData.map((chunk) => {
            return this.state.NewsData.push(chunk);
          });
          if (this._isMounted) {
          this.setState({
            NewsData: [...this.state.NewsData, map],
            mounted: true,
          });
        }
      }
      });
  };
  componentWillUnmount(){
    this._isMounted = false;
  }
  render() {
    return (
      <Fragment>
        <NavBar />
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
            marginBottom: "58px",
          }}
          rootMargin="0px"
          threshold="0.3"
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
        >
          <Spinner animation="border" />
        </InView>
        <FootBar />
      </Fragment>
    );
  }
}

export default Covid;
