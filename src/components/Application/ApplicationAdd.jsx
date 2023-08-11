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
  const [toCountry, setToCountry] = useState("");
  const [fromCountry, setFromCountry] = useState("");
  const [visatype, setVisatype] = useState("");
  const [form,setForm] = useState("");
  const [document,setDocumnet] = useState("")
  const pagetype = location.state.pagetype;

  // useEffect(() => {
  //   setname(location?.state?.data?.name);
  //   setdescription(location?.state?.data?.description);
  // }, [location]);

  const create_user = async () => {
    if (pagetype == "Add") {
      const fd = new FormData();
      fd.append("fromCountry", fromCountry);
      fd.append("toCountry", toCountry);
      // fd.append("description", description);
      // fd.append("category_id", "63e9dd2a9df418582eb58f34");
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
    // if (pagetype == "Edit") {
    //   const fd = new FormData();
    //   fd.append("name", name);
    //   fd.append("image", profileImg);
    //   fd.append("description", description);
    //   fd.append("id", location?.state?.data?.id);
    //   try {
    //     let res = await article_update_api(fd);
    //     if (res.data.status) {
    //       console.log(res);
    //       navigate("/article");
    //       notificationHandler({ type: "success", msg: res.data.message });
    //     } else {
    //       notificationHandler({ type: "success", msg: res.data.message });
    //     }
    //   } catch (error) {
    //     notificationHandler({ type: "danger", msg: error.message });
    //     console.log(error);
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
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
              <div className="form-group">
                <label className="label-name">From Country</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={(e) => setFromCountry(e.target.value)}
                >
                  <option selected value="">
                    Select Country
                  </option>
                  <option value="IN">India</option>
                  <option value="USSR">Russia</option>
                </select>
              </div>
            </Grid>
            <Grid item xs={6}>
            <div className="form-group">
                <label className="label-name">To Country</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={(e) => setToCountry(e.target.value)}
                >
                  <option selected value="">
                    Select Country
                  </option>
                  <option value="IN">India</option>
                  <option value="USSR">Russia</option>
                </select>
              </div>
            </Grid>

          <Grid item xs={12}>
            <div className="form-group">
                <label className="label-name">Select VISA type</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={(e) => setVisatype(e.target.value)}
                >
                  <option selected value="">
                    VISA Country 
                  </option>
                  <option value="IN">Student</option>
                  <option value="USSR">Tourist</option>
                </select>
              </div>
          </Grid>
            
            
          {/* <div className={s["form-login-btn"]} onClick={() => create_user()}>
            <Custombutton>Submit</Custombutton>
          </div> */}
            

            <Grid item xs={6}>
            <div className="form-group">
                <label className="label-name">Select VISA form</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={(e) => setForm(e.target.value)}
                >
                  <option selected value="">
                    VISA Form
                  </option>
                  <option value="IN">Name</option>
                  <option value="USSR">Email</option>
                </select>
              </div>
            </Grid>
            <Grid item xs={6}>
            <div className="form-group">
                <label className="label-name">Select VISA Document</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={(e) => setDocumnet(e.target.value)}
                >
                  <option selected value="">
                    VISA Document
                  </option>
                  <option value="IN">Aadhar card</option>
                  <option value="USSR">Pan card</option>
                </select>
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
