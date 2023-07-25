import React, { useState, useEffect } from "react";
import s from "./articles.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { notificationHandler } from "../../utils/Notification";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { useLocation } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import { article_add_api, article_update_api } from "../api/article";
const AddArticle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [profileImg, setprofileImg] = useState(null);
  const pagetype = location.state.pagetype;
  console.log(location);
  useEffect(() => {
    setname(location?.state?.data?.name);
    setdescription(location?.state?.data?.description);
  }, [location]);

  const create_user = async () => {
    if (pagetype == "Add") {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("image", profileImg);
      fd.append("description", description);
      fd.append("category_id", "63e9dd2a9df418582eb58f34");
      try {
        let res = await article_add_api(fd);
        if (res.data.status) {
          console.log(res);
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
      fd.append("name", name);
      fd.append("image", profileImg);
      fd.append("description", description);
      fd.append("id", location?.state?.data?.id);
      try {
        let res = await article_update_api(fd);
        if (res.data.status) {
          console.log(res);
          navigate("/article");
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
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" className="form-control" name="name" value={name} onChange={(e) => setname(e.target.value)} placeholder="Name" />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Image</label>
                <div className="  mr-2">
                  <input type="file" accept="image/*" onChange={(e) => setprofileImg(e.target.files[0])} className="form-control" />
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="form-group">
                <label for="exampleInputEmail1">Description</label>
                <textarea
                  rows={3}
                  type="text"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  className="form-control"
                  placeholder="Description"
                />
              </div>
            </Grid>
          </Grid>

          <div className={s["form-login-btn"]} onClick={() => create_user()}>
            <Custombutton>Submit</Custombutton>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddArticle;
