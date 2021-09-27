import React, { Component } from "react";
import "./Setting.css";
// import logo from "../assets/pakteki-logo.svg";
import FootBar from "../FootBar/FootBar";
import NavBar from "../NavBar/Navbar";
import $ from "jquery";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import dumyProfilePic from '../assets/no-profile.png'

export default class settings extends Component {
  state = {
    fullName: "",
    username: "",
    email: "",
    DOB: "",
    gender: "",
    city: "",
    profileImage: "",
    userID: "",
    mounted: false,
  };

  componentDidMount() {
    const config = {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };
    axios.get("http://3.142.50.232:5000/api/auth/user", config).then((res) => {
      if (res.data.Message) {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        this.props.history.push("/login");
      } else {
        this.setState(
          {
            fullName: res.data.fullName,
            username: res.data.username,
            email: res.data.email,
            DOB: res.data.DOB,
            gender: res.data.gender,
            city: res.data.city,
            profileImage: res.data.profilePicture,
            userID: res.data._id,
          },
          () => {
            this.setState({
              mounted: true,
            });
            localStorage.setItem("userData", JSON.stringify(res.data));
          }
        );
      }
    });

    $("#imageUpload").on("change", (input) => {
      if (input.target.files && input.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $("#imagePreview").attr("src", `${e.target.result}`);
          $("#imagePreview").hide();
          $("#imagePreview").fadeIn(650);
        };
        reader.readAsDataURL(input.target.files[0]);
      }
    });
  }

  handleChangeType = (e) => {
    var menu = document.querySelector(".fa-eye");
    menu.classList.toggle("fa-eye-slash");
    const password = document.querySelector("#password_input");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    const _confirm_password_input = document.querySelector(
      "#_confirm_password_input"
    );
    const type1 =
      _confirm_password_input.getAttribute("type") === "password"
        ? "text"
        : "password";
    _confirm_password_input.setAttribute("type", type1);
  };

  render() {
    return (
      <React.Fragment>
        <NavBar history={this.props.history} />
        <div className="SettingContainer">
          {/* <img src={logo} className="col-6 col-md-3" alt="logo img" /> */}
          {this.state.mounted ? (
            <div className="user-upload">
              <div className="user-edit">
                <input
                  type="file"
                  id="imageUpload"
                  name="profilePicture"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => {
                    this.setState({
                      profileImage: e.target.files[0],
                    });
                  }}
                />
                <label
                  htmlFor="imageUpload"
                  className="d-flex justify-content-center align-items-center"
                >
                  <i className="far fa-edit"></i>
                </label>
              </div>
              <div className="user-preview">
                <img
                  src={this.state.profileImage ? this.state.profileImage : dumyProfilePic }
                  alt="img not found"
                  className="h-100 w-100 rounded-circle"
                  id="imagePreview"
                />
              </div>
            </div>
          ) : (
            <div className="user-upload">
              <div className="user-edit">
                <input
                  type="file"
                  id="imageUpload"
                  name="profilePicture"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => {
                    this.setState({
                      profileImage: e.target.files[0],
                    });
                  }}
                />
                <label
                  htmlFor="imageUpload"
                  className="d-flex justify-content-center align-items-center"
                >
                  <i className="far fa-edit"></i>
                </label>
              </div>
              <div className="user-preview">
                <div
                  id="imagePreview"
                  style={{
                    backgroundImage:
                      "url(https://freesvg.org/img/abstract-user-flat-4.png)",
                  }}
                ></div>
              </div>
            </div>
          )}

          <div className="h4 py-2">Settings</div>
          <Tabs className="user-settings-tab w-100">
            <TabList>
              <Tab>General</Tab>
              <Tab>Security</Tab>
            </TabList>

            <TabPanel className="d-flex align-items-center justify-content-around">
              <div className="col-11">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData();
                    formData.append("fullName", this.state.fullName);
                    formData.append("username", this.state.username);
                    formData.append("email", this.state.email);
                    formData.append("DOB", this.state.DOB);
                    formData.append("gender", this.state.gender);
                    formData.append("city", this.state.city);
                    formData.append("profilePicture", this.state.profileImage);
                    const config = {
                      headers: {
                        "Content-Type": "multipart/form-data",
                        "auth-token": localStorage.getItem("token"),
                      },
                    };
                    axios.put(
                      "http://3.142.50.232:5000/api/auth/user/update",
                      formData,
                      config
                    );
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    className="p-2 mb-2 w-100"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={(e) => {
                      this.setState({
                        fullName: e.target.value,
                      });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Enter Username / Comment name"
                    className="p-2 mb-2 w-100"
                    name="username"
                    value={this.state.username}
                    onChange={(e) => {
                      this.setState({ username: e.target.value });
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-2 mb-2 w-100"
                    name="email"
                    value={this.state.email}
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                  />
                  <label>D-O-B:</label>
                  <input
                    type="date"
                    className="p-2 mb-2 w-100"
                    value={this.state.DOB}
                    onChange={(e) => {
                      this.setState({ DOB: e.target.value });
                    }}
                  />
                  <div className="gender">
                    <label htmlFor="" className="mr-2">
                      Gender:
                    </label>
                    <input
                      className="mr-1"
                      type="radio"
                      name="gender-male"
                      value="male"
                      checked={this.state.gender === "male" ? true : false}
                      onChange={(e) => {
                        this.setState({ gender: e.target.value }, () => {
                          console.log(this.state);
                        });
                      }}
                    />
                    <label htmlFor="male">Male</label>
                    <input
                      className="ml-2 mr-1"
                      type="radio"
                      name="gender-female"
                      value="female"
                      checked={this.state.gender === "female" ? true : false}
                      onChange={(e) => {
                        this.setState({ gender: e.target.value });
                      }}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  <select
                    className="p-2 mb-2 w-100"
                    name="city"
                    value={this.state.city}
                    onChange={(e) => {
                      this.setState({ city: e.target.value });
                    }}
                  >
                    <option value="" disabled>
                      Select City
                    </option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="" disabled>
                      Punjab Cities
                    </option>
                    <option value="Ahmed Nager Chatha">
                      Ahmed Nager Chatha
                    </option>
                    <option value="Ahmadpur East">Ahmadpur East</option>
                    <option value="Ali Khan Abad">Ali Khan Abad</option>
                    <option value="Alipur">Alipur</option>
                    <option value="Arifwala">Arifwala</option>
                    <option value="Attock">Attock</option>
                    <option value="Bhera">Bhera</option>
                    <option value="Bhalwal">Bhalwal</option>
                    <option value="Bahawalnagar">Bahawalnagar</option>
                    <option value="Bahawalpur">Bahawalpur</option>
                    <option value="Bhakkar">Bhakkar</option>
                    <option value="Burewala">Burewala</option>
                    <option value="Chillianwala">Chillianwala</option>
                    <option value="Chakwal">Chakwal</option>
                    <option value="Chichawatni">Chichawatni</option>
                    <option value="Chiniot">Chiniot</option>
                    <option value="Chishtian">Chishtian</option>
                    <option value="Daska">Daska</option>
                    <option value="Darya Khan">Darya Khan</option>
                    <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                    <option value="Dhaular">Dhaular</option>
                    <option value="Dina">Dina</option>
                    <option value="Dinga">Dinga</option>
                    <option value="Dipalpur">Dipalpur</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Ferozewala">Ferozewala</option>
                    <option value="Fateh Jhang">Fateh Jang</option>
                    <option value="Ghakhar Mandi">Ghakhar Mandi</option>
                    <option value="Gojra">Gojra</option>
                    <option value="Gujranwala">Gujranwala</option>
                    <option value="Gujrat">Gujrat</option>
                    <option value="Gujar Khan">Gujar Khan</option>
                    <option value="Hafizabad">Hafizabad</option>
                    <option value="Haroonabad">Haroonabad</option>
                    <option value="Hasilpur">Hasilpur</option>
                    <option value="Haveli Lakha">Haveli Lakha</option>
                    <option value="Jatoi">Jatoi</option>
                    <option value="Jalalpur">Jalalpur</option>
                    <option value="Jattan">Jattan</option>
                    <option value="Jampur">Jampur</option>
                    <option value="Jaranwala">Jaranwala</option>
                    <option value="Jhang">Jhang</option>
                    <option value="Jhelum">Jhelum</option>
                    <option value="Kalabagh">Kalabagh</option>
                    <option value="Karor Lal Esan">Karor Lal Esan</option>
                    <option value="Kasur">Kasur</option>
                    <option value="Kamalia">Kamalia</option>
                    <option value="Kamoke">Kamoke</option>
                    <option value="Khanewal">Khanewal</option>
                    <option value="Khanpur">Khanpur</option>
                    <option value="Kharian">Kharian</option>
                    <option value="Khushab">Khushab</option>
                    <option value="Kot Addu">Kot Addu</option>
                    <option value="Jauharabad">Jauharabad</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Lalamusa">Lalamusa</option>
                    <option value="Layyah">Layyah</option>
                    <option value="Liaquat Pur">Liaquat Pur</option>
                    <option value="Lodhran">Lodhran</option>
                    <option value="Malakwal">Malakwal</option>
                    <option value="Mamoori">Mamoori</option>
                    <option value="Mailsi">Mailsi</option>
                    <option value="Mandi Bahauddin">Mandi Bahauddin</option>
                    <option value="Mian Channu">Mian Channu</option>
                    <option value="Mianwali">Mianwali</option>
                    <option value="Multan">Multan</option>
                    <option value="Murree">Murree</option>
                    <option value="Muridke">Muridke</option>
                    <option value="Mianwali Bangla">Mianwali Bangla</option>
                    <option value="Muzaffargarh">Muzaffargarh</option>
                    <option value="Narowal">Narowal</option>
                    <option value="Nankana Sahib">Nankana Sahib</option>
                    <option value="Okara">Okara</option>
                    <option value="Renala Khurd">Renala Khurd</option>
                    <option value="Pakpattan">Pakpattan</option>
                    <option value="Pattoki">Pattoki</option>
                    <option value="Pir Mahal">Pir Mahal</option>
                    <option value="Qaimpur">Qaimpur</option>
                    <option value="Qila Didar Singh">Qila Didar Singh</option>
                    <option value="Rabwah">Rabwah</option>
                    <option value="Raiwind">Raiwind</option>
                    <option value="Rajanpur">Rajanpur</option>
                    <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Sadiqabad">Sadiqabad</option>
                    <option value="Safdarabad">Safdarabad</option>
                    <option value="Sahiwal">Sahiwal</option>
                    <option value="Sangla Hill">Sangla Hill</option>
                    <option value="Sarai Alamgir">Sarai Alamgir</option>
                    <option value="Sargodha">Sargodha</option>
                    <option value="Shakargarh">Shakargarh</option>
                    <option value="Sheikhupura">Sheikhupura</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Sohawa">Sohawa</option>
                    <option value="Soianwala">Soianwala</option>
                    <option value="Siranwali">Siranwali</option>
                    <option value="Talagang">Talagang</option>
                    <option value="Taxila">Taxila</option>
                    <option value="Toba Tek Singh">Toba Tek Singh</option>
                    <option value="Vehari">Vehari</option>
                    <option value="Wah Cantonment">Wah Cantonment</option>
                    <option value="Wazirabad">Wazirabad</option>
                    <option value="" disabled>
                      Sindh Cities
                    </option>
                    <option value="Badin">Badin</option>
                    <option value="Bhirkan">Bhirkan</option>
                    <option value="Rajo Khanani">Rajo Khanani</option>
                    <option value="Chak">Chak</option>
                    <option value="Dadu">Dadu</option>
                    <option value="Digri">Digri</option>
                    <option value="Diplo">Diplo</option>
                    <option value="Dokri">Dokri</option>
                    <option value="Ghotki">Ghotki</option>
                    <option value="Haala">Haala</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Islamkot">Islamkot</option>
                    <option value="Jacobabad">Jacobabad</option>
                    <option value="Jamshoro">Jamshoro</option>
                    <option value="Jungshahi">Jungshahi</option>
                    <option value="Kandhkot">Kandhkot</option>
                    <option value="Kandiaro">Kandiaro</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Kashmore">Kashmore</option>
                    <option value="Keti Bandar">Keti Bandar</option>
                    <option value="Khairpur">Khairpur</option>
                    <option value="Kotri">Kotri</option>
                    <option value="Larkana">Larkana</option>
                    <option value="Matiari">Matiari</option>
                    <option value="Mehar">Mehar</option>
                    <option value="Mirpur Khas">Mirpur Khas</option>
                    <option value="Mithani">Mithani</option>
                    <option value="Mithi">Mithi</option>
                    <option value="Mehrabpur">Mehrabpur</option>
                    <option value="Moro">Moro</option>
                    <option value="Nagarparkar">Nagarparkar</option>
                    <option value="Naudero">Naudero</option>
                    <option value="Naushahro Feroze">Naushahro Feroze</option>
                    <option value="Naushara">Naushara</option>
                    <option value="Nawabshah">Nawabshah</option>
                    <option value="Nazimabad">Nazimabad</option>
                    <option value="Qambar">Qambar</option>
                    <option value="Qasimabad">Qasimabad</option>
                    <option value="Ranipur">Ranipur</option>
                    <option value="Ratodero">Ratodero</option>
                    <option value="Rohri">Rohri</option>
                    <option value="Sakrand">Sakrand</option>
                    <option value="Sanghar">Sanghar</option>
                    <option value="Shahbandar">Shahbandar</option>
                    <option value="Shahdadkot">Shahdadkot</option>
                    <option value="Shahdadpur">Shahdadpur</option>
                    <option value="Shahpur Chakar">Shahpur Chakar</option>
                    <option value="Shikarpaur">Shikarpaur</option>
                    <option value="Sukkur">Sukkur</option>
                    <option value="Tangwani">Tangwani</option>
                    <option value="Tando Adam Khan">Tando Adam Khan</option>
                    <option value="Tando Allahyar">Tando Allahyar</option>
                    <option value="Tando Muhammad Khan">
                      Tando Muhammad Khan
                    </option>
                    <option value="Thatta">Thatta</option>
                    <option value="Umerkot">Umerkot</option>
                    <option value="Warah">Warah</option>
                    <option value="" disabled>
                      Khyber Cities
                    </option>
                    <option value="Abbottabad">Abbottabad</option>
                    <option value="Adezai">Adezai</option>
                    <option value="Alpuri">Alpuri</option>
                    <option value="Akora Khattak">Akora Khattak</option>
                    <option value="Ayubia">Ayubia</option>
                    <option value="Banda Daud Shah">Banda Daud Shah</option>
                    <option value="Bannu">Bannu</option>
                    <option value="Batkhela">Batkhela</option>
                    <option value="Battagram">Battagram</option>
                    <option value="Birote">Birote</option>
                    <option value="Chakdara">Chakdara</option>
                    <option value="Charsadda">Charsadda</option>
                    <option value="Chitral">Chitral</option>
                    <option value="Daggar">Daggar</option>
                    <option value="Dargai">Dargai</option>
                    <option value="Darya Khan">Darya Khan</option>
                    <option value="Dera Ismail Khan">Dera Ismail Khan</option>
                    <option value="Doaba">Doaba</option>
                    <option value="Dir">Dir</option>
                    <option value="Drosh">Drosh</option>
                    <option value="Hangu">Hangu</option>
                    <option value="Haripur">Haripur</option>
                    <option value="Karak">Karak</option>
                    <option value="Kohat">Kohat</option>
                    <option value="Kulachi">Kulachi</option>
                    <option value="Lakki Marwat">Lakki Marwat</option>
                    <option value="Latamber">Latamber</option>
                    <option value="Madyan">Madyan</option>
                    <option value="Mansehra">Mansehra</option>
                    <option value="Mardan">Mardan</option>
                    <option value="Mastuj">Mastuj</option>
                    <option value="Mingora">Mingora</option>
                    <option value="Nowshera">Nowshera</option>
                    <option value="Paharpur">Paharpur</option>
                    <option value="Pabbi">Pabbi</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Saidu Sharif">Saidu Sharif</option>
                    <option value="Shorkot">Shorkot</option>
                    <option value="Shewa Adda">Shewa Adda</option>
                    <option value="Swabi">Swabi</option>
                    <option value="Swat">Swat</option>
                    <option value="Tangi">Tangi</option>
                    <option value="Tank">Tank</option>
                    <option value="Thall">Thall</option>
                    <option value="Timergara">Timergara</option>
                    <option value="Tordher">Tordher</option>
                    <option value="" disabled>
                      Balochistan Cities
                    </option>
                    <option value="Awaran">Awaran</option>
                    <option value="Barkhan">Barkhan</option>
                    <option value="Chagai">Chagai</option>
                    <option value="Dera Bugti">Dera Bugti</option>
                    <option value="Gwadar">Gwadar</option>
                    <option value="Harnai">Harnai</option>
                    <option value="Jafarabad">Jafarabad</option>
                    <option value="Jhal Magsi">Jhal Magsi</option>
                    <option value="Kacchi">Kacchi</option>
                    <option value="Kalat">Kalat</option>
                    <option value="Kech">Kech</option>
                    <option value="Kharan">Kharan</option>
                    <option value="Khuzdar">Khuzdar</option>
                    <option value="Killa Abdullah">Killa Abdullah</option>
                    <option value="Killa Saifullah">Killa Saifullah</option>
                    <option value="Kohlu">Kohlu</option>
                    <option value="Lasbela">Lasbela</option>
                    <option value="Lehri">Lehri</option>
                    <option value="Loralai">Loralai</option>
                    <option value="Mastung">Mastung</option>
                    <option value="Musakhel">Musakhel</option>
                    <option value="Nasirabad">Nasirabad</option>
                    <option value="Nushki">Nushki</option>
                    <option value="Panjgur">Panjgur</option>
                    <option value="Pishin Valley">Pishin Valley</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Sherani">Sherani</option>
                    <option value="Sibi">Sibi</option>
                    <option value="Sohbatpur">Sohbatpur</option>
                    <option value="Washuk">Washuk</option>
                    <option value="Zhob">Zhob</option>
                    <option value="Ziarat">Ziarat</option>
                  </select>

                  <button className="btn info mt-3 btn-block text-capitalize">
                    Save
                  </button>
                </form>
              </div>
            </TabPanel>

            <TabPanel className="d-flex align-items-center justify-content-center pt-5">
              <div className="col-11">
                <li className="w-100">
                  <input
                    id="password_input"
                    pattern=".{8,}"
                    type="password"
                    placeholder="Password"
                    className="p-2 mb-2 w-100"
                  />
                  <i
                    className="eyeicon far fa-eye"
                    onClick={this.handleChangeType}
                  ></i>
                </li>

                <li className="w-100 d-flex align-items-center position-relative">
                  <input
                    id="_confirm_password_input"
                    pattern=".{8,}"
                    type="password"
                    placeholder="Re-type password"
                    className="p-2 w-100"
                  />
                </li>
                <button style={{fontWeight:"600"}} className="btn info btn-block my-5 text-capitalize">
                  Save
                </button>
              </div>
            </TabPanel>
          </Tabs>
        </div>
        <FootBar />
      </React.Fragment>
    );
  }
}
