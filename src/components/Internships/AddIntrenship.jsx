import React, { useContext, useState, useEffect } from "react";
import s from "./internship.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { notificationHandler } from "../../utils/Notification";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { useLocation } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import Select from "react-select";
import { add_internships_api, job_title_list_api, location_list_api, skill_list_api, update_internships_api } from "../api/internship";
const AddIntrenship = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [LocationArry, setLocationArry] = useState([]);
  const [SkillArry, setSkillArry] = useState([]);
  const [job_titleArry, setjob_titleArry] = useState([]);
  const [jobArryId, setjobArryId] = useState(null);
  const [skillArryId, setskillArryId] = useState(null);
  const [locationArryId, setlocationArryId] = useState(null);
  const [formdata, setformdata] = useState({
    name: "",
    description: "",
    stipend: "",
    duration: "",
    type: "",
    about_company: "",
    type_2: "",
  });
  const pagetype = location.state.pagetype;
  console.log(location);
  useEffect(() => {
    setformdata({
      name: location?.state?.data?.name,
      description: location?.state?.data?.description,
      stipend: location?.state?.data?.stipend,
      duration: location?.state?.data?.duration,
      type: location?.state?.data?.type,
      about_company: location?.state?.data?.about_company,
      type_2: location?.state?.data?.type_2,
    });

    let job_title = location?.state?.data?.job_title.map((item) => {
      item = { value: item._id, label: item.name };
      return item;
    });
    setjobArryId(job_title);

    let skill = location?.state?.data?.skills.map((item) => {
      item = { value: item._id, label: item.name };
      return item;
    });
    setskillArryId(skill);
    let locationid = location?.state?.data?.location?.map((item) => {
      item = { value: item._id, label: item.name };
      return item;
    });
    setlocationArryId(locationid);
    getAlllocation();
    getAllSkill();
    getAlljob_title();
  }, [location]);

  const create_intrenship = async () => {
    console.log(pagetype == "Add");
    let skillsString = skillArryId?.map((item) => item?.value)?.toString();
    let locationString = locationArryId?.map((item) => item?.value)?.toString();
    let jobString = jobArryId?.map((item) => item?.value)?.toString();
    if (pagetype == "Add") {
      const temp = {
        name: formdata.name,
        description: formdata.description,
        location: locationString,
        skills: skillsString,
        job_title: jobString,
        stipend: formdata.stipend,
        duration: formdata.duration,
        type: formdata.type,
        about_company: formdata.about_company,
        type_2: formdata.type_2,
      };
      try {
        let res = await add_internships_api(temp);
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
      const temp = {
        id: location?.state?.data?.id,
        name: formdata.name,
        description: formdata.description,
        location: locationString,
        skills: skillsString,
        job_title: jobString,
        stipend: formdata.stipend,
        duration: formdata.duration,
        type: formdata.type,
        about_company: formdata.about_company,
        type_2: formdata.type_2,
      };
      try {
        let res = await update_internships_api(temp);
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

  const getAlllocation = async () => {
    try {
      let res = await location_list_api();
      if (res.data.status) {
        let cc = res.data.results.map((item) => {
          return { value: item.id, label: item.name };
        });
        setLocationArry(cc);
      } else {
        notificationHandler({ type: "success", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "danger", msg: error.message });
      console.log(error);
    }
  };
  const getAllSkill = async () => {
    try {
      let res = await skill_list_api();
      if (res.data.status) {
        let cc = res.data.results.map((item) => {
          item = { value: item.id, label: item.name };
          return item;
        });
        setSkillArry(cc);
      } else {
        notificationHandler({ type: "success", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "danger", msg: error.message });
      console.log(error);
    }
  };
  const getAlljob_title = async () => {
    try {
      let res = await job_title_list_api();
      if (res.data.status) {
        let cc = res.data.results.map((item) => {
          item = { value: item.id, label: item.name };
          return item;
        });
        setjob_titleArry(cc);
      } else {
        notificationHandler({ type: "success", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "danger", msg: error.message });
      console.log(error);
    }
  };

  const formdetails = (e) => {
    console.log(e);
    setformdata({ ...formdata, [e.target.name]: e.target.value });
    setformdata(...formdata);
  };

  const handleChange = (selected) => {
    setjobArryId(selected);
  };
  const handleChange1 = (selected) => {
    setskillArryId(selected);
  };
  const handleChange2 = (selected) => {
    setlocationArryId(selected);
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
                <input type="text" className="form-control" name="name" value={formdata.name} onChange={(e) => formdetails(e)} placeholder="Name" />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Job</label>
                <Select isMulti options={job_titleArry} onChange={handleChange} value={jobArryId} />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Skill</label>
                <Select isMulti options={SkillArry} onChange={handleChange1} value={skillArryId} />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Location</label>
                <Select isMulti options={LocationArry} onChange={handleChange2} value={locationArryId} />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Type</label>
                <select className="form-control" id="exampleFormControlSelect1" name="type" value={formdata.type} onChange={(e) => formdetails(e)}>
                  <option selected value="">
                    Select Type
                  </option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Half Time">Freelance</option>
                </select>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Mode</label>
                <select className="form-control" id="exampleFormControlSelect1" name="type_2" value={formdata.type_2} onChange={(e) => formdetails(e)}>
                  <option selected value="">
                    Select Mode
                  </option>
                  <option value="Work from home">Work from home</option>
                  <option value="Work from Office">Work from Office</option>
                </select>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Duration</label>
                <select className="form-control" id="exampleFormControlSelect1" name="duration" value={formdata.duration} onChange={(e) => formdetails(e)}>
                  <option selected value="">
                    Select Duration
                  </option>
                  <option value="1 Month">1 Month</option>
                  <option value="3 Month">3 Month</option>
                  <option value="6 Month">6 Month</option>
                  <option value="1 Year">1 Year</option>
                  <option value="other">other</option>
                </select>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">About Company</label>
                <input
                  type="text"
                  name="about_company"
                  value={formdata.about_company}
                  onChange={(e) => formdetails(e)}
                  className="form-control"
                  placeholder=""
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Stipend</label>
                <input type="number" className="form-control" name="stipend" value={formdata.stipend} onChange={(e) => formdetails(e)} placeholder="stipend" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Description</label>
                <textarea
                  rows={3}
                  type="number"
                  className="form-control"
                  name="description"
                  value={formdata.description}
                  onChange={(e) => formdetails(e)}
                  placeholder="description"
                />
              </div>
            </Grid>
          </Grid>
          <div className={s["form-login-btn"]} onClick={() => create_intrenship()}>
            <Custombutton>{pagetype == "Add" ? "Submit" : "Update"}</Custombutton>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddIntrenship;
