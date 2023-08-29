import React, { useState, useEffect } from "react";
import s from "./articles.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { notificationHandler } from "../../utils/Notification";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { Card, Grid } from "@mui/material";
import {
  application_add_api,
  application_update_api,
} from "../api/ApplicationApi";
import { fetchAllCountry } from "../api/CountryApi";
import { fetchAllVisa } from "../api/VisaTypeApi";
import { fetchAllFormField } from "../api/FormFieldApi";

const ApplicationAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [application, setApplication] = useState({
    toCountry: "",
    fromCountry: "",
    visatype: "",
  });
  const [fields, setFields] = useState([]);
  const [visaForm, setVisaForm] = useState([]);
  const [country, setCountry] = useState([]);
  const [visaType, setVisaType] = useState([]);

  const [visaDetails, setVisaDetails] = useState({
    entry_allowed: "",
    visa_required: "",
    validity: "",
    number_of_entries: "",
    processing_time: "",
    passport_required: "",
    fees: {
      government_fees: "",
    },
    sub_type: [],
    visa_mode: [],
  });

  const visa_mode = [
    { label: "General", value: "general" },
    { label: "Urgent", value: "urgent" },
    { label: "Superfast", value: "superfast" },
  ];
  const visa_duration = [
    { label: "15 days", value: "15 days" },
    { label: "1 Month", value: "1 Month" },
    { label: "3 Months", value: "3 Months" },
    { label: "6 Months", value: "6 Months" },
    { label: "1 Year", value: "1 Year" },
  ];

  const pagetype = location.state.pagetype;
  const id = location?.state?.data?._id;

  useEffect(() => {
    if (pagetype === "Edit") {
      setApplication({
        ...application,
        toCountry: location?.state?.data.to_country._id,
        fromCountry: location?.state?.data.from_country._id,
        visatype: location?.state?.data.visa_type._id,
      });
      setVisaDetails({
        ...visaDetails,
        entry_allowed: location?.state?.data.visa_details.entry_allowed,
        visa_required: location?.state?.data.visa_details.visa_required,
        validity: location?.state?.data.visa_details.validity,
        number_of_entries: location?.state?.data.visa_details.number_of_entries,
        processing_time: location?.state?.data.visa_details.processing_time,
        passport_required: location?.state?.data.visa_details.passport_required,
        fees: {
          ...visaDetails.fees,
          government_fees:
            location?.state?.data.visa_details.fees.government_fees,
        },
        sub_type: location?.state?.data.visa_details.sub_type,
        visa_mode: location?.state?.data.visa_details.visa_mode,
      });
      setFields(location?.state?.data.fields);
    } else {
      const filteredFields = visaForm.filter((elem) => elem.checked === true);
      setFields(filteredFields);
    }
  }, [location, visaForm]);

  const handleChangeApp = (e, elem) => {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      elem.checked = !elem.checked;
      if (checked) {
        setFields([...fields, elem]);
      } else {
        setFields(fields.filter((item) => item._id !== elem._id));
      }
    } else {
      setApplication({
        ...application,
        [name]: value,
      });
    }
  };

  const handleVisaDetails = (e) => {
    const { name, value } = e.target;
    if (name === "fees") {
      setVisaDetails((prevDetails) => ({
        ...prevDetails,
        fees: {
          ...prevDetails.fees,
          government_fees: value,
        },
      }));
    } else {
      setVisaDetails({
        ...visaDetails,
        [name]: value,
      });
    }
  };

  const handleSelectDuration = (selected) => {
    setVisaDetails({
      ...visaDetails,
      sub_type: selected,
    });
  };

  const handleSelectMode = (selected) => {
    setVisaDetails({
      ...visaDetails,
      visa_mode: selected,
    });
  };

  const create_user = async () => {
    if (pagetype === "Add") {
      const fd = {
        from_country: application.fromCountry,
        to_country: application.toCountry,
        visa_type: application.visatype,
        visa_details: { ...visaDetails },
        fields,
      };
      try {
        let res = await application_add_api(fd);
        if (res.data.status) {
          navigate("/application");
          notificationHandler({ type: "success", msg: res.data.message });
        } else {
          notificationHandler({ type: "success", msg: res.data.message });
        }
      } catch (error) {
        notificationHandler({ type: "danger", msg: error.message });
        console.log(error);
      }
    }
    if (pagetype === "Edit") {
      const fd = {
        id: id,
        from_country: application.fromCountry,
        to_country: application.toCountry,
        visa_type: application.visatype,
        visa_details: { ...visaDetails },
        fields,
      };
      try {
        let res = await application_update_api(fd);
        if (res.data.status) {
          navigate("/application");
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

  async function fetchAllCountryFunc() {
    try {
      let res = await fetchAllCountry();
      if (res.data.status) {
        setCountry(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchAllVisaFunc() {
    try {
      let res = await fetchAllVisa();
      if (res.data.status) {
        setVisaType(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchAllFormFieldFunc() {
    try {
      let res = await fetchAllFormField();
      if (res.data.status) {
        let cc = res.data.data.map((x) => {
          return { ...x, checked: x.default_checked };
        });
        setVisaForm(cc);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllFormFieldFunc();
    fetchAllCountryFunc();
    fetchAllVisaFunc();
  }, []);

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
                <label className="label-name">From Country</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  value={application.fromCountry}
                  onChange={(e) => handleChangeApp(e)}
                  name="fromCountry"
                >
                  <option selected value="">
                    Select Country
                  </option>
                  {country.length > 0
                    ? country.map((elem, id) => {
                        return <option value={elem._id}>{elem.name}</option>;
                      })
                    : ""}
                </select>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label className="label-name">To Country</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  value={application.toCountry}
                  name="toCountry"
                  onChange={(e) => handleChangeApp(e)}
                >
                  <option selected value="">
                    Select Country
                  </option>
                  {country.length > 0
                    ? country.map((elem, id) => {
                        return <option value={elem._id}>{elem.name}</option>;
                      })
                    : ""}
                </select>
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="form-group">
                <label className="label-name">Select VISA type</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  name="visatype"
                  value={application.visatype}
                  onChange={handleChangeApp}
                >
                  <option selected value="">
                    VISA Type
                  </option>
                  {visaType.length > 0
                    ? visaType.map((elem, id) => {
                        return <option value={elem._id}>{elem.type}</option>;
                      })
                    : ""}
                </select>
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="">
                <label className="label-name">VISA Duration</label>
                <Select
                  isMulti
                  options={visa_duration}
                  value={visaDetails.sub_type}
                  onChange={handleSelectDuration}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label htmlFor="visa_mode" className="label-name">
                  Select Mode
                </label>
                <Select
                  isMulti
                  options={visa_mode}
                  value={visaDetails.visa_mode}
                  onChange={handleSelectMode}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="form-group">
                <label className="label-name" htmlFor="validity">
                  Validity (in months)
                </label>
                <input
                  type="Number"
                  className="form-control"
                  name="validity"
                  value={visaDetails.validity}
                  onChange={handleVisaDetails}
                  placeholder="Enter in Months"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label className="label-name" htmlFor="number_of_entries">
                  Number Of Entries
                </label>
                <input
                  type="Number"
                  className="form-control"
                  name="number_of_entries"
                  value={visaDetails.number_of_entries}
                  onChange={handleVisaDetails}
                  placeholder="Number Of Entries"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label className="label-name" htmlFor="processing_time">
                  Processing Time (in days)
                </label>
                <input
                  type="Nymber"
                  className="form-control"
                  name="processing_time"
                  value={visaDetails.processing_time}
                  onChange={handleVisaDetails}
                  placeholder="In Days"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label className="label-name" htmlFor="passport_required">
                  Entry Allowed
                </label>
                <select
                  className="form-control"
                  name="entry_allowed"
                  value={visaDetails.entry_allowed}
                  onChange={handleVisaDetails}
                >
                  <option selected value="">
                    Choose one option
                  </option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label className="label-name" htmlFor="passport_required">
                  Visa Required
                </label>
                <select
                  className="form-control"
                  name="visa_required"
                  value={visaDetails.visa_required}
                  onChange={handleVisaDetails}
                >
                  <option selected value="">
                    Choose one option
                  </option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label className="label-name" htmlFor="passport_required">
                  Passport Required
                </label>
                <select
                  className="form-control"
                  name="passport_required"
                  value={visaDetails.passport_required}
                  onChange={handleVisaDetails}
                >
                  <option selected value="">
                    Choose one option
                  </option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label className="label-name" htmlFor="government_fees">
                  Government Fees
                </label>
                <input
                  type="Number"
                  className="form-control"
                  name="fees"
                  value={visaDetails.fees.government_fees}
                  onChange={handleVisaDetails}
                  placeholder="Governmet Fees"
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <label className="label-name">VISA form Input type (text , radio , select)</label>
              <div className="form-group">
                {visaForm.length > 0
                  ? visaForm.map((elem) => { 
                      if (
                        elem.type === "text" ||
                        elem.type === "select" ||
                        elem.type === "radio"
                      ) {
                        return (
                          <div className="d-flex" key={elem._id}>
                            <input
                              className={s["checkbox-form"]}
                              type="checkbox"
                              checked={fields.some(
                                (item) => item._id === elem._id
                              )}
                              onChange={(e) => handleChangeApp(e, elem)}
                            />
                            <label htmlFor={elem._id}>{elem.value}</label>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })
                  : ""}
              </div>
            </Grid>
            <Grid item xs={6}>
              <label className="label-name">VISA form Input type(File)</label>
              <div className="form-group">
                {visaForm.length > 0
                  ? visaForm.map((elem) => {
                      if (
                        elem.type === "file" 
                      ) {
                        return (
                          <div className="d-flex" key={elem._id}>
                            <input
                              className={s["checkbox-form"]}
                              type="checkbox"
                              checked={fields.some(
                                (item) => item._id === elem._id
                              )}
                              onChange={(e) => handleChangeApp(e, elem)}
                            />
                            <label htmlFor={elem._id}>{elem.value}</label>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })
                  : ""}
              </div>
            </Grid>
            <Grid item xs={12}>
              <label className="label-name">VISA form Input type (Checkbox)</label>
              <div className="form-group">
                {visaForm.length > 0
                  ? visaForm.map((elem) => {
                      if (
                        elem.type === "check" 
                      ) {
                        return (
                          <div className="d-flex" key={elem._id}>
                            <input
                              className={s["checkbox-form"]}
                              type="checkbox"
                              checked={fields.some(
                                (item) => item._id === elem._id
                              )}
                              onChange={(e) => handleChangeApp(e, elem)}
                            />
                            <label htmlFor={elem._id}>{elem.value}</label>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })
                  : ""}
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

export default ApplicationAdd;
