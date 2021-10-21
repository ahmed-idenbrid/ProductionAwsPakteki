import React, { Component, Fragment } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeAbleViews from "react-swipeable-views";
import "./NewsTabs&NewsViewsComponent.css";
import AllNewsCategoriesComponent from "../NewsPagesComponents/AllNewsComponent/allNewsCategories";
import EntertainmentNews from "../NewsPagesComponents/AllNewsComponent/EntertainmentNews";
import SportsNews from "../NewsPagesComponents/AllNewsComponent/SportsNews";
import LocalNews from "../NewsPagesComponents/AllNewsComponent/LocalNews";
import InternationalNews from "../NewsPagesComponents/AllNewsComponent/InternationalNews";
import ItSciencesNews from "../NewsPagesComponents/AllNewsComponent/It&SciencesNews";
import GourmetNews from "../NewsPagesComponents/AllNewsComponent/GourmetNews";
import FashionNews from "../NewsPagesComponents/AllNewsComponent/Fashion";
import WriterNews from "../NewsPagesComponents/AllNewsComponent/WriterNews";
import HealthNews from "../NewsPagesComponents/AllNewsComponent/Health";
import BusinessNews from "../NewsPagesComponents/AllNewsComponent/BusinessNews";
import { Link } from "react-router-dom";
import axios from "axios";
import FootBar from "../FootBar/FootBar";
import NavBar from "../NavBar/Navbar";
import SearchBar from "../SearchBar/SearchBar";
import Categories from "../Categories/Categories";

class NewsTabs extends Component {
  state = {
    index: localStorage.getItem("tabIndex")
      ? JSON.parse(localStorage.getItem("tabIndex"))
      : localStorage.setItem("tabIndex", 0),
    NewsKinds: [
      { NewsKind: "all", id: 0 },
      { NewsKind: "entertainment", id: 1 },
      { NewsKind: "sports", id: 2 },
      { NewsKind: "health", id: 3 },
      { NewsKind: "national-local", id: 4 },
      { NewsKind: "international", id: 5 },
      { NewsKind: "business", id: 6 },
      { NewsKind: "it-science", id: 7 },
      { NewsKind: "gourmet", id: 8 },
      { NewsKind: "fashion", id: 9 },
      { NewsKind: "blog", id: 10 },
    ],
    userData: {},
  };

  handleChange = (event, value) => {
    this.setState(
      {
        index: value,
      },
      () => {
        localStorage.setItem("tabIndex", value);
      }
    );
  };

  handleChangeIndex = (index) => {
    const filteredNewsKind = this.state.NewsKinds.find((obj) => {
      return index === obj.id;
    });
    this.setState(
      {
        index,
      },
      () => {
        localStorage.setItem("tabIndex", index);
        this.props.routerParams.history.push(
          `/news/${filteredNewsKind.NewsKind}`
        );
      }
    );
  };

