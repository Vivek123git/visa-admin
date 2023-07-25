import React, { useEffect, useState } from "react";
import { MdDelete, MdExpandMore, MdOutlineReadMore } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";
import s from "./community.module.css";
import { useNavigate } from "react-router-dom";
import { Grid, Pagination } from "@mui/material";
import Select from "react-select";
import { notificationHandler } from "../../utils/Notification";
import Loder from "../../Loder/Loder";
import DataNotFound from "../ErrorPage/DataNotFound";
import { BiFilter, BiSearch } from "react-icons/bi";
import DeletePopup from "../Dialogbox/DeletePopup";
import FilterPopup from "../Dialogbox/FilterPopup";
import { community_all_list_api, delete_community_api, status_update_community_api, update_community_api } from "../api/Community";

const Community = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [allcommunity, setallcommunity] = useState([]);
  const [pageCount, setpageCount] = useState(1);
  const [deleteId, setdeleteId] = useState();
  const [deletedialobbox, setdeletedialobbox] = useState(false);
  const [deletename, setdeletename] = useState();
  const [pageLength, setpageLength] = useState();

  useEffect(() => {
    fetchAllcommunityfun();
  }, [pageCount]);

  async function fetchAllcommunityfun(data) {
    setisLoading(true);
    try {
      const temp = {
        page: pageCount,
        limit: 8,
        search: data ? data.trim() : "",
      };
      let res = await community_all_list_api(temp);
      if (res.data.status) {
        console.log(res);
        let calPageLength = Math.ceil(res.data.community_count / 8);
        setpageLength(calPageLength);
        setallcommunity(res.data.results);
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

  async function deletecommunityFunc() {
    setisLoading(true);
    let temp = {
      id: deleteId,
      is_delete: "1",
    };
    try {
      let res = await delete_community_api(temp);
      if (res.data.status) {
        setisLoading(false);
        setdeletedialobbox(false);
        fetchAllcommunityfun();
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

  const community_status_update = async (data) => {
    setisLoading(true);
    let temp = {
      id: data.id,
      status: data.status == "Active" ? "InActive" : "Active",
    };
    try {
      let res = await update_community_api(temp);
      console.log(res);

      if (res.data.status) {
        setisLoading(false);
        fetchAllcommunityfun();
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
        <h3>Community List</h3>
      </div>
      <div className={s["user-list-heading"]}>
        <div className={s["user-list-title"]}>
          <div className="beat_left">
            <div
              className={s["title"]}
              onClick={() =>
                navigate("/community-add", {
                  state: {
                    pagetype: "Add",
                  },
                })
              }
            >
              <IoMdAdd /> Community
            </div>
          </div>
        </div>
        <div className={s["user-list-search"]}>
          <div className={s["search-box"]}>
            <span style={{ paddingRight: "0.5rem" }}>
              <BiSearch size={23} />
            </span>
            <input type="text" spellCheck="false" onChange={(e) => fetchAllcommunityfun(e.target.value)} placeholder="Search by name..." />
          </div>
        </div>
      </div>

      <div className="beat_table">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Category Name</StyledTableCell>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Member</StyledTableCell>
              <StyledTableCell align="center">Post</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
              <StyledTableCell align="center">Add</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allcommunity.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.img ? <img style={{ height: "2rem", width: "3rem" }} src={row.img} alt="" /> : null}</StyledTableCell>
                <StyledTableCell align="center">{row.category_name} </StyledTableCell>
                <StyledTableCell align="center">{row.title}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.postmember_length}
                  {row.postmember_length > 0 ? (
                    <span
                      className={s["more-option"]}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("/community-member-list", {
                          state: {
                            data: row,
                          },
                        })
                      }
                    >
                      <MdOutlineReadMore size={20} />
                    </span>
                  ) : (
                    ""
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.post_length}
                  {row.post_length > 0 ? (
                    <span
                      className={s["more-option"]}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("/community-post-list", {
                          state: {
                            data: row,
                          },
                        })
                      }
                    >
                      <MdOutlineReadMore size={20} />
                    </span>
                  ) : (
                    ""
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">{row.type}</StyledTableCell>
                <StyledTableCell align="center">{row.Created_date}</StyledTableCell>
                <StyledTableCell align="center">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => community_status_update(row)}
                    className={`${row.status === "Active" ? s.active_admin : s.inactive_admin}`}
                  >
                    {row.status}
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <CiEdit
                    onClick={() =>
                      navigate("/community-add", {
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
                      setdeletename(row.title);
                      setdeleteId(row.id);
                      setdeletedialobbox(true);
                    }}
                    style={{ fontSize: "1rem", color: "var(--clr-primary)", cursor: "pointer" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div
                    className={s["title"]}
                    onClick={() =>
                      navigate("/question-list", {
                        state: {
                          data: row,
                        },
                      })
                    }
                  >
                    Add Question
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {allcommunity.length <= 0 && <DataNotFound />}
        {allcommunity?.length > 0 && (
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
          deletecommunityFunc();
        }}
      />
      <Loder loading={isLoading} />
    </div>
  );
};

export default Community;
