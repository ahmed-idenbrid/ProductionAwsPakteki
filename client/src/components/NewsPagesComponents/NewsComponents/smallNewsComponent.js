import React, { Fragment } from "react";
import "./smallNews.css";
import { FaRegEye } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
// import dinNews from "../../Categories/PakNewsLogo/din.svg";
import gnnNews from "../../Categories/PakNewsLogo/gnn.svg";
import geoNews from "../../Categories/PakNewsLogo/geo.svg";
import royalNews from "../../Categories/PakNewsLogo/royal.svg";
import c42News from "../../Categories/PakNewsLogo/c42.svg";
import bolNews from "../../Categories/PakNewsLogo/bol.svg";
import duniyaNews from "../../Categories/PakNewsLogo/duniya.svg";
import expressNews from "../../Categories/PakNewsLogo/express.svg";
import NintyTwoNews from "../../Categories/PakNewsLogo/92.svg";
import AbTkNews from "../../Categories/PakNewsLogo/abtk.svg";
import DawnNews from "../../Categories/PakNewsLogo/dawn.svg";
import UrduPointNews from "../../Categories/PakNewsLogo/urdu-point.svg";
import SamaNews from "../../Categories/PakNewsLogo/sama.svg";
import OnNews from "../../Categories/PakNewsLogo/on.svg";
import HelloPakistan from "../../Categories/PakNewsLogo/Hello-Pakistan.svg";
import MangoBaaz from "../../Categories/PakNewsLogo/Mango-Baaz.svg";
import SundayNews from "../../Categories/PakNewsLogo/sunday-news.svg";
import UrduNews from "../../Categories/PakNewsLogo/urdu-news.svg";
import ZaiqaTV from "../../Categories/PakNewsLogo/Zaiqa-TV.svg";
import JhangNews from "../../Categories/PakNewsLogo/Jhang-News.svg";
import NeoNews from "../../Categories/PakNewsLogo/neo.svg";

const smallNewsComponent = ({ newsObj }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  React.useEffect(() => {
    setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
  }, []);
  return (
    <Fragment>
      <div className="smallNewsArticle">
        <figure className="Image">
          <div
            className="smallArticleImage"
            style={{ backgroundImage: `url(${newsObj.image})` }}
          ></div>
        </figure>
        <div className="newsContent">
          <h1 className="small-news-title" style={{}}>{newsObj.title}</h1>
          <div className="dynamic-values">
            <ul>
              <li>
                <small className="newsDate">{newsObj.date}</small>
              </li>
              <li className="comments-icon">
                <FiMessageSquare />
                <span className="counter-comments">
                  {newsObj.no_of_comments}
                </span>
              </li>
              <li className="viewIcon">
                <FaRegEye />
                <span className="counter-views">
                  {newsObj.no_of_registered_views +
                    newsObj.no_of_nonregistered_views}
                </span>
                {currentDate <
                new Date(newsObj.date).setHours(
                  new Date(newsObj.date).getHours() + 3
                ) ? (
                  <span className="new-news-label px-2">NEW</span>
                ) : null}
              </li>
            </ul>
            <small className="news-channel">
              <img
                className="w-1rem"
                src={
                  newsObj.channel === "Dawn"
                    ? DawnNews
                    : newsObj.channel === "city42"
                    ? c42News
                    : newsObj.channel === "GEO"
                    ? geoNews
                    : newsObj.channel === "Urdupoint"
                    ? UrduPointNews
                    : newsObj.channel === "Express"
                    ? expressNews
                    : newsObj.channel === "SAMAA"
                    ? SamaNews
                    : newsObj.channel === "NeoNetwork"
                    ? NeoNews
                    : newsObj.channel === "Bol"
                    ? bolNews
                    : newsObj.channel === "AbbTakk"
                    ? AbTkNews
                    : newsObj.channel === "92News"
                    ? NintyTwoNews
                    : newsObj.channel === "24NewsHD"
                    ? duniyaNews
                    : newsObj.channel === "Royalnews"
                    ? royalNews
                    : newsObj.channel === "Newsone"
                    ? OnNews
                    : newsObj.channel === "GNN"
                    ? gnnNews
                    : newsObj.channel === "Dunya"
                    ? duniyaNews
                    : newsObj.channel === "Dunya"
                    ? MangoBaaz
                    : newsObj.channel === "Dunya"
                    ? SundayNews
                    : newsObj.channel === "Dunya"
                    ? UrduNews
                    : newsObj.channel === "Dunya"
                    ? ZaiqaTV
                    : newsObj.channel === "Dunya"
                    ? JhangNews
                    : newsObj.channel === "Dunya"
                    ? HelloPakistan
                    : newsObj.channel
                }
                alt="channel"
              />
            </small>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default smallNewsComponent;
