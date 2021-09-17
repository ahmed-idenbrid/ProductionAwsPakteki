import React, { Component } from "react";
import "./SearchBar.css";
import { toast } from "react-toastify";

export default class SearchBar extends Component {
  state = {
    searchQuery: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchQuery === "" && this.props.searchQuery === "") {
      toast.warn("Please Enter Something To Search");
    } else {
      this.props.routerParams.history.push(
        "/news/search?title=" + this.state.searchQuery
      );
      this.forceUpdate(() => {
        window.location.reload();
      });
    }
  };

  componentDidMount() {
    if (this.props.searched) {
      const params = new URLSearchParams(
        this.props.routerParams.location.search
      );
      this.setState({
        searchQuery: params.get("title"),
      });
    }
  }

  render() {
    return (
      <div className="row searchbar-wrapper m-0 p-0">
        <form
          onSubmit={this.handleSubmit}
          className="col-12 px-1 p-0 d-flex align-items-center justify-content-between"
        >
          <span className="input-parent">
            <span className="search-icon">
              <svg
                fill="currentColor"
                viewBox="0 0 48 48"
                color="rgba(0, 0, 0, .2)"
                width="24"
                height="24"
              >
                <path
                  d="M21 32c-6.075 0-11-4.925-11-11s4.925-11 11-11 11 4.925 11 11-4.925 11-11 11m20.414 6.586l-8.499-8.499A14.919 14.919 0 0036 21c0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15a14.91 14.91 0 009.086-3.085l8.5 8.499a2 2 0 102.828-2.828"
                  fillRule="evenodd"
                ></path>
              </svg>
            </span>
            <input
              className="searchbar-input"
              type="search"
              placeholder="Please type here to search"
              value={this.state.searchQuery}
              onChange={(e) => {
                this.setState({
                  searchQuery: e.target.value,
                });
              }}
            />
          </span>
          <button className="searchbar-button m-0" type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }
}
