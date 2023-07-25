import React from "react";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination } from "@mui/material";
import s from "./Dialogbox.module.css";
import { useState } from "react";
import { useEffect } from "react";

export const IntrenshipMessageupdate = ({ open, close, data, onsubmit }) => {
  const [userstatus, setuserstatus] = useState("");
  const [date, setdate] = useState("");
  const [text, settext] = useState("");
  useEffect(() => {
    setuserstatus(data);
  }, [data]);

  const formsubmit = () => {
    const formdetails = {
      date: date,
      status: userstatus,
      text: text,
    };
    onsubmit(formdetails);
    setdate("");
    settext("");
  };
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        fullWidth="true"
        onClose={() => {
          setuserstatus(data);
          setdate("");
          settext("");
          close();
        }}
      >
        <DialogTitle className={s.dialog_title}>
          <div>
            <h3 className="text-center">Schedule</h3>
          </div>
          <div className="filter-container">
            <div className="filter-content">
              <div class="">
                <div className="form-group my-2">
                  <label for="exampleInputEmail1">Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="form-control"
                    name="date"
                    value={date}
                    onChange={(e) => setdate(e.target.value)}
                    placeholder=""
                  />
                </div>
                <div className="form-group my-2">
                  <label for="exampleInputEmail1">Select Status</label>

                  <select className="form-control" id="exampleFormControlSelect1" value={userstatus} onChange={(e) => setuserstatus(e.target.value)}>
                    <option style={{ color: "black" }} value="Approve">
                      Approve
                    </option>
                    <option style={{ color: "black" }} value="Rejected">
                      Rejected
                    </option>
                    <option style={{ color: "black" }} value="Pending">
                      Pending
                    </option>
                    <option style={{ color: "black" }} value="Short-list">
                      Short List
                    </option>
                    <option style={{ color: "black" }} value="Selected">
                      Selected
                    </option>
                  </select>
                </div>
                <div className="form-group my-2">
                  <label for="exampleInputEmail1">Message</label>
                  <textarea type="text" className="form-control" onChange={(e) => settext(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </DialogTitle>
        <DialogContent className={s.cardpopup_content}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div
              className={s.employee_gl_popup}
              onClick={() => {
                setuserstatus(data);
                setdate("");
                settext("");
                close();
              }}
            >
              Cancel
            </div>
            <div className={s.employee_gl_popup_del} onClick={() => formsubmit()}>
              Apply
            </div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

const FilterPopup = ({ open, close, name, onsubmit }) => {
  const deleteBrandFunc = () => {
    onsubmit("data");
  };
  return (
    <>
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true" onClose={() => close()}>
        <DialogTitle className={s.dialog_title}>
          <div>
            <h3>Filter</h3>
          </div>
          <div className="filter-container">
            <div className="filter-content">
              <h5>Categories</h5>
              <div class="">
                <div class="form-check filter_categories_color">
                  <input class="form-check-input" type="checkbox" id="Vastu" value="" />
                  <label class="form-check-label" for="Vastu">
                    Vastu
                  </label>
                </div>
              </div>
            </div>
          </div>
        </DialogTitle>
        <DialogContent className={s.cardpopup_content}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={s.employee_gl_popup} onClick={() => close()}>
              Cancel
            </div>
            <div className={s.employee_gl_popup_del} onClick={() => deleteBrandFunc()}>
              Apply
            </div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default FilterPopup;
