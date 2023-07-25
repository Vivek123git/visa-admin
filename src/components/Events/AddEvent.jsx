import React, { useState, useEffect } from "react";
import s from "./event.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { notificationHandler } from "../../utils/Notification";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { useLocation } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import { article_add_api, article_update_api, category_list_api } from "../api/article";
import { add_event_api, update_event_api } from "../api/event";
import Loder from "../../Loder/Loder";
const AddEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [AllCategories, setAllCategories] = useState([]);
  const [profileImg, setprofileImg] = useState();
  const [isLoading, setisLoading] = useState(false);
  const pagetype = location?.state?.pagetype;
  const place = location?.state?.data?.location;
  const id = location?.state?.data?.id;

  useEffect(() => {
    if (pagetype == "Edit") {
      const { category_name, category_id, couple_price, date, description, end_time, general_price, name, start_time, vip_price, user_name, date2 } =
        location?.state?.data;
      console.log(location);
      setformdata({
        name: name,
        description: description,
        category_id: category_id,
        date: date,
        date2: date2,
        start_time: start_time,
        end_time: end_time,
        general_price: general_price,
        couple_price: couple_price,
        vip_price: vip_price,
        location: place,
      });
    }
    get_categories();
  }, [location]);

  const get_categories = async () => {
    try {
      let res = await category_list_api();
      if (res.data.status) {
        console.log(res.data.results);
        setAllCategories(res?.data?.results);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "danger", msg: error.message });
      console.log(error);
    }
  };

  const [formdata, setformdata] = useState({
    name: "",
    description: "",
    category_id: "",
    date: "",
    date2: "",
    start_time: "",
    end_time: "",
    general_price: "",
    couple_price: "",
    vip_price: "",
    location: "",
  });

  const getformdetails = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
    setformdata(...setformdata);
  };
  const create_event = async () => {
    if (formdata.date === formdata.date2 && formdata.start_time >= formdata.end_time) {
      alert("End time must be after start time");
      return;
    }

    setisLoading(true);
    if (pagetype == "Add") {
      const fd = new FormData();
      fd.append("name", formdata.name);
      fd.append("description", formdata.description);
      fd.append("category_id", formdata.category_id);
      fd.append("date", formdata.date);
      fd.append("date2", formdata.date2);
      fd.append("start_time", formdata.start_time);
      fd.append("end_time", formdata.end_time);
      fd.append("general_price", formdata.general_price);
      fd.append("couple_price", formdata.couple_price);
      fd.append("vip_price", formdata.vip_price);
      fd.append("location", formdata.location);
      fd.append("image", profileImg);
      fd.append("id", "");
      try {
        let res = await add_event_api(fd);
        if (res.data.status) {
          console.log(res);
          navigate("/event-list");
          setprofileImg("");
          setformdata({
            name: "",
            description: "",
            category_id: "",
            date: "",
            start_time: "",
            end_time: "",
            general_price: "",
            couple_price: "",
            vip_price: "",
            location: "",
          });
          setisLoading(false);
          notificationHandler({ type: "success", msg: res.data.message });
        } else {
          notificationHandler({ type: "success", msg: res.data.message });
          setisLoading(false);
        }
      } catch (error) {
        notificationHandler({ type: "danger", msg: error.message });
        setisLoading(false);
        console.log(error);
      }
    }
    if (pagetype == "Edit") {
      const fd = new FormData();
      fd.append("name", formdata.name);
      fd.append("description", formdata.description);
      fd.append("category_id", formdata.category_id);
      fd.append("date", formdata.date);
      fd.append("date2", formdata.date2);
      fd.append("start_time", formdata.start_time);
      fd.append("end_time", formdata.end_time);
      fd.append("general_price", formdata.general_price);
      fd.append("couple_price", formdata.couple_price);
      fd.append("vip_price", formdata.vip_price);
      fd.append("location", formdata.location);
      fd.append("image", profileImg);
      fd.append("id", id);
      try {
        let res = await update_event_api(fd);
        if (res.data.status) {
          console.log(res);
          navigate("/event-list");
          setisLoading(false);
          notificationHandler({ type: "success", msg: res.data.message });
        } else {
          notificationHandler({ type: "success", msg: res.data.message });
          setisLoading(false);
        }
      } catch (error) {
        notificationHandler({ type: "danger", msg: error.message });
        console.log(error);
        setisLoading(false);
      }
    }
  };

  const startdate = () => {
    let year = new Date().toISOString().slice(0, 10).split("-")[0];
    // let newYear = year - 13;
    let month = new Date().toISOString().slice(0, 10).split("-")[1];
    let date = new Date().toISOString().slice(0, 10).split("-")[2];
    let minYear = `${year}-${month}-${date}`;
    return minYear;
  };
  const enddate = () => {
    let year = new Date().toISOString().slice(0, 10).split("-")[0];
    let month = new Date().toISOString().slice(0, 10).split("-")[1];
    let date = new Date().toISOString().slice(0, 10).split("-")[2];
    let minYear = `${year}-${month}-${date}`;
    return formdata.date || minYear;
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
                <input type="text" className="form-control" name="name" value={formdata.name} onChange={(e) => getformdetails(e)} placeholder="Name" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Category</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  name="category_id"
                  value={formdata.category_id}
                  onChange={(e) => getformdetails(e)}
                >
                  <option selected value="">
                    Select Category
                  </option>
                  {AllCategories.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Image</label>
                <div className="  mr-2">
                  <input type="file" className="form-control" accept="image/*" onChange={(e) => setprofileImg(e.target.files[0])} />
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Start Date</label>
                <input
                  type="date"
                  min={startdate()}
                  className="form-control"
                  name="date"
                  placeholder="Start date"
                  value={formdata.date}
                  onChange={(e) => getformdetails(e)}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">End Date</label>
                <input
                  type="date"
                  min={enddate()}
                  disabled={!formdata.date}
                  className="form-control"
                  name="date2"
                  placeholder="date"
                  value={formdata.date2}
                  onChange={(e) => getformdetails(e)}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Start Time</label>
                <input type="time" className="form-control" name="start_time" value={formdata.start_time} onChange={(e) => getformdetails(e)} />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">End Time</label>
                <input type="time" className="form-control" name="end_time" value={formdata.end_time} onChange={(e) => getformdetails(e)} />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">General Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="general_price"
                  value={formdata.general_price}
                  onChange={(e) => getformdetails(e)}
                  placeholder="General Price"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Couple Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="couple_price"
                  value={formdata.couple_price}
                  onChange={(e) => getformdetails(e)}
                  placeholder="Couple Price"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">VIP Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="vip_price"
                  value={formdata.vip_price}
                  onChange={(e) => getformdetails(e)}
                  placeholder="VIP Price"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  onChange={(e) => getformdetails(e)}
                  value={formdata.location}
                  placeholder="Location"
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="form-group">
                <label for="exampleInputEmail1">Description</label>
                <textarea
                  rows={3}
                  type="text"
                  name="description"
                  className="form-control"
                  value={formdata.description}
                  onChange={(e) => getformdetails(e)}
                  placeholder="Description"
                />
              </div>
            </Grid>
          </Grid>

          <div className={s["form-login-btn"]} onClick={() => create_event()}>
            <Custombutton>{pagetype == "Add" ? "Submit" : "Update"} </Custombutton>
          </div>
        </Card>
      </div>
      <Loder loading={isLoading} />
    </>
  );
};

export default AddEvent;
