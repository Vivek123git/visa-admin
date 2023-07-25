import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";
import s from "./internship.module.css";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { notificationHandler } from "../../utils/Notification";
import Loder from "../../Loder/Loder";
import DataNotFound from "../ErrorPage/DataNotFound";
import { BiSearch } from "react-icons/bi";
import { internships_apply_list_api, update_internships_apply_api } from "../api/internship.js";
import { useLocation } from "react-router-dom";
import { IntrenshipMessageupdate } from "../Dialogbox/FilterPopup";
const ApplyIntrenshipList = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [allintrenList, setallArticle] = useState([]);
  const location = useLocation();
  const [pageCount, setpageCount] = useState(1);
  const [pageLength, setpageLength] = useState();
  const [userdetails, setuserdetails] = useState("");
  const [sceduleInterview, setsceduleInterview] = useState(false);
  const [userID, setuserID] = useState("");
  console.log(location?.state?.data?.id);
  useEffect(() => {
    fetchAllintrenshipApply();
  }, [pageCount]);

  async function fetchAllintrenshipApply(data) {
    setisLoading(true);
    try {
      const temp = {
        page: pageCount,
        limit: 8,
        from_date: "",
        to_date: "",
        internships_id: location?.state?.data?.id,
      };
      let res = await internships_apply_list_api(temp);
      if (res.data.status) {
        console.log(res);
        let calPageLength = Math.ceil(res.data.count / 8);
        setpageLength(calPageLength);
        setallArticle(res.data.results);
        setisLoading(false);
      } else {
        setisLoading(false);
        console.log("status false!");
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  const intren_status = async (data, e) => {
    console.log(data, e.target.value);
    setisLoading(true);
    let temp = {
      id: data.id,
      status: e.target.value,
    };
    try {
      let res = await update_internships_apply_api(temp);
      if (res.data.status) {
        setisLoading(false);
        fetchAllintrenshipApply();
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

  const inteview_schedule = (data) => {
    setuserdetails(data.status);
    setuserID(data.id);
    setsceduleInterview(true);
  };

  const intren_inteview_status = async (data) => {
    setisLoading(true);
    let temp = {
      id: userID,
      status: data.status,
      date: data.date,
      text: data.text,
    };
    try {
      let res = await update_internships_apply_api(temp);
      if (res.data.status) {
        setisLoading(false);
        setsceduleInterview(false);
        fetchAllintrenshipApply();
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
    <div className="container">
      <div className={s["article-list-title"]}>
        <h3>Apply Internship List</h3>
      </div>
      <div className={s["user-list-heading"]}>
        <div className={s["user-list-title"]}>
          <div className="beat_left">
            <div className={s["title"]} onClick={() => navigate(-1)}>
              <AiOutlineArrowLeft /> Back
            </div>
          </div>
        </div>
        <div className={s["user-list-search"]}>
          <div className={s["search-box"]}>
            <span style={{ paddingRight: "0.5rem" }}>
              <BiSearch size={23} />
            </span>
            <input type="text" spellCheck="false" onChange={(e) => fetchAllintrenshipApply(e.target.value)} placeholder="Search by name..." />
          </div>
        </div>
      </div>

      <div className="beat_table">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Mobile</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Location</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
              <StyledTableCell align="center">Q/A</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allintrenList.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.profile_img ? <img style={{ height: "2rem", width: "3rem" }} src={row.profile_img} alt="" /> : null}</StyledTableCell>
                <StyledTableCell>{row.name} </StyledTableCell>
                <StyledTableCell align="center">{row.email} </StyledTableCell>
                <StyledTableCell align="center">{row.number}</StyledTableCell>
                <StyledTableCell align="center">{row.gender}</StyledTableCell>
                <StyledTableCell align="center">{row.location}</StyledTableCell>
                <StyledTableCell align="center">
                  <div className="form-group">
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      style={{
                        color: `${row.status === "Approve" ? "black" : row.status === "Pending" ? "black" : row.status === "Rejected" ? "gray" : "green"}`,
                      }}
                      value={row.status}
                      onChange={(e) => intren_status(row, e)}
                    >
                      <option style={{ color: "black" }} value="Approved">
                        Approve
                      </option>
                      <option style={{ color: "black" }} value="Rejected">
                        Rejected
                      </option>
                      <option style={{ color: "black" }} value="Pending">
                        Pending
                      </option>
                      <option style={{ color: "black" }} value="Short-listed">
                        Short List
                      </option>
                      <option style={{ color: "black" }} value="Selected">
                        Selected
                      </option>
                    </select>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">{row.Created_date}</StyledTableCell>
                <StyledTableCell align="center">
                  <div style={{ cursor: "pointer" }} className={s["active_admin"]} onClick={() => inteview_schedule(row)}>
                    Schedule
                  </div>
                </StyledTableCell>
                {row.qus_ans && (
                  <StyledTableCell align="center" style={{ cursor: "pointer" }} onClick={() => navigate("/submit-question-list", { state: row })}>
                    <div className={s["active_admin"]}>View</div>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {allintrenList.length <= 0 && <DataNotFound />}
        {allintrenList?.length > 0 && (
          <div className={s["pagination"]}>
            <Pagination count={pageLength} size="large" style={{ color: "#D21903" }} onChange={(e, value) => setpageCount(value)} page={pageCount} />
          </div>
        )}
      </div>
      <Loder loading={isLoading} />
      <IntrenshipMessageupdate
        open={sceduleInterview}
        close={() => setsceduleInterview(!sceduleInterview)}
        data={userdetails}
        onsubmit={(formdetails) => intren_inteview_status(formdetails)}
      />
    </div>
  );
};

export default ApplyIntrenshipList;
