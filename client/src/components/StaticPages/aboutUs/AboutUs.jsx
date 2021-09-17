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
          <div className="container py-4 bg-white min-h-100">
            <div className="h4 py-2">Cool update for the future</div>
            <p className="mt-2">
              There are still internet disparities in this world, and a lot of
              unreliable information is posted. Our mission is to deliver
              reliable data to as many Internet users as possible and realize
              better UX.
            </p>
            <div className="h4 py-2">Our strengths</div>
            <p className="mt-2">
              We are absolutely confident in the following: Diligent
              communication and polite communication = We always keep in touch
              and take responsibility for each and every one of our customers so
              that they can solve their questions and give instructions
              smoothly. I want you to do this again! Flexible response to
              requests such as = On this page, you may have new questions than
              when proposing a job request, or you may want to consult with us.
              We will listen to such things and work professionally.
            </p>
            <div className="h4 py-2">Our strategy</div>
            <p className="mt-2">
              We are absolutely confident in the following: Diligent
              communication and polite communication = We always keep in touch
              and take responsibility for each and every one of our customers so
              that they can solve their questions and give instructions
              smoothly. I want you to do this again! Flexible response to
              requests such as = On this page, you may have new questions than
              when proposing a job request, or you may want to consult with us.
              We will listen to such things and work professionally.
            </p>
            <div className="h4 py-2">Our Mission</div>
            <p className="mt-2">
              We are absolutely confident in the following: Diligent
              communication and polite communication = We always keep in touch
              and take responsibility for each and every one of our customers so
              that they can solve their questions and give instructions
              smoothly. I want you to do this again! Flexible response to
              requests such as = On this page, you may have new questions than
              when proposing a job request, or you may want to consult with us.
              We will listen to such things and work professionally.
            </p>
            <div className="h4 py-2">Our Vision</div>
            <p className="mt-2">
              We are absolutely confident in the following: Diligent
              communication and polite communication = We always keep in touch
              and take responsibility for each and every one of our customers so
              that they can solve their questions and give instructions
              smoothly. I want you to do this again! Flexible response to
              requests such as = On this page, you may have new questions than
              when proposing a job request, or you may want to consult with us.
              We will listen to such things and work professionally.
            </p>
            <div className="h4 py-2">Our Motive</div>
            <p className="mt-2">
              We are absolutely confident in the following: Diligent
              communication and polite communication = We always keep in touch
              and take responsibility for each and every one of our customers so
              that they can solve their questions and give instructions
              smoothly. I want you to do this again! Flexible response to
              requests such as = On this page, you may have new questions than
              when proposing a job request, or you may want to consult with us.
              We will listen to such things and work professionally.
            </p>
          </div>
        </div>
        <FootBar />
      </Fragment>
    );
  }
}