  componentDidMount() {
    const filteredNewsKind = this.state.NewsKinds.find((obj) => {
      return this.props.routerParams.match.params.kind === obj.NewsKind;
    });
    this.setState({
      index: filteredNewsKind.id,
    });
    this.props.routerParams.history.push(`/news/${filteredNewsKind.NewsKind}`);
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
        this.setState(
          {
            userData: res.data,
          },
          () => {
            localStorage.setItem("userData", JSON.stringify(res.data));
          }
        );
      }
    });
  };
   render() {
    return(
      <Fragment>
        <NavBar />
        <SearchBar routerParams={this.props.routerParams} searched={false} />
        {this.props.routerParams.match.params.kind === "all" ? (
          <Categories />
        ) : null}
        <Tabs
          id="fixed-tabsBar"
          className="tabsBar"
          value={this.state.index}
          onChange={this.handleChange}>
          <Tab
            className="p-0"
            label={
              <Link to="/news/all" className="tabs-text">
                Main
              </Link>
            }/>
          <Tab
            className="p-0"
            label={
              <Link to="/news/entertainment" className="tabs-text">
                Entertainment
              </Link>
            }
          />
          <Tab
            className="p-0"
            label={
              <Link to="/news/sports" className="tabs-text">
                Sports
              </Link>
            }
          />
          <Tab
            className="p-0"
            label={
              <Link to="/news/health" className="tabs-text">
                Health
              </Link>
            }
          />
          <Tab
            className="p-0"
            label={
              <Link to="/news/national-local" className="tabs-text">
                NATIONAL-LOCAL
              </Link>
            }
          />
          <Tab
            className="p-0"
            label={
              <Link to="/news/international" className="tabs-text">
                International
              </Link>
            }
          />
          <Tab
            className="p-0"
            label={
              <Link to="/news/business" className="tabs-text">
                Business
              </Link>
            }
          />
          <Tab
            className="p-0"
            label={
              <Link to="/news/it-science" className="tabs-text">
                IT/Sciences
              </Link>
            }
          />
          <Tab
            className="p-0"
            label={
              <Link to="/news/gourmet" className="tabs-text">
                Gourmet
              </Link>
            }
          />
          <Tab
            className="p-0"
            label={
              <Link to="/news/fashion" className="tabs-text">
                Fashion
              </Link>
            }
          />
          <Tab
            className="p-0"
            label={
              <Link to="/news/writer" className="tabs-text">
                BLOG
              </Link>
            }
          />
        </Tabs>
        <SwipeAbleViews
          index={this.state.index}
          onChangeIndex={this.handleChangeIndex}>
          <Fragment>
            <div className="newsContainer">
              <div className="newsContainerWrap">
                <AllNewsCategoriesComponent
                  userData={this.state.userData}
                  routerParams={this.props.routerParams}/>
              </div>
            </div>

          </Fragment>
          <Fragment>
            <div className="newsContainer">
              <div className="newsContainerWrap">
                <EntertainmentNews
                  userData={this.state.userData}
                  routerParams={this.props.routerParams}
                />
              </div>
            </div>
          </Fragment>
          <Fragment>
            <div className="newsContainer">
              <div className="newsContainerWrap">
                <SportsNews
                  userData={this.state.userData}
                  routerParams={this.props.routerParams}
                />
              </div>
            </div>
          </Fragment>
          <Fragment>
            <div className="newsContainer">
              <div className="newsContainerWrap">
                <HealthNews
                  userData={this.state.userData}
                  routerParams={this.props.routerParams}
                />
              </div>
            </div>
          </Fragment>
          <Fragment>
            <div className="newsContainer">
              <div className="newsContainerWrap">
                <LocalNews
                  userData={this.state.userData}
                  routerParams={this.props.routerParams}
                />
              </div>
            </div>
          </Fragment>
          <Fragment>
            <div className="newsContainer">
              <div className="newsContainerWrap">
                <InternationalNews
                  userData={this.state.userData}
                  routerParams={this.props.routerParams}
                />
              </div>
            </div>
          </Fragment>
          <Fragment>
            <div className="newsContainer">
              <div className="newsContainerWrap">
                <BusinessNews
                  userData={this.state.userData}
                  routerParams={this.props.routerParams}
                />
              </div>
            </div>
          </Fragment>
          <Fragment>
            <div className="newsContainer">
              <div className="newsContainerWrap">
                <ItSciencesNews
                  userData={this.state.userData}
                  routerParams={this.props.routerParams}
                />
              </div>
            </div>
          </Fragment>
          <Fragment>
            <div className="newsContainer">
              <div className="newsContainerWrap">
                <GourmetNews
                  userData={this.state.userData}
                  routerParams={this.props.routerParams}
                />
              </div>
            </div>
          </Fragment>
          <Fragment>
            <div className="newsContainer">
              <div className="newsContainerWrap">
                <FashionNews
                  userData={this.state.userData}
                  routerParams={this.props.routerParams}
                />
              </div>
            </div>
          </Fragment>
          <Fragment>
            <div className="newsContainer">
              <div className="newsContainerWrap">
                <WriterNews
                  userData={this.state.userData}
                  routerParams={this.props.routerParams}
                />
              </div>
            </div>
          </Fragment>
        </SwipeAbleViews>
        <FootBar />
      </Fragment>
    );
  }
}

export default NewsTabs;
