import React, { useState, useEffect } from "react";
import s from "./../FormField/event.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { notificationHandler } from "../../utils/Notification";

import { useLocation } from "react-router-dom";
import { Card, Grid } from "@mui/material";

import { update_visaType_api, add_visaType_api } from "../api/VisaTypeApi";
import Loder from "../../Loder/Loder";

const VisaType = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setisLoading] = useState(false);
  const [type,setType] = useState("")

  const pagetype = location?.state?.pagetype;

  useEffect(() => {
    if (pagetype == "Edit") {
      setType(location?.state?.data?.type)
    }
  }, [location]);


  const create_visaType = async () => {
    setisLoading(true);
    if (pagetype == "Add") {
     let body = {type:type }
      try {
        let res = await add_visaType_api(body);
        if (res.data.status) {
          console.log(res);
          navigate("/visa-type-list");
         setType(type)
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
        "type":type,
        "id": location?.state?.data?._id
      }
  
      try {
        let res = await update_visaType_api(fd);
        if (res.data.status) {
          console.log(res);
          navigate("/visa-type-list");
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
                <label for="exampleInputEmail1">Visa type</label>
                <input type="text" className="form-control" name="name" value={type} onChange={(e)=>setType(e.target.value)} placeholder="Enter Visa type name" />
              </div>
            </Grid>

           </Grid>

          <div className={s["form-login-btn"]} onClick={() => create_visaType()}>
            <Custombutton>{pagetype == "Add" ? "Submit" : "Update"} </Custombutton>
          </div>
        </Card>
      </div>
      <Loder loading={isLoading} />
    </>
  );
};

export default VisaType;
