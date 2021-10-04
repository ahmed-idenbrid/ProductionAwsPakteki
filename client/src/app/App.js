import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import NewsTabsNewsViewsComponent from "../components/NewsTabs&NewsViewsComponent/NewsTabs&NewsViewsComponent";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import ForgotPassowrd from "../components/Auth/Login/ForgotPassowrd";
import VerificationCode from "../components/Auth/Login/VerificationCode";
import NewPassword from "../components/Auth/Login/NewPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewsDetails from "../components/NewsDetails/NewsDetails";
import Watch from "../components/Watch/Watch";
import Ranking from "../components/Ranking/Ranking";
import CategoryNewsRanking from "../components/Ranking/CategoryNewsRanking/CategoryNewsRanking";
import MyPage from "../components/MyPage/Mypage";
import GeoNewsLive from "../components/Watch/LiveChannels/GeoNewsLive";
import AryNewsLive from "../components/Watch/LiveChannels/AryNewsLive";
import DuniyaNewsLive from "../components/Watch/LiveChannels/DuniyaNews";
import DawnNewsLive from "../components/Watch/LiveChannels/DawnNews";
import GnnNewsLive from "../components/Watch/LiveChannels/GnnNews";
import City42NewsLive from "../components/Watch/LiveChannels/City42News";
import TwentyFourNewsLive from "../components/Watch/LiveChannels/TwentyFourNews";
import SearchResultsComponent from "../components/SearchResultsComponent/SearchResultsComponent";
import Setting from "../components/Settings/Settings";
import AboutUs from "../components/StaticPages/aboutUs/AboutUs";
import FeedBack from "../components/Feedback/Feedback";
import News from "../components/StaticPages/News";
import PrivacyPolicy from "../components/StaticPages/PrivacyPolicy";
import TermsCondition from "../components/StaticPages/TermsAndConditions";
import Islam from "../components/Islam&CovidNews/Islam";
import Covid from "../components/Islam&CovidNews/Covid";
import ChannelNews from "../components/ChannelNews/ChannelNews";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="HeaderSpace"></div>
        <Container className="p-0">
          <Switch>
            <Route
              exact
              path="/news/search"
              component={(routerParams) => {
                return <SearchResultsComponent routerParams={routerParams} />;
              }}
            />
            <Route exact path="/ranking" component={Ranking} />
            <Route
              exact
              path="/ranking/:newsName"
              component={CategoryNewsRanking}
            />
            <Route exact path="/news/geo-news-live" component={GeoNewsLive} />
            <Route exact path="/news/ary-news-live" component={AryNewsLive} />
            <Route
              exact
              path="/news/islam"
              component={(routerParams) => {
                return <Islam routerParams={routerParams} />;
              }}
            />
            <Route
              exact
              path="/news/covid"
              component={(routerParams) => {
                return <Covid routerParams={routerParams} />;
              }}
            />
            <Route
              exact
              path="/news/duniya-news-live"
              component={DuniyaNewsLive}
            />
            <Route exact path="/news/dawn-news-live" component={DawnNewsLive} />
            <Route exact path="/news/gnn-news-live" component={GnnNewsLive} />
            <Route
              exact
              path="/news/city24-news-live"
              component={City42NewsLive}
            />
            <Route
              exact
              path="/news/24-news-live"
              component={TwentyFourNewsLive}
            />
            <Route exact path="/watch" component={Watch} />
            <Route
              exact
              path="/mypage"
              component={(routerParams) => {
                return <MyPage routerParams={routerParams} />;
              }}
            />
            <Route
              exact
              path="/news/single/:newsId"
              component={(routerParams) => {
                return <NewsDetails routerParams={routerParams} />;
              }}
            />
            <Route
              exact
              path="/news/:kind"
              component={(routerParams) => {
                return (
                  <NewsTabsNewsViewsComponent routerParams={routerParams} />
                );
              }}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgotpassword" component={ForgotPassowrd} />
            <Route
              exact
              path="/VerificationCode"
              component={VerificationCode}
            />
            <Route exact path="/newpassword" component={NewPassword} />
            <Route exact path="/user/setting" component={Setting} />
            <Route exact path="/about-us" component={AboutUs} />
            <Route exact path="/feedback" component={FeedBack} />
            <Route exact path="/news" component={News} />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route exact path="/terms-condition" component={TermsCondition} />
            <Route
              exact
              path="/news/channelNews/:channelName"
              render={(routerParams) => {
                return <ChannelNews routerParams={routerParams} />;
              }}
            />
            <Route path="*" render={() => <Redirect to="/news/all" />} />
          </Switch>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Container>
      </BrowserRouter>
    );
  }
}
