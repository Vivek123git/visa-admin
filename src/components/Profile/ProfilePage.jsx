import { Avatar, Card, CircularProgress, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { UserContext } from "../../App";
import Custombutton from "../../Common/Custombutton";
import Loder from "../../Loder/Loder";
import { notificationHandler } from "../../utils/Notification";
import get_admin_profile_api, { profile_update_admin_api } from "../api/profile";
import s from "./Profile.module.css";
const ProfilePage = () => {
  const [isLoading, setisLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const [imgloading, setimgloading] = useState(false);
  const [profiledata, setprofiledata] = useState({
    first_name: "",
    last_name: "",
    profile_img: "",
    password: "",
    number: "",
    email: "",
  });
  const changePicFunc = async (e) => {
    setimgloading(true);
    const fd = new FormData();
    fd.append("profile_img", e.target.files[0]);

    try {
      let res = await profile_update_admin_api(fd);
      if (res.data.status) {
        getProfile();
        setimgloading(false);
        notificationHandler({ type: "success", msg: res.data.message });
      } else {
        setimgloading(false);
        notificationHandler({ type: "success", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "danger", msg: error.message });
      console.log(error);
      setimgloading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    setisLoading(true);
    const res = await get_admin_profile_api();
    try {
      if (res.data.status) {
        setprofiledata({
          first_name: res.data.results.first_name,
          last_name: res.data.results.last_name,
          profile_img: res.data.results.profile_img,
          password: "",
          number: res.data.results.number,
          email: res.data.results.email,
        });
        dispatch({
          type: "USER",
          payload: {
            ...state,
            profile: res.data.results,
          },
        });

        setisLoading(false);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
        setisLoading(false);
      }
    } catch (error) {
      console.log(error);
      notificationHandler({ type: "danger", msg: res.error });
      setisLoading(false);
    }
  };

  const profileupdate = (e) => {
    setprofiledata({
      ...profiledata,
      [e.target.name]: e.target.value,
    });
  };

  const profileSubmitFunc = async () => {
    const fd = new FormData();
    fd.append("first_name", profiledata.first_name);
    fd.append("last_name", profiledata.last_name);
    fd.append("number", profiledata.number);
    fd.append("password", profiledata.password);
    fd.append("email", profiledata.email);

    try {
      let res = await profile_update_admin_api(fd);
      if (res.data.status) {
        console.log(res);
        getProfile();
        notificationHandler({ type: "success", msg: res.data.message });
      } else {
        notificationHandler({ type: "success", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "danger", msg: error.message });
      console.log(error);
    }
  };

  return (
    <>
      <section className={s["profile-page"]}>
        <Card>
          <div className={s["profile-container"]}>
            <div className="profile-content">
              <div className="user-profile-image">
                <div className={s["profile_details"]}>
                  <div className={s["avatar"]}>
                    {!imgloading ? <Avatar alt="Profile Pic" src={profiledata.profile_img} style={{ height: "8rem", width: "8rem" }} /> : <CircularProgress />}
                    <label>
                      <AiOutlineCamera className={s["camera_icon"]} />
                      <input type="file" onChange={(e) => changePicFunc(e)} name="myfile" accept="image/*" style={{ display: "none" }} />
                    </label>
                  </div>
                </div>
              </div>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profiledata.first_name}
                      name="first_name"
                      onChange={(e) => profileupdate(e)}
                      placeholder="First Name"
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profiledata.last_name}
                      name="last_name"
                      onChange={(e) => profileupdate(e)}
                      placeholder="Last Name"
                    />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profiledata.number}
                      name="number"
                      onChange={(e) => profileupdate(e)}
                      placeholder="number"
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={profiledata.password}
                      onChange={(e) => profileupdate(e)}
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={profiledata.email}
                      name="eamil"
                      onChange={(e) => profileupdate(e)}
                      placeholder="Email"
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className={s["form-login-btn"]} onClick={profileSubmitFunc}>
              <Custombutton>Submit</Custombutton>
            </div>
          </div>
        </Card>
      </section>
      <Loder loading={isLoading} />
    </>
  );
};

export default ProfilePage;
