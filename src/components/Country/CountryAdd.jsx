import React, { useState, useEffect } from "react";
import s from "./../FormField/event.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { notificationHandler } from "../../utils/Notification";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { useLocation } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import { article_add_api, article_update_api, category_list_api } from "../api/article";
import { update_category_api, add_category_api } from "../api/category";
import Loder from "../../Loder/Loder";

const Category = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [AllCategories, setAllCategories] = useState([]);
   const [profileImg, setprofileImg] = useState();
  const [isLoading, setisLoading] = useState(false);
  const pagetype = location?.state?.pagetype;
  const id = location?.state?.data?._id;
  

  useEffect(() => {
    if (pagetype == "Edit") {
      const { date, name,  } =
        location?.state?.data;
      console.log(location);
      setformdata({
        name: name,
        // date: date,
        
      });
    }
    get_categories();
  }, [location]);

  const get_categories = async () => {
    try {
      let res = await category_list_api();
      if (res.data.status) {
        console.log(res.data.results);
   
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
    // date: "",
    
  });
 
  const getformdetails = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
    // setformdata(...setformdata);
  };
  const create_event = async () => {

    setisLoading(true);
    if (pagetype == "Add") {
      const fd = new FormData();
      fd.append("name", formdata.name);
      // fd.append("date", formdata.date);
      fd.append("category_img", profileImg);
      // fd.append("id", "");
      try {
        let res = await add_category_api(fd);
        if (res.data.status) {
          console.log(res);
          navigate("/category-list");
          setprofileImg("");
          setformdata({
            name: "",
            // date: "",
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
      // fd.append("date", formdata.date);
      fd.append("category_img ", profileImg);
      fd.append("Cid", id);
      try {
        let res = await update_category_api(fd);
        if (res.data.status) {
          console.log(res);
          navigate("/category-list");
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
    // if (pagetype == "View") {
    //   const fd = new FormData();
    //   fd.append("name", formdata.name);
    //   fd.append("description", formdata.description);
    //   fd.append("category_id", formdata.category_id);
    //   fd.append("date", formdata.date);
    //   fd.append("date2", formdata.date2);
    //   fd.append("start_time", formdata.start_time);
    //   fd.append("end_time", formdata.end_time);
    //   fd.append("general_price", formdata.general_price);
    //   fd.append("couple_price", formdata.couple_price);
    //   fd.append("vip_price", formdata.vip_price);
    //   fd.append("location", formdata.location);
    //   fd.append("image", profileImg);
    //   fd.append("id", id);
    //   try {
    //     let res = await update_event_api(fd);
    //     if (res.data.status) {
    //       console.log(res);
    //       navigate("/event-list");
    //       setisLoading(false);
    //       notificationHandler({ type: "success", msg: res.data.message });
    //     } else {
    //       notificationHandler({ type: "success", msg: res.data.message });
    //       setisLoading(false);
    //     }
    //   } catch (error) {
    //     notificationHandler({ type: "danger", msg: error.message });
    //     console.log(error);
    //     setisLoading(false);
    //   }
    // }
  

  };

  


  return (
    <>
      <div className="">
        <Card className={s["admin_container"]}>
          <div className={s["title"]} onClick={() => navigate(-1)}>
            <BiArrowBack />
            Back
          </div>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{paddingTop:"20px"}}>
            <Grid item xs={6}>
            <div className="form-group">
                <label className="label-name">Select Country</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  // onChange={(e) => setToCountry(e.target.value)}
                >
                  <option selected value="">
                    Select Country
                  </option>
                  <option value="IN">India</option>
                  <option value="USSR">Russia</option>
                </select>
              </div>
            </Grid>

            {/* <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Image</label>
                <div className="  mr-2">
                  <input type="file" className="form-control" accept="image/*" onChange={(e) => setprofileImg(e.target.files[0])} />
                </div>
              </div>
            </Grid> */}
           
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

export default Category;
