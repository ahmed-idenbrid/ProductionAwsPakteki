import React, { Component } from "react";
import "./Categories.css";
import { Link } from "react-router-dom";
import axios from "axios";
import gnnNews from "./PakNewsLogo/gnn.svg";
import geoNews from "./PakNewsLogo/geo.svg";
import dinNews from "./PakNewsLogo/din.svg";
import royalNews from "./PakNewsLogo/royal.svg";
import c42News from "./PakNewsLogo/c42.svg";
import bolNews from "./PakNewsLogo/bol.svg";
import duniyaNews from "./PakNewsLogo/duniya.svg";
import expressNews from "./PakNewsLogo/express.svg";
import NintyTwoNews from "./PakNewsLogo/92.svg";
import AbTkNews from "./PakNewsLogo/abtk.svg";
import DawnNews from "./PakNewsLogo/dawn.svg";
import UrduPointNews from "./PakNewsLogo/urdu-point.svg";
import SamaNews from "./PakNewsLogo/sama.svg";
import OnNews from "./PakNewsLogo/on.svg";
import NeoNews from "./PakNewsLogo/neo.svg";
import Mashion from './PakNewsLogo/Mashion.svg';
import HelloPakistan from './PakNewsLogo/Hello-Pakistan.svg';
import MangoBaaz from './PakNewsLogo/Mango-Baaz.svg';
import SundayNews from './PakNewsLogo/sunday-news.svg';
import UrduNews from './PakNewsLogo/urdu-news.svg';
import ZaiqaTV from './PakNewsLogo/Zaiqa-TV.svg';
import JhangNews from './PakNewsLogo/Jhang-News.svg';
import Swiper from "swiper/swiper-bundle";
import 'swiper/swiper-bundle.css';
export default class Categories extends Component {
  state = {
    weatherCityName: "lahore",
    currentTemp: "...",
    TomorrowTemp: "...",
    TomorrowHumidity: "...",
    CurrentHumidity: "...",
    WeatherIcon: "10d",
    WeatherMain: "...",
    key: "b9cfb1a798655c235698594be2c2a4ed",
  };
  componentDidMount() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=lahore&units=metric&appid=46368dc82bcd2961107873ea22aefdcf`
      )
      .then((response) => {
        this.setState({
          currentTemp: response.data["main"]["temp"],
          CurrentHumidity: response.data["main"]["humidity"],
          WeatherIcon: response.data["weather"][0]["icon"],
          WeatherMain: response.data["weather"][0]["main"],
          weatherCityName: response.data["name"],
        });
      });
      new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        speed:1000,
        grabCursor: true,
        loop: true,
        autoplay: {
            delay: 1,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 7,
                spaceBetween: 0,
            },
            600: {
                slidesPerView: 7,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 10,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 10,
                spaceBetween: 50,
            },
        }
    });

    navigator.geolocation.getCurrentPosition((position) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&units=metric&lon=${position.coords.longitude}&cnt=6&appid=${this.state.key}`
        )
        .then((response) => {
          this.setState({
            currentTemp: response.data.list[0].main.temp,
            TomorrowTemp: response.data.list[1].main.temp,
            WeatherIcon: response.data.list[0].weather[0].icon,
            TomorrowHumidity: response.data.list[1].main.humidity,
            CurrentHumidity: response.data.list[0].main.humidity,
          });
        });
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=46368dc82bcd2961107873ea22aefdcf`
        )
        .then((response) => {
          this.setState({
            weatherCityName: response.data.name,
          });
        });
    });
  }

  render() {

    return (
      <div className="my-0">
        <div className="weather-info-container-wrapper">
          <ul className="weather-info-container py-2 px-1 mb-0">
            <li className="sideBorders"></li>
            <div className='d-flex'>
              <li className="weather-data-tommorow mr-1">
                <div className="weather-pictorial-data d-flex flex-column">
                  <Link to="/news/islam" className="islam-icon mb-0 d-flex">
                    <img src="/assets/images/Islam-Button.svg" alt="" style={{ width: '3.5rem' }} />
                  </Link>
                </div>
              </li>
              <li className="weather-data-tommorow">
                <div className="weather-pictorial-data d-flex flex-column">
                  <Link to="/news/covid" className="covid-icon mb-0 d-flex">
                    <img src="/assets/images/Covid-Button.svg" alt="" style={{ width: '3.5rem' }} />
                  </Link>
                </div>
              </li>
            </div>
            <li className="sideBorders"></li>
            <li className="weather-data-today">
              <div className="weather-pictorial-data w-100">
                <img
                  className="weather-icons d-block text-center mx-auto"
                  src={`http://openweathermap.org/img/wn/${this.state.WeatherIcon}@2x.png`}
                  alt="1"
                />

                <p className="todays-weather">
                  <div>Today</div>
                  <span>{this.state.currentTemp}&#176;</span>/
                  <span> {this.state.CurrentHumidity}%</span>
                </p>
              </div>
            </li>
            <li className="sideBorders"></li>
            <div className="weather-numerical-data text-center">
              <p className="todays-weather">
                <div>Tomorrow</div>
                <span> {this.state.TomorrowTemp}&#176; </span>/
                <span> {this.state.TomorrowHumidity}%</span>
              </p>
            </div>
            <li className="sideBorders"></li>
            <li className="currentLocation px-2">
              <p className="currentLocationName">
                {this.state.weatherCityName}
              </p>
            </li>
            <li className="sideBorders"></li>
            {/* <li className='d-flex weather-data-imgs'>
                            <div className="weather-pictorial-data d-flex flex-column align-items-center">
                                <img className='weather-icons' src={`http://openweathermap.org/img/wn/${this.state.WeatherIcon}@2x.png`} alt="1" id='rain-cloud-icon' />
                                <p className='font-size-small text-center mb-0'>{this.state.WeatherMain}</p>
                            </div>
                        </li> */}
          </ul>
        </div>
        <div className="bg-white col-12">
          <p className="title-resources">Our news resources</p>
        </div>
        <div className="swiper-container categories-wrapper overflow-x-scroll bg-white">
          <ul className="swiper-wrapper py-2">
            {/* <li className='pr-3'>
                            <a href='https://idenbridinc.indenbrid.com/' rel="noopener noreferrer" target="_blank">
                                <img className='categories-icons' src="/assets/images/fav-purple.png" alt="" />
                            </a>
                        </li>
                        <li className='px-3'>
                            <a href='https://bizblanca.com/' rel="noopener noreferrer" target="_blank"><img className='categories-icons' src={BizblancaLogo} alt="" /></a>
                        </li> */}
            <li className='swiper-slide'>
              <Link to="/news/channelNews/Geo">
                <img className="categories-icons" src={geoNews} alt="GeoTV" />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/Bol">
                <img className="categories-icons" src={bolNews} alt="bolNews" />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/Dunya">
                <img
                  className="categories-icons"
                  src={duniyaNews}
                  alt="duniyaNews"
                />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/Express">
                <img
                  className="categories-icons"
                  src={expressNews}
                  alt="expressNews"
                />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/NinetyTwo">
                <img
                  className="categories-icons"
                  src={NintyTwoNews}
                  alt="NinetyTwoNews"
                />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/UrduPoint">
                <img
                  className="categories-icons"
                  src={UrduPointNews}
                  alt="UrduPointNews"
                />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/c42">
                <img className="categories-icons" src={c42News} alt="C42News" />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/Din">
                <img className="categories-icons" src={dinNews} alt="DinNews" />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/Neo">
                <img className="categories-icons" src={NeoNews} alt="NeoNews" />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/Royal">
                <img
                  className="categories-icons"
                  src={royalNews}
                  alt="RoyalNews"
                />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/Samaa">
                <img
                  className="categories-icons"
                  src={SamaNews}
                  alt="SammaNews"
                />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/Gnn">
                <img className="categories-icons" src={gnnNews} alt="GnnNews" />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/AbTk">
                <img
                  className="categories-icons"
                  src={AbTkNews}
                  alt="AbTkNews"
                />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/Dawn">
                <img
                  className="categories-icons"
                  src={DawnNews}
                  alt="DawnNews"
                />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/On">
                <img className="categories-icons" src={OnNews} alt="OneNews" />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/On">
                <img className="categories-icons" src={Mashion} alt="Mashion" />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/On">
                <img className="categories-icons" src={HelloPakistan} alt="HelloPakistan" />
              </Link>
            </li><li className='swiper-slide'>
              <Link to="/news/channelNews/On">
                <img className="categories-icons" src={MangoBaaz} alt="MangoBaaz" />
              </Link>
            </li><li className='swiper-slide'>
              <Link to="/news/channelNews/On">
                <img className="categories-icons" src={SundayNews} alt="SundayNews" />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/On">
                <img className="categories-icons" src={ZaiqaTV} alt="OneNews" />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/On">
                <img className="categories-icons" src={JhangNews} alt="OneNews" />
              </Link>
            </li>
            <li className='swiper-slide'>
              <Link to="/news/channelNews/On">
                <img className="categories-icons" src={UrduNews} alt="OneNews" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
