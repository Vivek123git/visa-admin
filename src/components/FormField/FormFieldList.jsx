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
import { article_delete_api, article_status_api } from "../api/ApplicationApi";
import { notificationHandler } from "../../utils/Notification";
import Loder from "../../Loder/Loder";
import DataNotFound from "../ErrorPage/DataNotFound";
import { BiFilter, BiSearch } from "react-icons/bi";
 import { fetchAllFormField,formField_delete_api } from "../api/FormFieldApi";
import DeletePopup from "../Dialogbox/DeletePopup";

const FormFieldList = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [formField, setFormField] = useState([]);
  const [pageCount, setpageCount] = useState(1);
  const [deleteId, setdeleteId] = useState();
  const [deletedialobbox, setdeletedialobbox] = useState(false);
  const [deletename, setdeletename] = useState("");
  const [pageLength, setpageLength] = useState();
  
  useEffect(() => {
     fetchAllFormFieldFunc();
  }, [pageCount]);

  async function fetchAllFormFieldFunc() {
    setisLoading(true);
    try {
      // const temp = {
      //   page: pageCount,
      //   limit: 8,
      //   search: data ? data.trim() : "",
      // };
      let res = await fetchAllFormField();
      if (res.data.status) {
        let calPageLength = Math.ceil(res.data.count / 8);
        setpageLength(calPageLength);
        setFormField(res.data.data);
        setisLoading(false);
      } else {
        setisLoading(false);
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
    let temp =deleteId;
    try {
      let res = await formField_delete_api(temp);
      console.log(res);
      if (res.data.status) {
        setisLoading(false);
        setdeletedialobbox(false);
        fetchAllFormFieldFunc();
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
        <h3>Form Field List</h3>
      </div>
      <div className={s["user-list-heading"]}>
        <div className={s["user-list-title"]}>
          <div className="beat_left">
            <div
              className={s["title"]}
              onClick={() =>
                navigate("/add-form", {
                  state: {
                    pagetype: "Add",
                  },
                })
              }
            >
              <IoMdAdd />Add Field
            </div>
          </div>
        </div>
        <div className={s["user-list-search"]}>
          <div className={s["search-box"]}>
            <span style={{ paddingRight: "0.5rem" }}>
              <BiSearch size={23} />
            </span>
            <input type="text" spellCheck="false" onChange={(e) => fetchAllFormFieldFunc(e.target.value)} placeholder="Search name, Category name..." />
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
              <StyledTableCell>S. No.</StyledTableCell>
              <StyledTableCell align="center">Field Name</StyledTableCell>
              {/* <StyledTableCell align="center">User Name</StyledTableCell> */}
              <StyledTableCell align="center">Placeholder</StyledTableCell>
              <StyledTableCell align="center">Input Type</StyledTableCell>
              {/* <StyledTableCell align="center">Description</StyledTableCell> */}
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formField.map((row,id) => (
              <StyledTableRow key={row.id}>
                
                <StyledTableCell>{id+1} </StyledTableCell>
                <StyledTableCell align="center">{row.value}</StyledTableCell>
                <StyledTableCell align="center">{row.placeholder} </StyledTableCell>
                <StyledTableCell align="center">{row.type}</StyledTableCell>
                
                <StyledTableCell align="center">
                  <CiEdit
                    onClick={() =>
                      navigate("/add-form", {
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
                      setdeletename(row.value);
                      setdeleteId(row._id);
                    }}
                    title="Delete"
                    style={{ fontSize: "1rem", color: "var(--clr-primary)", cursor: "pointer", marginRight: "0.5rem", }}
                  />
                  {/* <AiFillEye  style={{
                      fontSize: "1rem",
                      color: "var(--clr-primary)",
                      marginRight: "0.5rem",
                      cursor: "pointer",
                    }} 
                    title="View"
                    onClick={() =>
                      navigate("/view-form", {
                        state: {
                          pagetype: "View",
                          data: row,
                        },
                      })
                    }
                   
                  /> */}
                  
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody >
        </Table>
        {formField.length <= 0 && <DataNotFound />}
        {formField?.length > 0 && (
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

export default FormFieldList;
