import React, { useState, useEffect } from "react";
import s from "./../FormField/event.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { notificationHandler } from "../../utils/Notification";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { useLocation } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import { update_country_api, add_country_api } from "../api/CountryApi";
import Loder from "../../Loder/Loder";

const CountryAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [country, setCountry] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const pagetype = location?.state?.pagetype;
  const id = location?.state?.data?._id;
  

  useEffect(() => {
    if (pagetype == "Edit") {
      const { date, name,  } =
        location?.state?.data;
      setCountry(name);
    }
    // get_categories();
  }, [location]);

  // const get_categories = async () => {
  //   try {
  //     let res = await category_list_api();
  //     if (res.data.status) {
  //       console.log(res.data.results);
   
  //     } else {
  //       notificationHandler({ type: "danger", msg: res.data.message });
  //     }
  //   } catch (error) {
  //     notificationHandler({ type: "danger", msg: error.message });
  //     console.log(error);
  //   }
  // };
 
  const create_countryAdd = async () => {

    setisLoading(true);
    if (pagetype == "Add") {
      const fd = {
        name:country
      }
      try {
        let res = await add_country_api(fd);
        if (res.data.status) {
          console.log(res);
          navigate("/add-country-list");
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
      const fd = country
      try {
        let res = await update_country_api(fd);
        if (res.data.status) {
          navigate("/add-country-list");
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
                <label for="exampleInputEmail1">Country Name</label>
                <input type="text" className="form-control"  value={country} onChange={(e)=>setCountry(e.target.value)} placeholder="Enter country name" />
              </div>
            </Grid>
           
           </Grid>

          <div className={s["form-login-btn"]} onClick={() => create_countryAdd()}>
            <Custombutton>{pagetype == "Add" ? "Submit" : "Update"} </Custombutton>
          </div>
        </Card>
      </div>
      <Loder loading={isLoading} />
    </>
  );
};

export default CountryAdd;
