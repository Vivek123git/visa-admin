import React, { useEffect, useState } from "react";
import { MdDelete, MdExpandMore, MdOutlineReadMore } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";
import s from "./internship.module.css";
import { useNavigate } from "react-router-dom";
import { Grid, Pagination } from "@mui/material";
import { article_delete_api, article_status_api, fetchAllArticles } from "../api/article";
import { notificationHandler } from "../../utils/Notification";
import Loder from "../../Loder/Loder";
import DataNotFound from "../ErrorPage/DataNotFound";
import { BiFilter, BiSearch } from "react-icons/bi";
import DeletePopup from "../Dialogbox/DeletePopup";
import FilterPopup from "../Dialogbox/FilterPopup";
import { internships_apply_list_api, internships_fav_list_api, internships_list_api, update_internships_api } from "../api/internship.js";
import { useLocation } from "react-router-dom";
const BookMarkIntrenship = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [allArticle, setallArticle] = useState([]);
  const location = useLocation();
  const [pageCount, setpageCount] = useState(1);
  const [deleteId, setdeleteId] = useState();
  const [deletename, setdeletename] = useState();
  const [pageLength, setpageLength] = useState();
  const [enddate, setenddate] = useState();
  const [startdate, setstartdate] = useState();
  console.log(location?.state?.data?.id);
  useEffect(() => {
    fetchAllbookmarkIntrenList();
  }, [pageCount]);

  async function fetchAllbookmarkIntrenList(data) {
    setisLoading(true);
    try {
      const temp = {
        // search: data ? data.trim() : "",
        page: pageCount,
        limit: 8,
        from_date: "",
        to_date: "",
        internships_id: location?.state?.data?.id,
      };
      let res = await internships_fav_list_api(temp);
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

  const resetfun = async () => {
    setenddate("");
    setstartdate("");
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
      let res = await fetchAllArticles(temp);
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

  return (
    <div className="container">
      <div className={s["article-list-title"]}>
        <h3>Bookmark Internship List</h3>
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
            <input type="text" spellCheck="false" onChange={(e) => fetchAllbookmarkIntrenList(e.target.value)} placeholder="Search by name..." />
          </div>
        </div>
      </div>
      {/* <div className={s["filter-container"]}>
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
          <div className={s["filter-btn"]} onClick={() => fetchAllbookmarkIntrenList()}>
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
      </div> */}
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
            </TableRow>
          </TableHead>
          <TableBody>
            {allArticle.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.profile_img ? <img style={{ height: "2rem", width: "3rem" }} src={row.profile_img} alt="" /> : null}</StyledTableCell>
                <StyledTableCell>{row.name} </StyledTableCell>
                <StyledTableCell align="center">{row.email} </StyledTableCell>
                <StyledTableCell align="center">{row.number}</StyledTableCell>
                <StyledTableCell align="center">{row.gender}</StyledTableCell>
                <StyledTableCell align="center">{row.location}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
                <StyledTableCell align="center">{row.Created_date}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {allArticle.length <= 0 && <DataNotFound />}
        {allArticle?.length > 0 && (
          <div className={s["pagination"]}>
            <Pagination count={pageLength} size="large" style={{ color: "#D21903" }} onChange={(e, value) => setpageCount(value)} page={pageCount} />
          </div>
        )}
      </div>

      <Loder loading={isLoading} />
    </div>
  );
};

export default BookMarkIntrenship;
