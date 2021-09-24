import React from "react";
// import { BiSmile } from "react-icons/bi";
import "./Ranking.css";
import { FaRegEye } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";

export default class NewsRank extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="row m-0 ranking-news">
          <div className="col-4 col-md-2 d-flex pt-1 pr-3 justify-content-center">
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
              }}
            >
              {this.props.rankedNewsObjIndex + 1}
            </div>
            <img
              className="ranking-content-img"
              src={this.props.rankedNewsObj.image}
              alt="ranking-img"
            />
          </div>
          <div className="col-8 col-md-10 pr-0 pl-2">
            <div>
              <div className="title-rank-news">
                {this.props.rankedNewsObj.title}
              </div>
              <p
                className="pt-2 mb-1"
                style={{ fontSize: "13px", height: "23px" }}
              >
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
                <div className="channelName">
                  {this.props.rankedNewsObj.channel}
                </div>
              </div>
            </div>
          </div>
          <p
            className="ml-24-p mt-2 w-100 d-flex align-items-center justify-content-start"
            style={{ backgroundColor: "#edeff1", color: "#8d8d8d" }}
          >
            {this.props.rankedNewsObj.comments.length > 0 ? (
              <React.Fragment>
                <GrEmoji style={{ fontSize: "23px" }} /> &nbsp;
                {this.props.rankedNewsObj.comments[0].comment}
              </React.Fragment>
            ) : null}
          </p>
        </div>
      </React.Fragment>
    );
  }
}
