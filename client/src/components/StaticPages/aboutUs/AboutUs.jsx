import React, { Fragment, Component } from "react";
import "./AboutUs.css";
import FootBar from "../../FootBar/FootBar";
import NavBar from "../../NavBar/Navbar";

export default class AboutUs extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <div className="pb-5">
          <div className="container px-0 py-4 bg-white min-h-100">

            <div className="section-1 p-4 mx-4">
              <h1>Welcome to PAKTEKI.com</h1>
              <p>Pakteki is a service that organizes news in pakistan into easy-to-understand categories using lots of visual and delivers it to audience</p>
            </div>

            <div className="section-2-container w-100 mt-3 p-4">
              <div className="section-2 p-4 mt-2">
                <h1>How it works</h1>
                <p>What you can do on Pakteki.</p>
                <h4>1 Check all news</h4>
                <p>You can see what's happening in Pakistan and around the world.</p>
                <h4>2 Comments</h4>
                <p>You can see what's happening in Pakistan and around the world.</p> 
                <h4>3 Share with your friends</h4>
                <p>You can see what's happening in Pakistan and around the world.</p>
              </div>
            </div>

            <div className="section-3 container mt-3 p-4">
              {/* <div className="section-2 p-4 mt-2"> */}
                <h3><b>Birth of PAKTEKI</b></h3>
                <p>We had a desire to create websites that are used by pakistani users everyday,and we categorized the news on the basis of needs as our motto describes 'Update pakistan'</p>
              {/* </div> */}
            </div>

            <div className="section-4 container mt-3 p-4">
              {/* <div className="section-2 p-4 mt-2"> */}
                <h3><b>Our Logo</b></h3>
                <p>The modern design based on red has the meaning of delivering news to users all over the country.</p>
              {/* </div> */}
            </div>

            <div className="section-5-container w-100 mt-3 p-4">
              <div className="section-5 p-4 mt-2">
                <h3><b>Market size of Pakteki</b></h3>
                <p>The number of net users increasing dramatically every year</p>
              </div>

              <div className="section-5-sub-section-2">
                <h3><b>225 Million</b></h3>
                <p>Total available market (TAM) /2021 data </p>
              </div>

              <div className="section-5-sub-section-3">
                <h3><b>76 M</b></h3>
                <p>Serviceable Available Market (SAM)</p>
              </div>

              <div className="section-5-sub-section-4">
                <h3><b>19 M</b></h3>
                <p>Serviceable Obtainable Market (SOM)</p>
              </div>

              <div className="section-5-sub-section-5 p-3 mt-5">
                <h3><b>Our Team</b></h3>
                <p>The number of net users increasing dramatically every year</p>
              </div>

            </div>

            <div className="section-6 mt-3 mx-4">
                <div className="team-member p-3 d-flex align-items-center">
                  <img src="https://i.gadgets360cdn.com/large/loki_tom_hiddleston_crop_1622797154582.jpg?downsize=950:*" alt="" />
                  <div className="member-data ml-3">
                    <h5><b>Team PAKTEKI <br/>Hamza S</b></h5>
                    <h6>IT architect</h6>
                  </div>
                </div>
                <div className="team-member p-3 d-flex align-items-center">
                  <img src="https://i.gadgets360cdn.com/large/loki_tom_hiddleston_crop_1622797154582.jpg?downsize=950:*" alt="" />
                  <div className="member-data ml-3">
                    <h5><b>Team PAKTEKI <br/>Hamza S</b></h5>
                    <h6>IT architect</h6>
                  </div>
                </div>
                <div className="team-member p-3 d-flex align-items-center">
                  <img src="https://i.gadgets360cdn.com/large/loki_tom_hiddleston_crop_1622797154582.jpg?downsize=950:*" alt="" />
                  <div className="member-data ml-3">
                    <h5><b>Team PAKTEKI <br/>Hamza S</b></h5>
                    <h6>IT architect</h6>
                  </div>
                </div>
                <div className="team-member p-3 d-flex align-items-center">
                  <img src="https://i.gadgets360cdn.com/large/loki_tom_hiddleston_crop_1622797154582.jpg?downsize=950:*" alt="" />
                  <div className="member-data ml-3">
                    <h5><b>Team PAKTEKI <br/>Hamza S</b></h5>
                    <h6>IT architect</h6>
                  </div>
                </div><div className="team-member p-3 d-flex align-items-center">
                  <img src="https://i.gadgets360cdn.com/large/loki_tom_hiddleston_crop_1622797154582.jpg?downsize=950:*" alt="" />
                  <div className="member-data ml-3">
                    <h5><b>Team PAKTEKI <br/>Hamza S</b></h5>
                    <h6>IT architect</h6>
                  </div>
                </div><div className="team-member p-3 d-flex align-items-center">
                  <img src="https://i.gadgets360cdn.com/large/loki_tom_hiddleston_crop_1622797154582.jpg?downsize=950:*" alt="" />
                  <div className="member-data ml-3">
                    <h5><b>Team PAKTEKI <br/>Hamza S</b></h5>
                    <h6>IT architect</h6>
                  </div>
                </div><div className="team-member p-3 d-flex align-items-center">
                  <img src="https://i.gadgets360cdn.com/large/loki_tom_hiddleston_crop_1622797154582.jpg?downsize=950:*" alt="" />
                  <div className="member-data ml-3">
                    <h5><b>Team PAKTEKI <br/>Hamza S</b></h5>
                    <h6>IT architect</h6>
                  </div>
                </div>
            </div>
                <div className="slider-categories d-flex justify-content-between mx-4 mt-3">
                  <div className="slide"></div>
                  <div className="slide"></div>
                  <div className="slide"></div>
                  <div className="slide"></div>
                </div>
                <div className="section-7-container w-100 min-h-100 p-1 mt-3">
                  <div className="section-7 p-4 mt-2 mx-4">
                    <h3><b>Our proud news Resources</b></h3>
                  </div>
                  <div className="section-7-sub-section-2 p-4 mx-4 d-flex justify-content-between">
                    <h3><b><i class="fab fa-google"></i></b></h3>
                    <h3><b><i class="fab fa-codepen"></i></b></h3>
                    <h3><b><i class="fas fa-project-diagram"></i></b></h3>
                  </div>
                  <h3 className='mx-4 mt-3'><b>All we "Update Pakistan" together.</b></h3>
                  <div className="d-flex justify-content-center mt-3 ">
                    <button className='section-7-button'>Back to Home</button>
                  </div>
                </div>

          </div>
        </div>
        <FootBar />
      </Fragment>
    );
  }
}
