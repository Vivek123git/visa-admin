import React, { useState, useEffect } from "react";
import s from "./../Events/event.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { notificationHandler } from "../../utils/Notification";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { useLocation } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import { article_add_api, article_update_api, category_list_api } from "../api/article";
import { update_skill_api, add_skill_api } from "../api/skill";
import Loder from "../../Loder/Loder";

const Skill = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
  const create_skill = async () => {

    setisLoading(true);
    if (pagetype == "Add") {
      const fd ={
        name:formdata.name
      }
      try {
        let res = await add_skill_api(fd);
        if (res.data.status) {
          console.log(res);
          navigate("/skill-list");
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

      let fd={
        "name":formdata.name,
        "id": id
      }
  
      try {
        let res = await update_skill_api(fd);
        if (res.data.status) {
          console.log(res);
          navigate("/skill-list");
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

  


  return (
    <>
      <div className="">
        <Card className={s["admin_container"]}>
          <div className={s["title"]} onClick={() => navigate(-1)}>
            <BiArrowBack />
            Back
          </div>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{paddingTop:"20px"}}>
            <Grid item xs={12}>
              <div className="form-group">
                <label for="exampleInputEmail1">Skill Name</label>
                <input type="text" className="form-control" name="name" value={formdata.name} onChange={(e) => getformdetails(e)} placeholder="Enter skill name" />
              </div>
            </Grid>

           </Grid>

          <div className={s["form-login-btn"]} onClick={() => create_skill()}>
            <Custombutton>{pagetype == "Add" ? "Submit" : "Update"} </Custombutton>
          </div>
        </Card>
      </div>
      <Loder loading={isLoading} />
    </>
  );
};

export default Skill;
