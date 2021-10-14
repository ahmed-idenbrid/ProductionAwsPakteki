import React, { Fragment } from "react";
import ReactPlayer from "react-player/lazy";
import city42logo from "../channel_logo/city42_news.svg";
import FootBar from "../../FootBar/FootBar";
import NavBar from "../../NavBar/Navbar";
class City42NewsLive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <NavBar />
        <div className="row m-0 pb-5 mb-5 pt-1">
          <div className="col-12 p-0">
            <img
              src="/assets/images/ss.png"
              alt=""
              height={"100%"}
              width={"100%"}
            />
          </div>
          <div className="breadcrumb-container col-12 p-0 mt-1">
                <ul className='breadcrumb-items-container d-flex px-2'>
                  <li className='breadcrumb-item'>
                    <a href="/">Home</a>
                  </li>
    
                  <li className='breadcrumb-item-last'>
                  <a href={window.location.href}><i>Live</i></a>
                    </li>
                </ul>
          </div>
          <ReactPlayer
            width="100%"
            controls
            loop="true"
            url="https://www.youtube.com/watch?v=Yy3uVBw7emQ"
          />

          {/* news start single */}
          <div className="col-12 p-0 my-1">
            <div className="my-page-content px-2 d-flex">
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
          </div>
        </div>
        <FootBar />
      </Fragment>
    );
  }
}

export default City42NewsLive;
