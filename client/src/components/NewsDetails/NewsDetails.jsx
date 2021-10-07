import React, { Fragment, Component } from "react";
import "./NewsDetails.css";
import { VscComment } from "react-icons/vsc";
import { FaTrash } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import { BaseURL } from "../../app/common";
import { FaRegEye } from "react-icons/fa";
// import { FiShare } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";
// import { BiLike } from "react-icons/bi";
import { toast } from "react-toastify";
import FootBar from "../FootBar/FootBar";
import NavBar from "../NavBar/Navbar";
import SmallNewsComponent from "../NewsPagesComponents/NewsComponents/smallNewsComponent";
import whatsapp from "../assets/whatsapp.svg";
import facebook from "../assets/facebook-logo-2019.svg";
import instagram from "../assets/instagram.svg";
import linkedin from "../assets/linkedin.svg";
import share from "../assets/share.png";
import gnnNews from "../Categories/PakNewsLogo/gnn.svg";
import geoNews from "../Categories/PakNewsLogo/geo.svg";
import royalNews from "../Categories/PakNewsLogo/royal.svg";
import c42News from "../Categories/PakNewsLogo/c42.svg";
import bolNews from "../Categories/PakNewsLogo/bol.svg";
import duniyaNews from "../Categories/PakNewsLogo/duniya.svg";
import expressNews from "../Categories/PakNewsLogo/express.svg";
import NintyTwoNews from "../Categories/PakNewsLogo/92.svg";
import AbTkNews from "../Categories/PakNewsLogo/abtk.svg";
import DawnNews from "../Categories/PakNewsLogo/dawn.svg";
import UrduPointNews from "../Categories/PakNewsLogo/urdu-point.svg";
import SamaNews from "../Categories/PakNewsLogo/sama.svg";
import OnNews from "../Categories/PakNewsLogo/on.svg";
import HelloPakistan from "../Categories/PakNewsLogo/Hello-Pakistan.svg";
import MangoBaaz from "../Categories/PakNewsLogo/Mango-Baaz.svg";
import SundayNews from "../Categories/PakNewsLogo/sunday-news.svg";
import UrduNews from "../Categories/PakNewsLogo/urdu-news.svg";
import ZaiqaTV from "../Categories/PakNewsLogo/Zaiqa-TV.svg";
import JhangNews from "../Categories/PakNewsLogo/Jhang-News.svg";
import NeoNews from "../Categories/PakNewsLogo/neo.svg";
import { ShimmerText, ShimmerTitle, ShimmerThumbnail } from "react-shimmer-effects";
export default class NewsDetails extends Component {
  state = {
    singleNews: "",
    categoryNews: [],
    newsLiked: false,
    userData: {},
    comment: "",
    newsCategory: "",
    currentDate: new Date(),
  };

  async componentDidMount() {
    await this.getSingleNewsData(this.props.routerParams.match.params.newsId);
    await axios.get(`${BaseURL}/news/all/?page=1&limit=6`).then((res) => {
      if (res.data.success && res.data.newsData) {
        this.setState({
          categoryNews: res.data.newsData,
        });
      }
    });
    const config = {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };
    await axios
      .get("http://3.142.50.232:5000/api/auth/user", config)
      .then((res) => {
        if (res.data.Message) {
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
        } else {
          localStorage.setItem("userData", JSON.stringify(res.data));
          this.setState({
            userData: res.data,
          });
        }
      });
    setTimeout(() => {
      const target = document.getElementById("bottom");
      target.scrollTop = target.scrollHeight - target.clientHeight;
    }, 600);
  }

  handleNewsLike(newsId) {
    this.setState(
      {
        newsLiked: true,
      },
      () => {
        axios
          .post(BaseURL + "/newsLiked", {
            newsId,
            userId: this.state.userData._id,
            liked: this.state.newsLiked,
          })
          .then((response) => {
            if (response.data.success) {
              this.getSingleNewsData();
            }
          });
      }
    );
  }

  handleNewsUnLike(newsId) {
    this.setState(
      {
        newsLiked: false,
      },
      () => {
        axios
          .post(BaseURL + "/newsUnLiked", {
            newsId,
            userId: this.state.userData._id,
            liked: this.state.newsLiked,
          })
          .then((response) => {
            if (response.data.success) {
              this.getSingleNewsData();
            }
          });
      }
    );
  }

