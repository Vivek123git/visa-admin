import React, { useState, useEffect } from "react";
import s from "./community.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { notificationHandler } from "../../utils/Notification";
import { useLocation } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import { create_community_api, postcategory_list_api, update_community_api } from "../api/Community";
const CommunityAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allcategory, setallcategory] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [title, settitle] = useState("");
  const [text, settext] = useState("");
  const [file, setfile] = useState("");
  const [type, settype] = useState("");
  const [categoryId, setcategoryId] = useState("");
  const pagetype = location.state.pagetype;
  useEffect(() => {
    settitle(location?.state?.data?.title);
    settext(location?.state?.data?.text);
    setcategoryId(location?.state?.data?.category_id);
    settype(location?.state?.data?.type);
    // setpassword("");
    // setfile("");
    fetchAllcategoryfun();
  }, [location]);

  const create_admin = async () => {
    if (pagetype == "Add") {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("category_id", categoryId);
      fd.append("img", file);
      fd.append("type", type);
      fd.append("text", text);
      try {
        let res = await create_community_api(fd);
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
      fd.append("id", location.state.data.id);
      fd.append("title", title);
      fd.append("category_id", categoryId);
      fd.append("img", file);
      fd.append("type", type);
      fd.append("text", text);
      try {
        let res = await update_community_api(fd);
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

  async function fetchAllcategoryfun(data) {
    setisLoading(true);
    try {
      let res = await postcategory_list_api();
      if (res.data.status) {
        setallcategory(res.data.results);
        setisLoading(false);
      } else {
        setisLoading(false);
        console.log("status false!");
      }
    } catch (error) {
      console.log(error);
    }
  }

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
                <label for="exampleInputEmail1">Title</label>
                <input type="text" className="form-control" value={title} onChange={(e) => settitle(e.target.value)} placeholder="Title" />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Image</label>
                <div className="  mr-2">
                  <input type="file" className="form-control" name="img" placeholder="" accept="image/*" onChange={(e) => setfile(e.target.files[0])} />
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Type</label>
                <select className="form-control" id="exampleFormControlSelect1" name="type" value={type} onChange={(e) => settype(e.target.value)}>
                  <option selected value="">
                    Select Type
                  </option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Category</label>
                <select className="form-control" id="exampleFormControlSelect1" value={categoryId} onChange={(e) => setcategoryId(e.target.value)}>
                  <option selected value="">
                    Select Category
                  </option>
                  {allcategory.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Text</label>
                <textarea type="text" rows={3} className="form-control" value={text} onChange={(e) => settext(e.target.value)} placeholder="" />
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

export default CommunityAdd;
