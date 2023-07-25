import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";
import s from "./booking.module.css";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination, Grid } from "@mui/material";
import { user_delete_api, user_status_api } from "../api/user";
import { notificationHandler } from "../../utils/Notification";
import Loder from "../../Loder/Loder";
import { BiFilter, BiSearch } from "react-icons/bi";
import DataNotFound from "../ErrorPage/DataNotFound";
import { booking_event_api, statusupdate_event_api } from "../api/booking_event";

const BookingEventList = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [allUsers, setallUsers] = useState([]);
  const [pageCount, setpageCount] = useState(1);
  const [deleteId, setdeleteId] = useState("");
  const [deletePopup, setdeletePopup] = useState(false);
  const [currentGroup, setcurrentGroup] = useState({});
  const [pageLength, setpageLength] = useState();
  const [enddate, setenddate] = useState("");
  const [startdate, setstartdate] = useState("");
  useEffect(() => {
    fetchAllUsersFunc();
  }, [pageCount]);

  async function fetchAllUsersFunc(data) {
    setisLoading(true);
    try {
      const temp = {
        page: pageCount,
        limit: 8,
        search: data ? data.trim() : "",
        from_date: startdate,
        to_date: enddate,
      };
      let res = await booking_event_api(temp);
      if (res.data.status) {
        let calPageLength = Math.ceil(res?.data?.count / 8);
        setallUsers(res?.data?.results);
        setpageLength(calPageLength);
        setisLoading(false);
      } else {
        setisLoading(false);
        console.log("status false!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function filterAllUsersFunc(data) {
    setisLoading(true);
    try {
      const temp = {
        page: 1,
        limit: 8,
        search: data ? data.trim() : "",
        from_date: startdate,
        to_date: enddate,
      };
      let res = await booking_event_api(temp);
      if (res.data.status) {
        let calPageLength = Math.ceil(res?.data?.count / 8);
        setallUsers(res?.data?.results);
        setpageLength(calPageLength);
        setisLoading(false);
      } else {
        setisLoading(false);
        console.log("status false!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const resetfun = async () => {
    setenddate("");
    setstartdate("");
    setisLoading(true);
    try {
      const temp = {
        page: pageCount,
        limit: 8,
        search: "",
        from_date: "",
        to_date: "",
      };
      let res = await booking_event_api(temp);
      if (res.data.status) {
        let calPageLength = Math.ceil(res?.data?.count / 8);
        setallUsers(res?.data?.results);
        setpageLength(calPageLength);
        setisLoading(false);
      } else {
        setisLoading(false);
        console.log("status false!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "var(--clr-primary)",
      color: theme.palette.common.white,
      fontWeight: "bold",
      borderRight: "1px solid #fff",
      overflow: "hidden",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      border: "none",
      borderLeft: "2px solid #00000011",
      "&:last-child": {
        borderRight: "2px solid #00000011",
      },
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    borderBottom: "2px solid #00000011",
  }));

  async function deleteuserFunc() {
    setisLoading(true);
    let temp = {
      id: deleteId,
      is_delete: "1",
    };
    try {
      let res = await user_delete_api(temp);
      console.log(res);
      if (res.data.status) {
        setisLoading(false);
        setdeletePopup(false);
        fetchAllUsersFunc();
        notificationHandler({ type: "success", msg: res.data.message });
      } else {
        setisLoading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log(error);
      notificationHandler({ type: "danger", msg: error.message });
    }
  }

  const event_status = async (data, e) => {
    console.log(data, e.target.value);
    setisLoading(true);
    let temp = {
      id: data.id,
      status: e.target.value,
    };
    try {
      let res = await statusupdate_event_api(temp);
      if (res.data.status) {
        setisLoading(false);
        fetchAllUsersFunc();
        notificationHandler({ type: "success", msg: res.data.message });
      } else {
        setisLoading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log(error);
      notificationHandler({ type: "danger", msg: error.message });
    }
  };
  return (
    <div className="">
      <div className="beat_heading">
        <div className={s["user-list-heading"]}>
          <div className="user-list-title">
            <h3>Booking Event List</h3>
          </div>
          <div className={s["user-list-search"]}>
            <div className={s["search-box"]}>
              <span style={{ paddingRight: "0.5rem" }}>
                <BiSearch size={23} />
              </span>
              <input type="text" spellCheck="false" onChange={(e) => fetchAllUsersFunc(e.target.value)} placeholder="Search by users..." />
            </div>
          </div>
        </div>

        <div className={s["filter-container"]}>
          <div className={s["filter-left"]}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={4}>
                <div className="form-group">
                  <label for="exampleInputEmail1">Start Date</label>
                  <input type="date" placeholder="Role" className="form-control" value={startdate} onChange={(e) => setstartdate(e.target.value)} />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="form-group">
                  <label for="exampleInputEmail1">End Date</label>
                  <input type="date" placeholder="Role" className="form-control" value={enddate} onChange={(e) => setenddate(e.target.value)} />
                </div>
              </Grid>
              {/* <Grid item xs={4}>
                <div className="form-group">
                  <label for="exampleInputEmail1">Status</label>
                  <select className="form-control" id="exampleFormControlSelect1" value={status} onChange={(e) => setstatus(e.target.value)}>
                    <option selected value="">
                      Select
                    </option>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending</option>
                    <option value="Reject">Reject</option>
                  </select>
                </div>
              </Grid> */}
            </Grid>
          </div>
          <div className="filter-right">
            <div className={s["filter-btn"]} onClick={() => filterAllUsersFunc()}>
              <span style={{ paddingRight: "2px" }}>
                <BiFilter size={20} />
              </span>
              Filter
            </div>
          </div>
          <div
            className={s["filter-btn"]}
            onClick={() => {
              resetfun();
            }}
          >
            Reset
          </div>
        </div>

        <div className="beat_left">
          {/* <div
            className={s["title"]}
            onClick={() =>
              navigate("/useradd", {
                state: {
                  pagetype: "Add",
                },
              })
            }
          >
            <IoMdAdd /> Add User
          </div> */}
        </div>
      </div>
      <div className="beat_table">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Location</StyledTableCell>
              <StyledTableCell align="center">Event Date</StyledTableCell>
              <StyledTableCell align="center">Time</StyledTableCell>
              <StyledTableCell align="center">₹ Price</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Created Date</StyledTableCell>
              {/* <StyledTableCell align="center">Action</StyledTableCell> */}
            </TableRow>
          </TableHead>
          {/* <div style={{ margin: "0.5rem 0" }}></div> */}

          <TableBody>
            {allUsers?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.event_image ? <img style={{ height: "2rem", width: "3rem" }} src={row.event_image} alt="" /> : null}</StyledTableCell>
                <StyledTableCell>{row.event_name} </StyledTableCell>
                <StyledTableCell>{row.event_location} </StyledTableCell>
                <StyledTableCell>{row.event_date} </StyledTableCell>
                <StyledTableCell>
                  {row.event_start_time} to {row.event_end_time}
                </StyledTableCell>
                <StyledTableCell>{row.booking_price}</StyledTableCell>
                <StyledTableCell>
                  <div className="form-group">
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      style={{
                        color: `${
                          row.booking_status === "Approve"
                            ? "green"
                            : row.booking_status === "Pending"
                            ? "black"
                            : row.booking_status === "Rejected"
                            ? "gray"
                            : "black"
                        }`,
                      }}
                      value={row.booking_status}
                      onChange={(e) => event_status(row, e)}
                    >
                      <option style={{ color: "black" }} value="Approve">
                        Approve
                      </option>
                      <option style={{ color: "black" }} value="Rejected">
                        Rejected
                      </option>
                      <option style={{ color: "black" }} value="Pending">
                        Pending
                      </option>
                    </select>
                  </div>
                </StyledTableCell>
                <StyledTableCell>{row.booking_Created_date} </StyledTableCell>
                {/* <StyledTableCell align="center">
                  <CiEdit
                    onClick={() =>
                      navigate("/useradd", {
                        state: {
                          pagetype: "Edit",
                          data: row,
                        },
                      })
                    }
                    style={{
                      fontSize: "1rem",
                      color: "var(--clr-primary)",
                      marginRight: "0.5rem",
                      cursor: "pointer",
                    }}
                  />
                  <MdDelete
                    onClick={() => {
                      setdeletePopup(true);
                      setdeleteId(row.id);
                    }}
                    style={{ fontSize: "1rem", color: "var(--clr-primary)", cursor: "pointer" }}
                  />
                </StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {allUsers?.length <= 0 && <DataNotFound />}
        {allUsers?.length > 0 && (
          <div className={s["pagination"]}>
            <Pagination count={pageLength} size="large" style={{ color: "#D21903" }} onChange={(e, value) => setpageCount(value)} page={pageCount} />
          </div>
        )}
      </div>

      <Dialog open={deletePopup} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true" onClose={() => setdeletePopup(false)}>
        <DialogTitle className={s.dialog_title}>
          <div>Do you want to delete {currentGroup.name}?</div>
        </DialogTitle>
        <DialogContent className={s.cardpopup_content}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={s.employee_gl_popup} onClick={() => setdeletePopup(false)}>
              Cancel
            </div>
            <div className={s.employee_gl_popup_del} onClick={() => deleteuserFunc()}>
              Delete
            </div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <Loder loading={isLoading} />
    </div>
  );
};

export default BookingEventList;
