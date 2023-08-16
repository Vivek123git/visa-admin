import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import {GrFormView} from "react-icons/gr"
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";
import s from "./../FormField/event.module.css";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination } from "@mui/material";
import { notificationHandler } from "../../utils/Notification";
import Loder from "../../Loder/Loder";
import DataNotFound from "../ErrorPage/DataNotFound";
import { BiFilter, BiSearch } from "react-icons/bi";
import DeletePopup from "../Dialogbox/DeletePopup";
import { fetchAllVisa,delete_visaType_api } from "../api/VisaTypeApi";

const VisaTypeList = ({allCategory}) => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [allVisaType, setallVisaType] = useState([]);
  const [pageCount, setpageCount] = useState(1);
  const [deleteId, setdeleteId] = useState();
  const [deletedialobbox, setdeletedialobbox] = useState(false);
  const [deletename, setdeletename] = useState("");
  const [pageLength, setpageLength] = useState();

  useEffect(() => {
     fetchAllVisaFunc();
  }, [pageCount]);

  async function fetchAllVisaFunc() {
    setisLoading(true);
    try {
      // const temp = {
      //   page: pageCount,
      //   limit: 8,
      //   search: data ? data.trim() : "",
      // };
      let res = await fetchAllVisa();
      if (res.data.status) {
        console.log(res,"count")
        let calPageLength = Math.ceil(res.data.count / 8);
        setpageLength(calPageLength);
        setallVisaType(res.data.data);
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
    let temp = deleteId;
    try {
      let res = await delete_visaType_api(temp);
      console.log(res);
      if (res.data.status) {
        setisLoading(false);
        setdeletedialobbox(false);
        fetchAllVisaFunc();
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


  return (
    <div className="container">
      <div className={s["article-list-title"]}>
        <h3>Visa type List</h3>
      </div>
      <div className={s["user-list-heading"]}>
        <div className={s["user-list-title"]}>
          <div className="beat_left">
            <div
              className={s["title"]}
              onClick={() =>
                navigate("/add-visa-type", {
                  state: {
                    pagetype: "Add",
                  },
                })
              }
            >
              <IoMdAdd /> Visa type
            </div>
          </div>
        </div>
        <div className={s["user-list-search"]}>
          <div className={s["search-box"]}>
            <span style={{ paddingRight: "0.5rem" }}>
              <BiSearch size={23} />
            </span>
            <input type="text" spellCheck="false" onChange={(e) => fetchAllVisaFunc(e.target.value)}  placeholder="Search visa type name..." />
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
              <StyledTableCell align="center">S. No.</StyledTableCell>
              <StyledTableCell align="center">Visa Type</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allVisaType.map((row,id) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell align="center">{id+1}</StyledTableCell>
                <StyledTableCell align="center">{row.type}</StyledTableCell>
                <StyledTableCell align="center">
                  <CiEdit
                    onClick={() =>
                      navigate("/add-visa-type", {
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
                      setdeletename(row.type);
                      setdeleteId(row._id);
                    }}
                    title="Delete"
                    style={{ fontSize: "1rem", color: "var(--clr-primary)", cursor: "pointer" }}
                  />
                  
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody >
        </Table>
        {allVisaType.length <= 0 && <DataNotFound />}
        {allVisaType?.length > 0 && (
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

export default VisaTypeList;
