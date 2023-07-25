import React, { useState, useEffect } from "react";
import s from "./user.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { notificationHandler } from "../../utils/Notification";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { useLocation } from "react-router-dom";
import { Card, Grid, Menu, MenuItem } from "@mui/material";
import {
  add_education_api,
  add_experience_api,
  delete_education_api,
  delete_experiece_api,
  edit_education_api,
  edit_experience_api,
  getuserby_id_api,
  user_update_api,
} from "../api/user";
import { IoMdAddCircleOutline } from "react-icons/io";
import Expand from "react-expand-animated";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import DeletePopup from "../Dialogbox/DeletePopup";
const AddUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setname] = useState("");
  const [dob, setdob] = useState("");
  const [email, setemail] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [educationID, seteducationID] = useState("");
  const [userlocation, setuserlocation] = useState("");
  const [password, setpassword] = useState("");
  const [number, setnumber] = useState("");
  const [gender, setgender] = useState("Male");
  const [EduActive, setEduActive] = useState("Add");
  const [ExpActive, setExpActive] = useState("Add");
  const [ExperienceID, setExperienceID] = useState("");
  const [profileImg, setprofileImg] = useState(null);
  const [EducationArry, setEducationArry] = useState([]);
  const [userId, setuserId] = useState("");
  const [ExperinceArry, setExperinceArry] = useState([]);
  const [EducationExpandbox, setEducationExpandbox] = useState(false);
  const [ExperinceExpandbox, setExperinceExpandbox] = useState(false);
  const [deletePopup, setdeletePopup] = useState(false);
  const [deletename, setdeletename] = useState("");
  const [deleteID, setdeleteID] = useState("");
  const [delettype, setdelettype] = useState("");
  const pagetype = location.state.pagetype;
  useEffect(() => {
    setname(location?.state?.data?.name);
    setdob(location?.state?.data?.dob);
    setuserId(location?.state?.data?.id);
    setemail(location?.state?.data?.email);
    setnumber(location?.state?.data?.number);
    setuserlocation(location?.state?.data?.location);
    setgender(location?.state?.data?.gender);
    fetchUsersbyIdFunc(location?.state?.data?.id);
    setpassword(location?.state?.data?.password);
    console.log(location);
  }, [location]);

  const create_user = async () => {
    if (pagetype == "Add") {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("gender", gender);
      fd.append("dob", dob);
      fd.append("number", number);
      password && fd.append("password", password);
      fd.append("location", userlocation);
      try {
        let res = await user_update_api(fd);
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
      fd.append("gender", gender);
      fd.append("dob", dob);
      fd.append("number", number);
      password && fd.append("password", password);
      fd.append("location", userlocation);
      fd.append("profile_img", profileImg);
      fd.append("id", location?.state?.data?.id);
      try {
        let res = await user_update_api(fd);
        if (res.data.status) {
          console.log(res);
          // navigate("/users");
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Education related
  const fetchUsersbyIdFunc = async (id) => {
    const temp = {
      id: id,
      page: "",
      limit: "",
      search: "",
      status: "",
    };
    setisLoading(true);
    try {
      let res = await getuserby_id_api(temp);
      if (res.data.status) {
        setEducationArry(res.data.results[0]?.education);
        setExperinceArry(res.data.results[0]?.experience);
        console.log(res.data.results);
        setisLoading(false);
      } else {
        setisLoading(false);
        console.log("status false!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [educationform, seteducationform] = useState({
    course: "",
    degree: "",
    description: "",
    end_date: "",
    grade: "",
    school_and_college: "",
    start_date: "",
    status: "",
  });

  const educationeditfn = (data) => {
    console.log(data);
    setEduActive("Edit");
    seteducationID(data._id);
    seteducationform({
      course: data.course,
      degree: data.degree,
      description: data.description,
      end_date: data.end_date,
      grade: data.grade,
      school_and_college: data.school_and_college,
      start_date: data.start_date,
      status: "",
    });
    setEducationExpandbox(true);
  };

  const educationformdata = (e) => {
    seteducationform({ ...educationform, [e.target.name]: e.target.value });
  };
  const educatoncanclefun = () => {
    seteducationform({
      course: "",
      degree: "",
      description: "",
      end_date: "",
      grade: "",
      school_and_college: "",
      start_date: "",
      status: "",
    });
    setEducationExpandbox(false);
  };

  const updateeducationdetails = async () => {
    try {
      const temp = {
        id: educationID,
        school_and_college: educationform.school_and_college,
        degree: educationform.degree,
        course: educationform.course,
        start_date: educationform.start_date,
        end_date: educationform.end_date,
        grade: educationform.grade,
        description: educationform.description,
      };
      const res = await edit_education_api(temp);
      if (res.data.status) {
        notificationHandler({ type: "success", msg: res.data.message });
        fetchUsersbyIdFunc(location?.state?.data?.id);
        setEducationExpandbox(false);
        seteducationform({
          course: "",
          degree: "",
          description: "",
          end_date: "",
          grade: "",
          school_and_college: "",
          start_date: "",
          status: "",
        });
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "success", msg: error.message });
      console.log(error);
    }
  };
  const addEducation_api = async () => {
    try {
      const temp = {
        id_user: userId,
        school_and_college: educationform.school_and_college,
        degree: educationform.degree,
        course: educationform.course,
        start_date: educationform.start_date,
        end_date: educationform.end_date,
        grade: educationform.grade,
        description: educationform.description,
      };
      const res = await add_education_api(temp);
      if (res.data.status) {
        console.log(res);
        notificationHandler({ type: "success", msg: res.data.message });
        fetchUsersbyIdFunc(location?.state?.data?.id);
        setEducationExpandbox(false);
        seteducationform({
          course: "",
          degree: "",
          description: "",
          end_date: "",
          grade: "",
          school_and_college: "",
          start_date: "",
          status: "",
        });
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "success", msg: error.message });
      console.log(error);
    }
  };

  const delete_education = async () => {
    try {
      const temp = {
        is_delete: 1,
        id: deleteID,
      };
      const res = await delete_education_api(temp);
      if (res.data.status) {
        notificationHandler({ type: "success", msg: res.data.message });
        fetchUsersbyIdFunc(location?.state?.data?.id);
        setdeletePopup(false);
        setEducationExpandbox(false);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "success", msg: error.message });
      console.log(error);
    }
  };

  // Experience Form

  const [userExperience, setuserExperience] = useState({
    role: "",
    type: "",
    location: "",
    start_date: "",
    end_date: "",
  });

  const experienceformfun = (e) => {
    setuserExperience({
      ...userExperience,
      [e.target.name]: e.target.value,
    });
  };

  const expericeformSubmit = async () => {
    try {
      const temp = {
        id_user: userId,
        role: userExperience.role,
        type: userExperience.type,
        location: userExperience.location,
        start_date: userExperience.start_date,
        end_date: userExperience.end_date,
      };
      const res = await add_experience_api(temp);
      if (res.data.status) {
        notificationHandler({ type: "success", msg: res.data.message });
        fetchUsersbyIdFunc(location?.state?.data?.id);
        setExperinceExpandbox(false);
        setuserExperience({
          role: "",
          type: "",
          location: "",
          start_date: "",
          end_date: "",
        });
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "success", msg: error.message });
      console.log(error);
    }
  };

  const experiencecanclefun = () => {
    setuserExperience({
      role: "",
      type: "",
      location: "",
      start_date: "",
      end_date: "",
    });
    setExperinceExpandbox(false);
  };

  const delete_experience = async () => {
    try {
      const temp = {
        is_delete: 1,
        id: deleteID,
      };
      const res = await delete_experiece_api(temp);
      if (res.data.status) {
        notificationHandler({ type: "success", msg: res.data.message });
        fetchUsersbyIdFunc(location?.state?.data?.id);
        setdeletePopup(false);
        setExperinceExpandbox(false);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "success", msg: error.message });
      console.log(error);
    }
  };

  const experiece_editfn = (data) => {
    console.log(data);
    setExpActive("Edit");
    setExperienceID(data._id);
    setuserExperience({
      role: data.role,
      type: data.type,
      location: data.location,
      start_date: data.start_date,
      end_date: data.end_date,
    });
    setExperinceExpandbox(true);
  };

  const updateExperiencedetails = async () => {
    try {
      const temp = {
        id: ExperienceID,
        role: userExperience.role,
        type: userExperience.type,
        location: userExperience.location,
        start_date: userExperience.start_date,
        end_date: userExperience.end_date,
      };
      const res = await edit_experience_api(temp);
      if (res.data.status) {
        notificationHandler({ type: "success", msg: res.data.message });
        fetchUsersbyIdFunc(location?.state?.data?.id);
        setExperinceExpandbox(false);
        setuserExperience({
          role: "",
          type: "",
          location: "",
          start_date: "",
          end_date: "",
        });
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "success", msg: error.message });
      console.log(error);
    }
  };

  return (
    <>
      <div className={s["admin_container"]}>
        <div className={s["main-heading-content"]}>
          <div className="main-heading-right">
            <h3>User</h3>
          </div>
          <div className="main-heading-left">
            <div className={s["title"]} onClick={() => navigate(-1)}>
              <BiArrowBack />
              Back
            </div>
          </div>
        </div>
        <Card className={s["card-header"]}>
          <div className={s["title"]}>Profile Details</div>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" className="form-control" name="name" value={name} onChange={(e) => setname(e.target.value)} placeholder="Name" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input
                  type="text"
                  disabled
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="form-control"
                  name="email"
                  placeholder="Email"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Mobile Number</label>
                <input
                  type="nember"
                  disabled
                  value={number}
                  onChange={(e) => setnumber(e.target.value)}
                  className="form-control"
                  name="number"
                  placeholder="Number"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Password</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="form-control"
                  name="number"
                  placeholder="Password"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Gender</label>
                <div className="  mr-2">
                  <div className="form-group">
                    <select className="form-control" value={gender} onChange={(e) => setgender(e.target.value)} id="exampleFormControlSelect1" name="gender">
                      <option value="Male">Male </option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={dob}
                  onChange={(e) => setdob(e.target.value)}
                  max={new Date().toISOString().slice(0, 10)}
                  className="form-control"
                  placeholder="Enter DOB"
                />
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
          </Grid>

          <div className={s["form-login-btn"]} onClick={() => create_user()}>
            <Custombutton>Submit </Custombutton>
          </div>
        </Card>

        <section className="education-section">
          <Card className={s["card-header"]}>
            <div className={s["title"]} onClick={() => navigate(-1)}>
              Education Details
            </div>
            <div
              className={s["addedcation_details"]}
              onClick={() => {
                setEducationExpandbox(!EducationExpandbox);
                seteducationform({
                  course: "",
                  degree: "",
                  description: "",
                  end_date: "",
                  grade: "",
                  school_and_college: "",
                  start_date: "",
                  status: "",
                });
                setEduActive("Add");
              }}
            >
              <IoMdAddCircleOutline />
              Add a Education
            </div>
            <Expand open={EducationExpandbox}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">School/College Name*</label>
                    <input
                      type="text"
                      name="school_and_college"
                      className="form-control"
                      value={educationform.school_and_college}
                      onChange={(e) => educationformdata(e)}
                      placeholder="School/College Name*"
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Degree</label>
                    <input
                      type="text"
                      name="degree"
                      value={educationform.degree}
                      className="form-control"
                      placeholder="Degree"
                      onChange={(e) => educationformdata(e)}
                    />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Course</label>
                    <div className="  mr-2">
                      <div className="form-group">
                        {/* <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                          name="course"
                          value={educationform.course}
                          onChange={(e) => educationformdata(e)}
                        >
                          <option value="course-1">Course-1 </option>
                          <option value="course-2">Course-2</option>
                        </select> */}
                        <input type="text" name="course" value={educationform.course} onChange={(e) => educationformdata(e)} className="form-control" />
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Start Date</label>
                    <input
                      type="date"
                      name="start_date"
                      value={educationform.start_date}
                      onChange={(e) => educationformdata(e)}
                      max={new Date().toISOString().slice(0, 10)}
                      className="form-control"
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">End Date</label>
                    <input
                      name="end_date"
                      value={educationform.end_date}
                      type="date"
                      onChange={(e) => educationformdata(e)}
                      max={new Date().toISOString().slice(0, 10)}
                      className="form-control"
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Grade</label>
                    <input
                      type="text"
                      name="grade"
                      value={educationform.grade}
                      onChange={(e) => educationformdata(e)}
                      className="form-control"
                      placeholder="Grade"
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Description </label>
                    <textarea
                      rows={3}
                      name="description"
                      value={educationform.description}
                      onChange={(e) => educationformdata(e)}
                      type="text"
                      className="form-control"
                      placeholder="Description"
                    />
                  </div>
                </Grid>
              </Grid>
              <div className={["form-login-btn"]}>
                <div className={s["user-form-btn"]}>
                  {EduActive == "Add" ? (
                    <span className={s["btn-outline-dark"]} onClick={() => addEducation_api()}>
                      Add
                    </span>
                  ) : (
                    <span
                      className={s["btn-outline-dark"]}
                      onClick={() => {
                        updateeducationdetails();
                      }}
                    >
                      Update
                    </span>
                  )}

                  <span className={s["btn-outline-dark"]} onClick={() => educatoncanclefun()}>
                    Cancel
                  </span>
                </div>
              </div>
            </Expand>

            <div className="education-container-listing">
              {EducationArry.map((data, i) => (
                <div
                  className={s["education-content"]}
                  key={i}
                  onClick={() => {
                    console.log(data, i);
                  }}
                >
                  <div className="education-content-right">
                    <h5>{data.school_and_college}</h5>
                    <p>
                      {data.degree},{data.course}
                    </p>
                  </div>

                  <div className="action-div">
                    <span onClick={() => educationeditfn(data)} style={{ cursor: "pointer", paddingInline: "1rem" }}>
                      <MdOutlineEdit />
                    </span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setdeleteID(data?._id);
                        setdeletename(data?.school_and_college);
                        setdelettype("education");
                        setdeletePopup(true);
                      }}
                    >
                      <MdDelete />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="add-experience-section">
          <Card className={s["card-header"]}>
            <div className={s["title"]} onClick={() => navigate(-1)}>
              Experince Details
            </div>
            <div
              className={s["addedcation_details"]}
              onClick={() => {
                setuserExperience({
                  role: "",
                  type: "",
                  location: "",
                  start_date: "",
                  end_date: "",
                });
                setExpActive("Add");
                setExperinceExpandbox(!ExperinceExpandbox);
              }}
            >
              <IoMdAddCircleOutline />
              Add Experince
            </div>
            <Expand open={ExperinceExpandbox}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Role</label>
                    <input
                      type="text"
                      placeholder="Role"
                      value={userExperience.role}
                      name="role"
                      onChange={(e) => experienceformfun(e)}
                      className="form-control"
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Employment Type</label>
                    <div className="  mr-2">
                      <div className="form-group">
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                          value={userExperience.type}
                          name="type"
                          onChange={(e) => experienceformfun(e)}
                        >
                          <option selected value="Employment Type-1">
                            Employment Type-1
                          </option>
                          <option value="Employment Type-2">Employment Type-2</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Location</label>
                    <input
                      type="text"
                      placeholder="Location"
                      value={userExperience.location}
                      name="location"
                      onChange={(e) => experienceformfun(e)}
                      className="form-control"
                    />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Start Date</label>
                    <input
                      type="date"
                      max={new Date().toISOString().slice(0, 10)}
                      value={userExperience.start_date}
                      name="start_date"
                      onChange={(e) => experienceformfun(e)}
                      className="form-control"
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">End Date</label>
                    <input
                      type="date"
                      max={new Date().toISOString().slice(0, 10)}
                      value={userExperience.end_date}
                      className="form-control"
                      name="end_date"
                      onChange={(e) => experienceformfun(e)}
                    />
                  </div>
                </Grid>
              </Grid>
              <div className={["form-login-btn"]}>
                <div className={s["user-form-btn"]}>
                  {ExpActive == "Add" ? (
                    <span className={s["btn-outline-dark"]} onClick={() => expericeformSubmit()}>
                      Add
                    </span>
                  ) : (
                    <span
                      className={s["btn-outline-dark"]}
                      onClick={() => {
                        updateExperiencedetails();
                      }}
                    >
                      Update
                    </span>
                  )}

                  <span className={s["btn-outline-dark"]} onClick={() => experiencecanclefun()}>
                    Cancel
                  </span>
                </div>
              </div>
            </Expand>

            <div className="education-container-listing">
              {ExperinceArry.map((data, i) => (
                <div
                  className={s["education-content"]}
                  key={i}
                  onClick={() => {
                    console.log(data, i);
                  }}
                >
                  <div className="education-content-right">
                    <h5>{data.role}</h5>
                    <p>
                      {data.type},{data.location}
                    </p>
                  </div>

                  <div className="action-div">
                    <span onClick={() => experiece_editfn(data)} style={{ cursor: "pointer", paddingInline: "1rem" }}>
                      <MdOutlineEdit />
                    </span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setdeleteID(data?._id);
                        setdeletename(data?.role);
                        setdelettype("experience");
                        setdeletePopup(true);
                      }}
                    >
                      <MdDelete />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
      <DeletePopup
        open={deletePopup}
        name={deletename}
        close={() => setdeletePopup(!deletePopup)}
        onsubmit={() => {
          delettype == "education" ? delete_education() : delete_experience();
        }}
      />
    </>
  );
};

export default AddUser;
