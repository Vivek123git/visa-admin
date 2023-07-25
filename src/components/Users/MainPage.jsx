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
import s from "./user.module.css";
import { useNavigate } from "react-router-dom";
import { Grid, Pagination } from "@mui/material";
import { fetchAllUsers, user_delete_api, user_status_api } from "../api/user";
import { notificationHandler } from "../../utils/Notification";
import Loder from "../../Loder/Loder";
import { BiFilter, BiSearch } from "react-icons/bi";
import DataNotFound from "../ErrorPage/DataNotFound";
import DeletePopup from "../Dialogbox/DeletePopup";
import FilterPopup from "../Dialogbox/FilterPopup";

const SubAdminList = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [allUsers, setallUsers] = useState([]);
  const [pageCount, setpageCount] = useState(1);
  const [deleteId, setdeleteId] = useState("");
  const [deletedialobbox, setdeletedialobbox] = useState(false);
  const [deletename, setdeletename] = useState();
  const [pageLength, setpageLength] = useState();
  const [startdate, setstartdate] = useState("");
  const [status, setstatus] = useState("");
  const [enddate, setenddate] = useState("");
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
        status: status,
        from_date: startdate,
        to_date: enddate,
      };
      let res = await fetchAllUsers(temp);
      if (res.data.status) {
        let calPageLength = Math.ceil(res.data.count / 8);
        setallUsers(res.data.results);
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
        status: status,
        from_date: startdate,
        to_date: enddate,
      };
      let res = await fetchAllUsers(temp);
      if (res.data.status) {
        let calPageLength = Math.ceil(res.data.count / 8);
        setallUsers(res.data.results);
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
    setstatus("");
    setisLoading(true);
    try {
      const temp = {
        page: pageCount,
        limit: 8,
        search: "",
        status: "",
        from_date: "",
        to_date: "",
      };
      let res = await fetchAllUsers(temp);
      if (res.data.status) {
        let calPageLength = Math.ceil(res.data.count / 8);
        setallUsers(res.data.results);
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
        setdeletedialobbox(false);
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

  const user_status = async (data) => {
    setisLoading(true);
    let temp = {
      id: data.id,
      status: data.status == "Active" ? "InActive" : "Active",
    };
    try {
      let res = await user_status_api(temp);
      console.log(res);

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
            <h3>Users List</h3>
          </div>
          <div className={s["user-list-search"]}>
            <div className={s["search-box"]}>
              <span style={{ paddingRight: "0.5rem" }}>
                <BiSearch size={23} />
              </span>
              <input type="text" spellCheck="false" onChange={(e) => fetchAllUsersFunc(e.target.value)} placeholder="Search users by name.." />
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
              <Grid item xs={4}>
                <div className="form-group">
                  <label for="exampleInputEmail1">Status</label>
                  <select className="form-control" id="exampleFormControlSelect1" value={status} onChange={(e) => setstatus(e.target.value)}>
                    <option selected value="">
                      Select
                    </option>
                    <option value="Active">Active</option>
                    <option value="InActive">InActive</option>
                  </select>
                </div>
              </Grid>
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
      </div>
      <div className="beat_table">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Number</StyledTableCell>
              <StyledTableCell align="center">College/School</StyledTableCell>
              <StyledTableCell align="center">Created</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allUsers.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.profile_img ? <img style={{ height: "2rem", width: "3rem" }} src={row.profile_img} alt="" /> : null}</StyledTableCell>
                <StyledTableCell>{row.name} </StyledTableCell>
                <StyledTableCell align="center">{row.email} </StyledTableCell>
                <StyledTableCell align="center">{row.number}</StyledTableCell>
                <StyledTableCell align="center" style={{ width: "21%" }}>
                  {row?.education[0]?.school_and_college}
                </StyledTableCell>
                <StyledTableCell align="center">{row?.Created_date}</StyledTableCell>
                <StyledTableCell align="center">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => user_status(row)}
                    className={`${row.status === "Active" ? s.active_admin : s.inactive_admin}`}
                  >
                    {row.status}
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
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
                      setdeletedialobbox(true);
                      setdeletename(row.name);
                      setdeleteId(row.id);
                    }}
                    style={{ fontSize: "1rem", color: "var(--clr-primary)", cursor: "pointer" }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {allUsers.length <= 0 && <DataNotFound />}
        {allUsers?.length > 0 && (
          <div className={s["pagination"]}>
            <Pagination count={pageLength} size="large" style={{ color: "#D21903" }} onChange={(e, value) => setpageCount(value)} page={pageCount} />
          </div>
        )}
      </div>
      <DeletePopup
        open={deletedialobbox}
        name={deletename}
        close={() => setdeletedialobbox(!deletedialobbox)}
        onsubmit={() => {
          deleteuserFunc();
        }}
      />
      <Loder loading={isLoading} />
    </div>
  );
};

export default SubAdminList;
