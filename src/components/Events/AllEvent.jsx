import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import {AiFillEye} from "react-icons/ai"
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";
import s from "./event.module.css";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination } from "@mui/material";
import { article_delete_api, article_status_api } from "../api/article";
import { notificationHandler } from "../../utils/Notification";
import Loder from "../../Loder/Loder";
import DataNotFound from "../ErrorPage/DataNotFound";
import { BiFilter, BiSearch } from "react-icons/bi";
import { fetchAllEvents, update_event_api } from "../api/event";
import DeletePopup from "../Dialogbox/DeletePopup";

const AllEvent = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [allEvent, setallEvent] = useState([]);
  const [pageCount, setpageCount] = useState(1);
  const [deleteId, setdeleteId] = useState();
  const [deletedialobbox, setdeletedialobbox] = useState(false);
  const [deletename, setdeletename] = useState("");
  const [currentGroup, setcurrentGroup] = useState({});
  const [pageLength, setpageLength] = useState();
  useEffect(() => {
    fetchAllEventFunc();
  }, [pageCount]);

  async function fetchAllEventFunc(data) {
    setisLoading(true);
    try {
      const temp = {
        page: pageCount,
        limit: 8,
        search: data ? data.trim() : "",
      };
      let res = await fetchAllEvents(temp);
      if (res.data.status) {
        console.log(res);
        let calPageLength = Math.ceil(res.data.count / 8);
        setpageLength(calPageLength);
        setallEvent(res.data.results);
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

  async function deletearticleFunc() {
    setisLoading(true);
    let temp = {
      id: deleteId,
      is_delete: "1",
    };
    try {
      let res = await update_event_api(temp);
      console.log(res);
      if (res.data.status) {
        setisLoading(false);
        setdeletedialobbox(false);
        fetchAllEventFunc();
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

  const article_status = async (data) => {
    setisLoading(true);
    let temp = {
      id: data.id,
      status: data.status == "Active" ? "InActive" : "Active",
    };
    try {
      let res = await update_event_api(temp);
      console.log(res);

      if (res.data.status) {
        setisLoading(false);
        fetchAllEventFunc();
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
        <h3>Event List</h3>
      </div>
      <div className={s["user-list-heading"]}>
        <div className={s["user-list-title"]}>
          <div className="beat_left">
            <div
              className={s["title"]}
              onClick={() =>
                navigate("/add-event", {
                  state: {
                    pagetype: "Add",
                  },
                })
              }
            >
              <IoMdAdd /> Event
            </div>
          </div>
        </div>
        <div className={s["user-list-search"]}>
          <div className={s["search-box"]}>
            <span style={{ paddingRight: "0.5rem" }}>
              <BiSearch size={23} />
            </span>
            <input type="text" spellCheck="false" onChange={(e) => fetchAllEventFunc(e.target.value)} placeholder="Search name, Category name..." />
          </div>
          {/* <div className={s["filter-btn"]}>
            <span style={{ paddingRight: "2px" }}>
              <BiFilter size={20} />
            </span>
            Filter
          </div> */}
        </div>
      </div>
      <div className="beat_table">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              {/* <StyledTableCell align="center">User Name</StyledTableCell> */}
              <StyledTableCell align="center">Category Name</StyledTableCell>
              <StyledTableCell align="center">Location</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allEvent.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.image ? <img style={{ height: "2rem", width: "3rem" }} src={row.image} alt="" /> : null}</StyledTableCell>
                <StyledTableCell>{row.name} </StyledTableCell>
                {/* <StyledTableCell align="center">{row.user_name} </StyledTableCell> */}
                <StyledTableCell align="center">{row.category_name}</StyledTableCell>
                <StyledTableCell align="center">{row.location}</StyledTableCell>
                <StyledTableCell align="center">{row.description.slice(0, 10)}</StyledTableCell>
                <StyledTableCell align="center">{row.date}</StyledTableCell>
                <StyledTableCell align="center">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => article_status(row)}
                    className={`${row.status === "Active" ? s.active_admin : s.inactive_admin}`}
                  >
                    {row.status}
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <CiEdit
                    onClick={() =>
                      navigate("/add-event", {
                        state: {
                          pagetype: "Edit",
                          data: row,
                        },
                      })
                    }
                    title="Edit"
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
                    title="Delete"
                    style={{ fontSize: "1rem", color: "var(--clr-primary)", cursor: "pointer", marginRight: "0.5rem", }}
                  />
                  <AiFillEye  style={{
                      fontSize: "1rem",
                      color: "var(--clr-primary)",
                      marginRight: "0.5rem",
                      cursor: "pointer",
                    }} 
                    title="View"
                    onClick={() =>
                      navigate("/view-event", {
                        state: {
                          pagetype: "View",
                          data: row,
                        },
                      })
                    }
                   
                  />
                  
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody >
        </Table>
        {allEvent.length <= 0 && <DataNotFound />}
        {allEvent?.length > 0 && (
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
          deletearticleFunc();
        }}
      />
      <Loder loading={isLoading} />
    </div>
  );
};

export default AllEvent;
