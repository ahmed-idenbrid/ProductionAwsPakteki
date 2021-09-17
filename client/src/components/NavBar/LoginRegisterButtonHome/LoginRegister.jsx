import React from "react";
import "./LoginRegister.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LoginRegister = () => {
  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    toast.success("LogOut Successfull", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setToken((prev) => {
      prev = "";
    });
  };

  return (
    <div>
      <div className="row m-0 w-100 justify-content-between py-1">
        {token ? (
          <>
            <div
              className="col-6 w-100 border d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "#F1F4F6" }}
            >
              <Link onClick={handleLogOut}>
                <p className="m-0 py-1 login">
                  <b>LogOut</b>
                </p>
              </Link>
            </div>
            <div
              className="col-6 w-100 border d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "#F1F4F6" }}
            >
              <Link to="">
                <p className="m-0 py-1 register">
                  <b></b>Avatar
                </p>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div
              className="col-6 w-100 border d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "#F1F4F6" }}
            >
              <Link to="/login">
                <p className="m-0 py-1 login">
                  <b>Login</b>
                </p>
              </Link>
            </div>
            <div
              className="col-6 w-100 border d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "#F1F4F6" }}
            >
              <Link to="/register">
                <p className="m-0 py-1 register">
                  <b>Register</b>
                </p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
