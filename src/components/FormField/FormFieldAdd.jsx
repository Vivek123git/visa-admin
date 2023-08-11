import React, { useState, useEffect } from "react";
import s from "./event.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { notificationHandler } from "../../utils/Notification";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { useLocation } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import {
  article_add_api,
  article_update_api,
  category_list_api,
} from "../api/article";
import { add_event_api, update_event_api } from "../api/event";
import Loder from "../../Loder/Loder";
const AddEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [AllCategories, setAllCategories] = useState([]);
  // const [profileImg, setprofileImg] = useState();
  const [isLoading, setisLoading] = useState(false);
  const pagetype = location?.state?.pagetype;
  const place = location?.state?.data?.location;
  const id = location?.state?.data?.id;

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    placeholder: "",
  });

  const [optionBox, setOptionBox] = useState(false);
  const [optionArr ,setOptionArr] = useState([
    {
      name:"",
      value:"",
      key:Date.now()
    }
  ])

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "type") {
      if (value === "select" || value === "radio" || value === "check") {
        setOptionBox(true);
        setFormData({
          ...formData,
          [name]: value,
        });
      } else {
        setOptionBox(false);
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddOption=()=>{
    const newOptionArr =  {
      name: "",
      value: "",
      key: Date.now(),
    }
    setOptionArr((prev) => [...prev,newOptionArr]);
  }

  const handleRemoveOption=(id)=>{
    const newArr = optionArr.filter((elem,ind)=>{
     return elem.key!==id;
    })
    setOptionArr(newArr)
  }

  const handleOptionChange=(e,id)=>{
    const {name,value} = e.target;
    const updatedOptions = optionArr.map((elem,index)=>{
      return elem.key==id? {...elem,[name]:value}:elem
    })
    setOptionArr(updatedOptions)
  }

  return (
    <>
      <div className="">
        <Card className={s["admin_container"]}>
          <div className={s["title"]} onClick={() => navigate(-1)}>
            <BiArrowBack />
            Back
          </div>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <div className="form-group">
                <label className="label-name">Field Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange(e)}
                  placeholder="Name"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label className="label-name">Placeholder</label>
                <div className="  mr-2">
                  <input
                    type="text"
                    className="form-control"
                    name="placeholder"
                    value={formData.placeholder}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="form-group">
                <label className="label-name">Select Input type</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  name="type"
                  value={formData.type}
                  // onChange={(e) => getformdetails(e)}
                  onChange={(e) => handleChange(e)}
                >
                  <option selected value="">
                    Select Input Type
                  </option>
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="email">Email</option>
                  <option value="select">Option</option>
                  <option value="check">Check</option>
                  <option value="radio">Radio</option>
                  <option value="file">File</option>
                </select>
              </div>
            </Grid>
          </Grid>

          {optionBox ? (
            optionArr.map((elem,key)=>{
              console.log(elem,"ekdedn")
            return(
              <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={4}>
                <div className="form-group">
                  <label className="label-name">Option Field</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={elem.name}
                    onChange={(e) => handleOptionChange(e,elem.key)}
                    placeholder="Option Field"
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="form-group">
                  <label className="label-name">Option Value</label>
                  <div className="  mr-2">
                    <input
                      type="text"
                      className="form-control"
                      name="value"
                      value={elem.value}
                      placeholder="Option Value"
                      onChange={(e) => handleOptionChange(e,elem.key)}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={2}>
                <div
                style={{marginTop:"1.5rem"}}
                  //  onClick={() => create_event()}
                  onClick={handleAddOption}
                >
                  <Custombutton >Add</Custombutton>
                </div>
              </Grid>
              {console.log(key,"key")}
              {key=="0"?"":<Grid item xs={2}>
                <div
                style={{marginTop:"1.5rem"}}
                  //  onClick={() => create_event()}
                  onClick={()=>handleRemoveOption(elem.key)}
                >
                  <Custombutton >Remove</Custombutton>
                </div>
              </Grid>}
            </Grid>
            )
            })
          ) : (
            ""
          )}

          <div
            className={s["form-login-btn"]}
            //  onClick={() => create_event()}
          >
            <Custombutton>
              {pagetype == "Add" ? "Submit" : "Update"}{" "}
            </Custombutton>
          </div>
        </Card>
      </div>
      <Loder loading={isLoading} />
    </>
  );
};

export default AddEvent;
