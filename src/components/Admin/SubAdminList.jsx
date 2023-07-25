import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";
import s from "./admin.module.css";
import { useNavigate } from "react-router-dom";
import { delete_admin_api, fetchAllAdmin, status_admin_api } from "../api/admin";
import Loder from "../../Loder/Loder";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination } from "@mui/material";
import { notificationHandler } from "../../utils/Notification";
import { BiFilter, BiSearch } from "react-icons/bi";
import DataNotFound from "../ErrorPage/DataNotFound";

const SubAdminList = () => {
  const navigate = useNavigate();
  const [isloading, setisLoading] = useState(false);
  const [allAdmins, setallAdmins] = useState([]);
  const [pageCount, setpageCount] = useState(1);
  const [deleteId, setdeleteId] = useState("");
  const [deletePopup, setdeletePopup] = useState(false);
  const [currentGroup, setcurrentGroup] = useState({});
  const [pageLength, setpageLength] = useState();

  useEffect(() => {
    fetchAllAdminFunc();
  }, [pageCount]);

  async function fetchAllAdminFunc(data) {
    setisLoading(true);
    try {
      const temp = {
        page: pageCount,
        limit: 8,
        search: data ? data.trim() : "",
      };
      let res = await fetchAllAdmin(temp);
      if (res.data.status) {
        setallAdmins(res.data.results);
        let calPageLength = Math.ceil(res.data.count / 8);
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

  async function deleteBrandFunc() {
    setisLoading(true);
    let temp = {
      id: deleteId,
      is_delete: "1",
    };
    try {
      let res = await delete_admin_api(temp);
      console.log(res);

      if (res.data.status) {
        setdeletePopup(false);
        setisLoading(false);
        fetchAllAdminFunc();
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

  const admin_status = async (data) => {
    setisLoading(true);
    let temp = {
      id: data.id,
      status: data.status == "Active" ? "InActive" : "Active",
    };
    try {
      let res = await status_admin_api(temp);
      console.log(res);

      if (res.data.status) {
        setisLoading(false);
        fetchAllAdminFunc();
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
      <div className="beat_heading">
        <div className={s["user-list-title"]}>
          <h3>Admin List</h3>
        </div>
        <div className={s["user-list-heading"]}>
          <div className={s["user-list-title"]}>
            <div className="beat_left">
              <div
                className={s["title"]}
                onClick={() =>
                  navigate("/adminadd", {
                    state: {
                      pagetype: "Add",
                    },
                  })
                }
              >
                <IoMdAdd /> Admin
              </div>
            </div>
          </div>
          <div className={s["user-list-search"]}>
            <div className={s["search-box"]}>
              <span style={{ paddingRight: "0.5rem" }}>
                <BiSearch size={23} />
              </span>
              <input type="text" spellCheck="false" onChange={(e) => fetchAllAdminFunc(e.target.value)} placeholder="Search name, email, number..." />
            </div>
            {/* <div className={s["filter-btn"]}>
              <span style={{ paddingRight: "2px" }}>
                <BiFilter size={20} />
              </span>
              Filter
            </div> */}
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
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          {/* <div style={{ margin: "0.5rem 0" }}></div> */}
          <TableBody>
            {allAdmins?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.profile_img ? <img style={{ height: "2rem", width: "3rem" }} src={row.profile_img} alt="" /> : null}</StyledTableCell>
                <StyledTableCell>{row.first_name} </StyledTableCell>
                <StyledTableCell align="center">{row.email} </StyledTableCell>
                <StyledTableCell align="center">{row.number}</StyledTableCell>
                <StyledTableCell align="center">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => admin_status(row)}
                    className={`${row.status === "Active" ? s.active_admin : s.inactive_admin}`}
                  >
                    {row.status}
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <CiEdit
                    onClick={() =>
                      navigate("/adminadd", {
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
                      setcurrentGroup(row);
                    }}
                    style={{ fontSize: "1rem", color: "var(--clr-primary)", cursor: "pointer" }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {allAdmins.length <= 0 && <DataNotFound />}
        {allAdmins?.length > 0 && (
          <div className={s["pagination"]}>
            <Pagination count={pageLength} size="large" style={{ color: "#D21903" }} onChange={(e, value) => setpageCount(value)} page={pageCount} />
          </div>
        )}
      </div>

      <Dialog open={deletePopup} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true" onClose={() => setdeletePopup(false)}>
        <DialogTitle className={s.dialog_title}>
          <div>Do you want to delete {currentGroup.first_name}?</div>
        </DialogTitle>
        <DialogContent className={s.cardpopup_content}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={s.employee_gl_popup} onClick={() => setdeletePopup(false)}>
              Cancel
            </div>
            <div className={s.employee_gl_popup_del} onClick={() => deleteBrandFunc()}>
              Delete
            </div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <Loder loading={isloading} />
    </div>
  );
};

export default SubAdminList;
