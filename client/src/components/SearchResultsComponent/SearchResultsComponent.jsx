import React from "react";
import axios from "axios";
import { BaseURL } from "../../app/common";
import { Spinner } from "react-bootstrap";
import SmallNewsComponent from "../NewsPagesComponents/NewsComponents/smallNewsComponent";
import { toast } from "react-toastify";
import FootBar from "../FootBar/FootBar";
import NavBar from "../NavBar/Navbar";
import SearchBar from "../SearchBar/SearchBar";

class SearchResultsComponent extends React.Component {
  state = {
    searchQuery: "",
    searchedData: [],
    userId: "",
    mounted: false,
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.routerParams.location.search);
    this.setState(
      {
        searchQuery: params.get("title"),
      },
      () => {
        axios
          .get(`${BaseURL}/news/search?title=${this.state.searchQuery}`)
          .then((res) => {
            if (res.data.length > 0) {
              this.setState({
                searchedData: res.data,
                mounted: true,
              });
            } else {
              this.setState({
                mounted: true,
              });
            }
          });
      }
    );
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
            userData: res.data._id,
          },
          () => {
            localStorage.setItem("userData", JSON.stringify(res.data));
          }
        );
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <SearchBar routerParams={this.props.routerParams} searched={true} />
        {this.state.searchedData.length === 0 && this.state.mounted ? (
          <div
            style={{ height: "78vh", width: "100%" }}
            className="d-flex align-items-center justify-content-center bg-white"
          >
            <h3>No News To Show</h3>
          </div>
        ) : null}
        {this.state.mounted ? (
          this.state.searchedData.map((obj, index) => {
            return (
              <article
                key={index}
                className="row m-0 p-0 single_article"
                onClick={() => {
                  axios
                    .post(BaseURL + "/news/increaseViews", {
                      newsId: obj._id,
                      userId: this.state.userId === "" ? "" : this.state.userId,
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
          })
        ) : (
          <div
            style={{ height: "50vh", width: "100%" }}
            className="d-flex align-items-center justify-content-center"
          >
            <Spinner animation="border" />
          </div>
        )}
        <FootBar />
      </React.Fragment>
    );
  }
}

export default SearchResultsComponent;
