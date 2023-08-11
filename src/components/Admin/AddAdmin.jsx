import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import s from "./admin.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { create_admin_api, update_admin_api } from "../api/admin";
import { notificationHandler } from "../../utils/Notification";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { useLocation } from "react-router-dom";
import { Card, Grid } from "@mui/material";
const AddAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [file, setfile] = useState(null);
  const [role, setRole] = useState("");
  const pagetype = location.state.pagetype;
  useEffect(() => {
    setfirstname(location?.state?.data?.first_name);
    setlastname(location?.state?.data?.last_name);
    setemail(location?.state?.data?.email);
    setphone(location?.state?.data?.number);
    setRole(location?.state?.data?.role);
    setpassword("");
    setfile("");
    console.log(location);
  }, [location]);

  const create_admin = async () => {
    console.log(pagetype == "Add");

    if (!blankValidator(firstname)) {
      alert("Please enter first name");
      return;
    }
    if (!emailValidator(email)) {
      alert("Please enter vailid Email");
      return;
    }
    if (pagetype == "Add") {
      if (!blankValidator(password)) {
        alert("Please enter password");
        return;
      }
    }

    if (!blankValidator(phone)) {
      alert("Please enter Phone Number");
      return;
    }

    if (pagetype == "Add") {
      const fd = new FormData();
      fd.append("first_name", firstname);
      fd.append("last_name", lastname);
      fd.append("email", email);
      fd.append("number", phone);
      fd.append("password", password);
      fd.append("profile_img", file);
      fd.append("roleName", role);
      try {
        let res = await create_admin_api(fd);
        if (res.data.status) {
          navigate(-1);
          notificationHandler({ type: "success", msg: res.data.message });
        } else {
          notificationHandler({ type: "success", msg: res.data.message });
        }
      } catch (error) {
        notificationHandler({ type: "danger", msg: error.message });
        console.log(error);
      }
    }
    if (pagetype == "Edit") {
      const fd = new FormData();
      fd.append("first_name", firstname);
      fd.append("last_name", lastname);
      fd.append("email", email);
      fd.append("number", phone);
      fd.append("password", password);
      fd.append("id", location?.state?.data?.id);
      fd.append("profile_img", file);
      fd.append("roleName", role);
      try {
        let res = await update_admin_api(fd);
        if (res.data.status) {
          navigate(-1);
          notificationHandler({ type: "success", msg: res.data.message });
        } else {
          notificationHandler({ type: "success", msg: res.data.message });
        }
      } catch (error) {
        notificationHandler({ type: "danger", msg: error.message });
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="">
        <Card className={s["admin_container"]}>
          <div className={s["title"]} onClick={() => navigate(-1)}>
            <BiArrowBack />
            Back
          </div>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
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
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                  placeholder="Last Name"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="eami"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Email"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Mobile Number</label>
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  placeholder="Mobile Number"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Password</label>
                <input
                  className="form-control"
                  type="password"
                  disabled={pagetype == "Edit" ? "disabled" : ""}
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Password*"
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Image</label>
                <div className="  mr-2">
                  <input
                    type="file"
                    className="form-control"
                    name="img"
                    placeholder=""
                    accept="image/*"
                    onChange={(e) => setfile(e.target.files[0])}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Role</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option selected value="">
                    Select Role
                  </option>
                  <option value="ADMIN">Admin</option>
                  <option value="HR">HR</option>
                </select>
              </div>
            </Grid>
          </Grid>
          <div className={s["form-login-btn"]} onClick={() => create_admin()}>
            <Custombutton>Submit</Custombutton>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddAdmin;
