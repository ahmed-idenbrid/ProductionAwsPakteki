import React from "react";
// import { BiSmile } from "react-icons/bi";
import "./Ranking.css";
import { FaRegEye } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
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
import axios from "axios";


export default class NewsRank extends React.Component {
  state = {
    userData: {}
  };
  componentDidMount() {
    // if(localStorage.getItem("userData"))
    // {
    //   this.setState(
    //     {
    //       userData: JSON.parse(localStorage.getItem("userData"))
    //     })
    //   }
    const config = {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };
    axios.get("http://localhost:5000/api/auth/user", config).then((res) => {
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
    if (localStorage.getItem("userData")) {
      this.setState(
        {
          userData: JSON.parse(localStorage.getItem("userData"))
        })
    }
    
  }

  render() {
    return (
      <React.Fragment>
        <div className="row m-0 ranking-news">
          <div className="d-flex w-100">
            <div
              className="ranking-box-badge"
              style={{
                background:
                  this.props.rankedNewsObjIndex === 0
                    ? "#FF6464"
                    : this.props.rankedNewsObjIndex === 1
                      ? "orange"
                      : this.props.rankedNewsObjIndex === 2
                        ? "green"
                        : "grey",
              }}>
              {this.props.rankedNewsObjIndex + 1}
            </div>
            <div className='overflow-hidden w-100'>
              <div className='d-flex w-100'>
                <div className="ranking-content-img" style={{backgroundImage:`url(${this.props.rankedNewsObj.image})`}}></div>
                <div className="ml-3 d-flex flex-column w-100">
                  <div className='news-detail-holder'>
                    <div className="title-rank-news">
                      {this.props.rankedNewsObj.title}
                    </div>
                    <div className='mt-15p'>
                      <p className="m-0" style={{ fontSize: "13px" }}>
                        {this.props.rankedNewsObj.date}
                      </p>
                      <div className="comments-block">
                        <div className="comments-conuter">
                          <span className="mb-0 small-icons-text-comments">
                            <FiMessageSquare className="commentIcon" /> &nbsp;
                            {this.props.rankedNewsObj.no_of_comments}
                          </span>
                          &nbsp;
                          <span className="mb-0 pl-2 small-icons-text-comments">
                            <FaRegEye style={{ fontSize: "15px" }} /> &nbsp;
                            {this.props.rankedNewsObj.no_of_registered_views +
                              this.props.rankedNewsObj.no_of_nonregistered_views}
                          </span>
                        </div>
                        <small className="news-channel">
                          <img
                            className="w-27"
                            src={
                              this.props.rankedNewsObj.channel === "Dawn"
                                ? DawnNews
                                : this.props.rankedNewsObj.channel === "city42"
                                ? c42News
                                : this.props.rankedNewsObj.channel === "GEO"
                                ? geoNews
                                : this.props.rankedNewsObj.channel === "Urdupoint"
                                ? UrduPointNews
                                : this.props.rankedNewsObj.channel === "Express"
                                ? expressNews
                                : this.props.rankedNewsObj.channel === "SAMAA"
                                ? SamaNews
                                : this.props.rankedNewsObj.channel === "NeoNetwork"
                                ? NeoNews
                                : this.props.rankedNewsObj.channel === "Bol"
                                ? bolNews
                                : this.props.rankedNewsObj.channel === "AbbTakk"
                                ? AbTkNews
                                : this.props.rankedNewsObj.channel === "92News"
                                ? NintyTwoNews
                                : this.props.rankedNewsObj.channel === "24NewsHD"
                                ? duniyaNews
                                : this.props.rankedNewsObj.channel === "Royalnews"
                                ? royalNews
                                : this.props.rankedNewsObj.channel === "Newsone"
                                ? OnNews
                                : this.props.rankedNewsObj.channel === "GNN"
                                ? gnnNews
                                : this.props.rankedNewsObj.channel === "Dunya"
                                ? duniyaNews
                                : this.props.rankedNewsObj.channel === "Mangobaaz"
                                ? MangoBaaz
                                : this.props.rankedNewsObj.channel === "SundayNews"
                                ? SundayNews
                                : this.props.rankedNewsObj.channel === "Urdunews"
                                ? UrduNews
                                : this.props.rankedNewsObj.channel === "Zaiqatv"
                                ? ZaiqaTV
                                : this.props.rankedNewsObj.channel === "Jangnews"
                                ? JhangNews
                                : this.props.rankedNewsObj.channel === "HelloPakistanMagazine"
                                ? HelloPakistan
                                : this.props.rankedNewsObj.channel
                            }
                            alt="channel"
                          />
                        </small>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              {this.props.rankedNewsObj.comments.length > 0 ? (
                <React.Fragment>
                  <div className="rankedNewsComment"
                    style={{ backgroundColor: "#edeff1", color: "#8d8d8d" }}>
                    <GrEmoji style={{ fontSize: "23px" }} /> &nbsp; 
                    <div className='ranked-news-comment' style={{ WebkitBoxOrient: 'vertical' }}>
                      {this.props.rankedNewsObj.comments[0].comment}
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                {/* <div className="user-profile-holder">
                      <GrEmoji style={{ fontSize: "23px" }} /> &nbsp;
                    </div>
                <div className="user-profile-holder">
                  <div className="user-profile-container"></div>
                </div>  */}
              </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}