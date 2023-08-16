import React, { useState, useContext, useEffect } from "react";
import s from "./auth.module.css";
// import logo from "../../assets/icons/logo.svg";

import { FaRegUser } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Custombutton from "../../Common/Custombutton";
import { useNavigate } from "react-router-dom";
import {authapi} from "../api/auth";
import Cookies from "js-cookie";
import { UserContext } from "../../App";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { notificationHandler } from "../../utils/Notification";
const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [showPass, setshowPass] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setisloading] = useState(false);

  useEffect(() => {
    Cookies.remove("token");
    Cookies.remove("auth");
  }, []);

  const logo = "https://img.freepik.com/free-vector/detailed-travel-logo-concept_23-2148623454.jpg?size=626&ext=jpg&ga=GA1.2.1287514297.1687952197&semt=ais"

  const adminlogin = async () => {
    if (!emailValidator(email)) {
      alert("Email is not valid");
      return;
    }
    if (!blankValidator(password)) {
      alert("Please Enter password");
      return;
    }
    setisloading(true);
    let temp = {
      email,
      password,
    };
    try {
      const res = await authapi(temp);
      if (res.data.status) {
        console.log(res);
        const token = res.data.token;
        Cookies.set("token", token, { secure: true }, { sameSite: "strict" }, { expires: 365 });
        Cookies.set("auth", true, { secure: true }, { sameSite: "strict" }, { expires: 365 });
        dispatch({
          type: "USER",
          payload: {
            ...state,
            profile: res.data.results,
          },
        });
        navigate("/dashboard");
        notificationHandler({ type: "success", msg: res.data.message });
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error.message });
      setisloading(false);
    }
  };
  return (
    <>
      <section className="login-section">
        <div className="login-container">
          <div className={s["login-content"]}>
            <div className={s["login-content-left"]}>
              <div className={s["logo-img"]}>
                <img src={logo} style={{ width: "100%", height: "100%" }} alt="logo" draggable="false" />
              </div>
            </div>
            <div className={s["login-content-right"]}>
              <div className={s["login-title"]}>
                <h2>Welcome Back! </h2>
              </div>
              <div className={s["form-container"]}>
                <div className={s["login-form"]}>
                  <label>Email address</label>
                  <div className={`${s.inputBox}`}>
                    <FaRegUser size={14} style={{ color: "#000" }} />
                    <input type="text" placeholder="Email*" value={email} onChange={(e) => setemail(e.target.value)} />
                  </div>
                </div>
                <div className="login-form">
                  <label>Password</label>
                  <div className={`${s.inputBox}`}>
                    <FiLock size={18} style={{ color: "#000" }} />
                    <input type={showPass ? "text" : "password"} value={password} placeholder="Password*" onChange={(e) => setpassword(e.target.value)} />
                    {showPass ? (
                      <BsEyeSlash className={s.showHideEye} style={{ color: "#000" }} onClick={() => setshowPass(false)} />
                    ) : (
                      <BsEye className={s.showHideEye} style={{ color: "#000" }} onClick={() => setshowPass(true)} />
                    )}
                  </div>
                </div>
                <div className={s["forgot-password"]}>
                  Forgot password? <span onClick={() => navigate("/reset-password")}>Reset</span>
                </div>
                <div className={s["form-login-btn"]} onClick={() => adminlogin()}>
                  <Custombutton>Login</Custombutton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
