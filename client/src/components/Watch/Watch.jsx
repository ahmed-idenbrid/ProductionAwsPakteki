import React, { Component, Fragment } from "react";
import "./Watch.css";
import { Link } from "react-router-dom";
// import ReactPlayer from 'react-player/youtube';
import geologo from "./channel_logo/geo_news.svg";
import arylogo from "./channel_logo/ary_news.svg";
import duniyalogo from "./channel_logo/duniya_news.svg";
import dawnlogo from "./channel_logo/dawn_news.svg";
import gnnlogo from "./channel_logo/gnn_news.svg";
import city42logo from "./channel_logo/city42_news.svg";
import logo24_news from "./channel_logo/24_news.svg";
import FootBar from "../FootBar/FootBar";
import NavBar from "../NavBar/Navbar";

export default class Watch extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <div className="row m-0 pt-1" style={{paddingBottom:"60px"}}>
          <div className="col-12 p-0">
            <img
              src="assets/images/ss.png"
              alt=""
              height={"100%"}
              width={"100%"}
            />
          </div>
          {/* <ReactPlayer
                     width="100%"
                     controls
                     url='https://www.youtube.com/embed/qKaWsr-9aUE' /> */}

          {/* news start single */}
          <Link to="/news/geo-news-live" className="col-12 p-0 my-1">
            <div className="my-page-content d-flex">
              <img height={"100px"} src={geologo} alt="" />
              
              <div className="my-page-content-text ml-2 w-100 d-flex flex-column justify-content-between">
                <div className="font-size-13">
                  <b>Pakistan News Live</b> <br />
                  GEO News live - Latest breaking news, Latest Headlines, Latest
                  Bulletins and Exclusive Footages available round the clock.
                </div>
                <div className="d-flex align-items-center justify-content-end">
                <div class="live-indicator-block">
                    <span class="live-indicator">
                            <i class="fa fa-circle blink"></i>Live
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* news end single*/}
          {/* news start single */}
          <Link to="/news/ary-news-live" className="col-12 p-0 my-1">
            <div className="my-page-content d-flex">
              <img height={"100px"} src={arylogo} alt="" />
              <div className="my-page-content-text ml-2 w-100 d-flex flex-column justify-content-between">
                <div className="font-size-13 four-line">
                  <b>Pakistan News Live</b> <br />
                  ARY NEWS LIVE | Latest Pakistan News 24/7 | Headlines ,
                  Bulletins, Special & Exclusive Coverage
                </div>
                <div className="d-flex align-items-center justify-content-end">
                <div class="live-indicator-block">
                    <span class="live-indicator">
                            <i class="fa fa-circle blink"></i>Live
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* news end single*/}
          {/* news start single */}
          <Link to="/news/duniya-news-live" className="col-12 p-0 my-1">
            <div className="my-page-content d-flex ">
              <img height={"100px"} src={duniyalogo} alt="" />
              <div className="my-page-content-text ml-2 w-100 d-flex flex-column justify-content-between">
                <div className="font-size-13 four-line">
                  <b>Pakistan News Live</b> <br />
                  DUNYA NEWS LIVE 24/7, News Headlines, Bulletins and Shows
                </div>
                <div className="d-flex align-items-center justify-content-end">
                <div class="live-indicator-block">
                    <span class="live-indicator">
                            <i class="fa fa-circle blink"></i>Live
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* news end single*/}
          {/* news start single */}
          <Link to="/news/dawn-news-live" className="col-12 p-0 my-1">
            <div className="my-page-content d-flex">
              <img height={"100px"} src={dawnlogo} alt="" />
              <div className="my-page-content-text ml-2 w-100 d-flex flex-column justify-content-between">
                <div className="font-size-13 four-line">
                  <b>Pakistan News Live</b> <br />
                  Dawn News live | Pakistan news 24/7, Latest headlines and
                  updates
                </div>
                <div className="d-flex align-items-center justify-content-end">
                <div class="live-indicator-block">
                    <span class="live-indicator">
                            <i class="fa fa-circle blink"></i>Live
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* news end single*/}
          {/* news start single */}
          <Link to="/news/gnn-news-live" className="col-12 p-0 my-1">
            <div className="my-page-content d-flex">
              <img height={"100px"} src={gnnlogo} alt="" />
              <div className="my-page-content-text ml-2 w-100 d-flex flex-column justify-content-between">
                <div className="font-size-13 four-line">
                  <b>Pakistan News Live</b> <br />
                  GNN Live l Latest Pakistan News 24/7 l Breaking News l Dr.
                  Shahid Masood l Arif Hameed Bhatti.
                </div>
                <div className="d-flex align-items-center justify-content-end">
                <div class="live-indicator-block">
                    <span class="live-indicator">
                            <i class="fa fa-circle blink"></i>Live
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* news end single*/}
          {/* news start single */}
          <Link to="/news/city24-news-live" className="col-12 p-0 my-1">
            <div className="my-page-content d-flex">
              <img height={"100px"} src={city42logo} alt="" />
              <div className="my-page-content-text ml-2 w-100 d-flex flex-column justify-content-between">
                <div className="font-size-13 four-line">
                  <b>Pakistan News Live</b> <br />
                  City 42 | Latest Lahore News | Lahore Headlines | Lahore
                  Weather | Lahore Airport | City42 Live | Lahore News Headlines
                  | Lahore Traffic Updates
                </div>
                <div className="d-flex align-items-center justify-content-end">
                <div class="live-indicator-block">
                    <span class="live-indicator">
                            <i class="fa fa-circle blink"></i>Live
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* news end single*/}
          {/* news start single */}
          <Link to="/news/24-news-live" className="col-12 p-0 my-1">
            <div className="my-page-content d-flex">
              <img height={"100px"} src={logo24_news} alt="" />
              <div className="my-page-content-text ml-2 w-100 d-flex flex-column justify-content-between">
                <div className="font-size-13 four-line">
                  <b>Pakistan News Live</b> <br />
                  24 News HD is one of the leading news channels of Pakistan
                  bringing you the latest current
                </div>
                <div className="d-flex align-items-center justify-content-end">
                <div class="live-indicator-block">
                    <span class="live-indicator">
                            <i class="fa fa-circle blink"></i>Live
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* news end single*/}
        </div>
        <FootBar />
      </Fragment>
    );
  }
}