  async getSingleNewsData(newsId) {
    await axios
      .get(`${BaseURL}/news/single/${newsId}`)
      .then(async (response) => {
        if (await response.data.success) {
          this.setState(
            {
              singleNews: response.data.singleNewsData,
              newsCategory: response.data.singleNewsData.category,
            },
            () => {
              const data = response.data.singleNewsData.likes.find(
                (obj) => obj.userId === this.state.userData._id
              );
              this.setState({
                newsLiked: data === undefined ? false : true,
              });
              setTimeout(() => {
                const target = document.getElementById("bottom");
                target.scrollTop = target.scrollHeight - target.clientHeight;
              }, 600);
            }
          );
        }
      });
  }

  postNewsComment() {
    axios
      .post(BaseURL + "/newsComment", {
        newsId: this.state.singleNews._id,
        userId: this.state.userData._id === "" ? "" : this.state.userData._id,
        username:
          this.state.userData.username === ""
            ? ""
            : this.state.userData.username,
        comment: this.state.comment,
      })
      .then((response) => {
        if (response.data.success) {
          this.getSingleNewsData(this.props.routerParams.match.params.newsId);
          this.setState({
            comment: "",
          });
        }
      });
  }
  render() {
    return (
      <Fragment>
        <NavBar routerParams={this.props.routerParams} />

        <div className="news-details-container pb-2 pb-5 mb-5">
          {this.state.singleNews.image == null ? <ShimmerThumbnail height={200} className="m-0" rounded /> : (
            <div
            className="banner"
            style={{ backgroundImage: `url(${this.state.singleNews.image})` }}>
            {/* <FiShare className="bannerShareIcon" data-target="#shareModal" data-toggle="modal"/> */}
            <img
              data-toggle="modal"
              data-target="#shareModal"
              className="share-icon mr-0"
              src={share}
              alt="icon"
            />
            <div className="bannerNewsChannel">
              {/* {this.state.singleNews.channel
                      ? this.state.singleNews.channel
                      : "News Channel"} */}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={this.state.singleNews.permalink}
              >
                <img
                  className="ChannelImage ml-2"
                  src={
                    this.state.singleNews.channel === "Dawn"
                      ? DawnNews
                      : this.state.singleNews.channel === "city42"
                        ? c42News
                        : this.state.singleNews.channel === "GEO"
                          ? geoNews
                          : this.state.singleNews.channel === "Urdupoint"
                            ? UrduPointNews
                            : this.state.singleNews.channel === "Express"
                              ? expressNews
                              : this.state.singleNews.channel === "SAMAA"
                                ? SamaNews
                                : this.state.singleNews.channel === "NeoNetwork"
                                  ? NeoNews
                                  : this.state.singleNews.channel === "Bol"
                                    ? bolNews
                                    : this.state.singleNews.channel === "AbbTakk"
                                      ? AbTkNews
                                      : this.state.singleNews.channel === "92News"
                                        ? NintyTwoNews
                                        : this.state.singleNews.channel === "24NewsHD"
                                          ? duniyaNews
                                          : this.state.singleNews.channel === "Royalnews"
                                            ? royalNews
                                            : this.state.singleNews.channel === "Newsone"
                                              ? OnNews
                                              : this.state.singleNews.channel === "GNN"
                                                ? gnnNews
                                                : this.state.singleNews.channel === "Dunya"
                                                  ? duniyaNews
                                                  : this.state.singleNews.channel === "Dunya"
                                                    ? MangoBaaz
                                                    : this.state.singleNews.channel === "Dunya"
                                                      ? SundayNews
                                                      : this.state.singleNews.channel === "Dunya"
                                                        ? UrduNews
                                                        : this.state.singleNews.channel === "Dunya"
                                                          ? ZaiqaTV
                                                          : this.state.singleNews.channel === "Dunya"
                                                            ? JhangNews
                                                            : this.state.singleNews.channel === "Dunya"
                                                              ? HelloPakistan
                                                              : this.state.singleNews.channel
                  }
                  alt="channel"
                />
              </a>
            </div>
          </div>
          )}
          <div className="news-details-text-container p-1">
            <font className="news-details-headline">
              {this.state.singleNews.title == null ? <ShimmerTitle line={1} className="m-0" /> : (
                this.state.singleNews.title)}
            </font>
            <br />
            <div className="iconsShare">
              <div className="icons-small-icons d-flex">
                <a href="#/" className="d-flex flex-column align-items-center">
                  <img src={whatsapp} alt="icon" className="socialShareIcons" />
                </a>
                <a
                  href="#/"
                  className="d-flex flex-column align-items-center mx-1"
                >
                  <img src={facebook} alt="icon" className="socialShareIcons" />
                </a>
                <a href="#/" className="d-flex flex-column align-items-center ">
                  <img
                    src={instagram}
                    alt="icon"
                    className="socialShareIcons"
                  />
                </a>
                <a
                  href="#/"
                  className="d-flex flex-column align-items-center mx-1"
                >
                  <img src={linkedin} alt="icon" className="socialShareIcons" />
                </a>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="mb-0 newsDate ml-0">
                  {this.state.singleNews.date}
                </span>
                <span className="mb-0 small-icons-text-comments px-1">
                  <label htmlFor="input-comment">
                    <FiMessageSquare className="IconComment" />
                  </label>{" "}
                  &nbsp;
                  {this.state.singleNews.no_of_comments}
                </span>
                <span
                  className="mb-0 small-icons-text-comments px-1"
                  style={{ verticalAlign: "middle" }}
                >
                  <FaRegEye style={{ fontSize: "15px" }} /> &nbsp;
                  {this.state.singleNews.no_of_registered_views +
                    this.state.singleNews.no_of_nonregistered_views}
                </span>
              </div>
            </div>
            <div>
              <font className="news-details-source">
                {this.state.singleNews.description == null ? (
                  <p>
                    <ShimmerText className="m-0" line={5} />
                  </p>
                ) : (
                  // Special property wasn't working in anywhere except inline-CSS for limiting lines
                  <div
                    className="line-clamp-5 px-1"
                    style={{ WebkitBoxOrient: "vertical" }}>
                    {this.state.singleNews.description}
                  </div>
                )}
              </font>
            </div>
            <div className="col-12 p-0 my-2">
              <img
                src="/assets/images/ss.png"
                alt=""
                height="100%"
                width="100%"
              />
            </div>
          </div>
          <div className="readMoreSection">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={this.state.singleNews.permalink}
              className="btn info"
              style={{ padding: "5px 42px" }}
            >
              Read More
            </a>
          </div>
          {/* comment section start*/}
          <div className="row m-0" id="comment-section">
            <div className="col-12 pt-3 d-flex align-items-center justify-content-between">
              {/* <small> {this.state.singlenews.no_of_likes} Likes</small> */}
            </div>
            <div className="col-12 comment-header">
              {/* {this.state.newsLiked ? (
                <div style={{ cursor: "pointer" }}
                  onClick={() =>
                    this.handleNewsUnLike(this.state.singlenews._id)
                  }>
                  <BiLike /> Unlike
                </div>
              ): 
              ( <div style={{ cursor: "pointer" }}
                  onClick={() => this.handleNewsLike(this.state.singlenews._id)}>
                  <BiLike /> Like
                </div>
              )
              } */}
              <label
                htmlFor="input-comment"
                style={{ cursor: "pointer", margin: "0px" }}
              >
                <VscComment /> Comment
              </label>

              <div>
                {/* <FaShareSquare /> Share
                <div className="container d-flex justify-content-center pr-0">
                  <i
                    data-toggle="modal"
                    data-target="#shareModal"
                    style={{ cursor: "pointer" }}>
                    <FaShareSquare /> Share
                  </i>
                </div> */}
                <div
                  className="modal fade"
                  id="shareModal"
                  tabIndex={-1}
                  role="dialog"
                  aria-labelledby="shareModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content col-12">
                      <div className="modal-header">
                        <h5 className="modal-title">
                          Lets share with your friends.
                        </h5>{" "}
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          {" "}
                          <span aria-hidden="true">×</span>{" "}
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="icon-container1 d-flex justify-content-between">
                          <a
                            href="#/"
                            className="d-flex flex-column align-items-center"
                          >
                            <img
                              src={whatsapp}
                              alt=""
                              style={{ height: "50px", width: "50px" }}
                            />
                            <p>Whatsapp</p>
                          </a>
                          <a
                            href="#/"
                            className="d-flex flex-column align-items-center"
                          >
                            <img
                              src={facebook}
                              alt=""
                              style={{ height: "50px", width: "50px" }}
                            />
                            <p className="mx-1">Facebook</p>
                          </a>
                          <a
                            href="#/"
                            className="d-flex flex-column align-items-center"
                          >
                            <img
                              src={instagram}
                              alt=""
                              style={{ height: "50px", width: "50px" }}
                            />
                            <p>Instagram</p>
                          </a>
                          <a
                            href="#/"
                            className="d-flex flex-column align-items-center"
                          >
                            <img
                              src={linkedin}
                              alt=""
                              style={{ height: "50px", width: "50px" }}
                            />
                            <p className="mx-1">Linkedin</p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <b className="align-center-vertical">
                {this.state.singleNews.no_of_comments}
              </b>
            </div>
            <div className="col-12 px-1 user-comments" id="bottom">
              {this.state.singleNews.comments === [] ||
                this.state.singleNews.comments === undefined
                ? null
                : this.state.singleNews.comments.map((obj, index) => {
                  return (
                    <div className="single-comment mb-3" key={index}>
                      <img
                        className="user-img align-center-vertical"
                        src="https://s.yimg.jp/images/jpnews/cre/comment/all/images/user_icon_color_blue.png"
                        alt="img not found"
                      />
                      <span className="user-comment-wrap w-100 px-2 py-1">
                        <p className="w-100 m-0 d-flex align-items-center text-dark justify-content-between">
                          <small>
                            <b>
                              {obj.username === null
                                ? "Anonymous"
                                : obj.username}
                            </b>
                          </small>
                          {obj.userId === this.state.userData._id ? (
                            <small
                              className="delete-btn"
                              onClick={() => {
                                axios
                                  .post(BaseURL + "/newsCommentDelete", {
                                    newsId: this.state.singleNews._id,
                                    userId: this.state.userData._id,
                                    commentNo: obj.commentNo,
                                  })
                                  .then((response) => {
                                    if (response.data.success) {
                                      this.getSingleNewsData(
                                        this.props.routerParams.match.params
                                          .newsId
                                      );
                                    }
                                  });
                              }}
                            >
                              <FaTrash style={{ fontSize: "18px" }} />
                            </small>
                          ) : null}
                        </p>
                        <small className="color-grey"> {obj.comment} </small>
                      </span>
                    </div>
                  );
                })}
            </div>
            <div className="col-12 p-0 pr-2 my-2">
              <div className="commnet-input">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (this.state.userData._id === undefined) {
                      if (
                        window.confirm("Do You Want To continue without login")
                      ) {
                        this.postNewsComment();
                      }
                    } else {
                      this.postNewsComment();
                    }
                  }}
                >
                  <input
                    type="text"
                    id="input-comment"
                    placeholder="Write a comment..."
                    value={this.state.comment}
                    onChange={(e) => {
                      this.setState({
                        comment: e.target.value,
                      });
                    }}
                    required
                  />
                  <button className="commment-submit-icon" type="submit">
                    <IoMdSend />
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* comment section end*/}

          {/* category news */}
          <div className="row m-0 relatedNews">
            <div className="col-12 px-1">
              <small className="heading-related-news">
                Related News
                <div className="description-container-common col-12 p-0 my-1">
                  <p className="font-size-12 mb-0">
                    Related to the news category you are checking
                  </p>
                </div>
              </small>
              {/* category section */}
              {this.state.categoryNews
                .filter((obj) => {
                  return obj.category === this.state.newsCategory;
                })
                .map((obj, index) => {
                  return (
                    <article
                      key={index}
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
                  );
                })}
              {/* category section */}
            </div>
          </div>
          {/* Advertisement-banner */}
          <div className="col-12 p-0">
            <img
              src="/assets/images/ss.png"
              alt=""
              height="100%"
              width="100%"
            />
          </div>
          {/* category news */}
          {/* Recommended news */}
          <div className="row m-0 recommendedNews">
            <div className="col-12 px-1">
              <small className="heading-related-news">
                Recommended News
                <div className="description-container-common col-12 p-0 my-1">
                  <p className="font-size-12 mb-0">
                    Recommended news based on your user experience
                  </p>
                </div>
              </small>
              {/* category section */}
              {this.state.categoryNews
                .filter((obj) => {
                  return obj.category === this.state.newsCategory;
                })
                .map((obj, index) => {
                  return (
                    <article
                      key={index}
                      className="row m-0 p-0 single_article"
                      onClick={() => {
                        axios
                          .post(BaseURL + "/news/increaseViews", {
                            newsId: obj._id,
                            userId:
                              this.state.userData._id === ""
                                ? ""
                                : this.state.userData._id,
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
              {/* category section */}
            </div>
          </div>
          {/* category news */}
        </div>
        <FootBar />
      </Fragment>
    );
  }
}
