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
import s from "./articles.module.css";
import { useNavigate } from "react-router-dom";
import { Grid, Pagination } from "@mui/material";
import {
  article_delete_api,
  article_status_api,
  fetchAllArticles,
} from "../api/article";
import { notificationHandler } from "../../utils/Notification";
import Loder from "../../Loder/Loder";
import DataNotFound from "../ErrorPage/DataNotFound";
import { BiFilter, BiSearch } from "react-icons/bi";
import DeletePopup from "../Dialogbox/DeletePopup";
import FilterPopup from "../Dialogbox/FilterPopup";
import { AiFillEye } from "react-icons/ai";

const SubAdminList = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [allArticle, setallArticle] = useState([]);
  const [pageCount, setpageCount] = useState(1);
  const [deleteId, setdeleteId] = useState();
  const [deletedialobbox, setdeletedialobbox] = useState(false);
  const [deletename, setdeletename] = useState();
  const [pageLength, setpageLength] = useState();
  const [status, setstatus] = useState();
  const [enddate, setenddate] = useState();
  const [startdate, setstartdate] = useState();
  useEffect(() => {
    fetchAllArticleFunc();
  }, [pageCount]);

  async function fetchAllArticleFunc(data) {
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
      let res = await fetchAllArticles(temp);
      if (res.data.status) {
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
  async function filterAllArticleFunc(data) {
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
      let res = await fetchAllArticles(temp);
      if (res.data.status) {
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
      let res = await fetchAllArticles(temp);
      if (res.data.status) {
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

  async function deletearticleFunc() {
    setisLoading(true);
    let temp = {
      id: deleteId,
      is_delete: "1",
    };
    try {
      let res = await article_delete_api(temp);
      console.log(res);
      if (res.data.status) {
        setisLoading(false);
        setdeletedialobbox(false);
        fetchAllArticleFunc();
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

  const article_status = async (data, e) => {
    setisLoading(true);
    let temp = {
      id: data.id,
      status: e.target.value,
      user_id:data.user_id
    };
    try {
      let res = await article_status_api(temp);
      if (res.data.status) {
        setisLoading(false);
        fetchAllArticleFunc();
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
        <h3>Country List</h3>
      </div>
      <div className={s["user-list-heading"]}>
        <div className={s["user-list-title"]}>
          <div className="beat_left">
            <div
              className={s["title"]}
              onClick={() =>
                navigate("/add-application", {
                  state: {
                    pagetype: "Add",
                  },
                })
              }
            >
              <IoMdAdd /> Add Application
            </div>
          </div>
        </div>
        <div className={s["user-list-search"]}>
          <div className={s["search-box"]}>
            <span style={{ paddingRight: "0.5rem" }}>
              <BiSearch size={23} />
            </span>
            <input
              type="text"
              spellCheck="false"
              onChange={(e) => fetchAllArticleFunc(e.target.value)}
              placeholder="Search by name..."
            />
          </div>
        </div>
      </div>
      <div className={s["filter-container"]}>
        <div className={s["filter-left"]}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={4}>
              <div className="form-group">
                <label for="exampleInputEmail1">Start Date</label>
                <input
                  type="date"
                  placeholder="Role"
                  className="form-control"
                  value={startdate}
                  onChange={(e) => setstartdate(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="form-group">
                <label for="exampleInputEmail1">End Date</label>
                <input
                  type="date"
                  placeholder="Role"
                  className="form-control"
                  value={enddate}
                  onChange={(e) => setenddate(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="form-group">
                <label for="exampleInputEmail1">Status</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  value={status}
                  onChange={(e) => setstatus(e.target.value)}
                >
                  <option selected value="">
                    Select
                  </option>
                  <option value="Published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="Pending">Pending</option>
                  <option value="Reject">Reject</option>
                </select>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="filter-right">
          <div
            className={s["filter-btn"]}
            onClick={() => filterAllArticleFunc()}
          >
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
      <div className="beat_table">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">User Name</StyledTableCell>
              <StyledTableCell align="center">Category Name</StyledTableCell>
              <StyledTableCell align="center">Article Like</StyledTableCell>
              <StyledTableCell align="center">Article View</StyledTableCell>
              <StyledTableCell align="center">Article Comment</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allArticle.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>
                  {row.image ? (
                    <img
                      style={{ height: "2rem", width: "3rem" }}
                      src={row.image}
                      alt=""
                    />
                  ) : null}
                </StyledTableCell>
                <StyledTableCell>{row.name} </StyledTableCell>
                <StyledTableCell align="center">
                  {row.user_name}{" "}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.category_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.article_like}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.article_view}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.article_comment}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.Created_date}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div className="form-group">
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      style={{
                        color: `${
                          row.status === "Published"
                            ? "green"
                            : row.status === "Pending"
                            ? "black"
                            : row.status === "Reject"
                            ? "red"
                            : "gray"
                        }`,
                      }}
                      value={row.status}
                      onChange={(e) => article_status(row, e)}
                    >
                      <option style={{ color: "black" }} value="Published">
                        Published
                      </option>
                      <option style={{ color: "black" }} value="draft">
                        Draft
                      </option>
                      <option style={{ color: "black" }} value="Pending">
                        Pending
                      </option>
                      <option style={{ color: "black" }} value="Reject">
                        Reject
                      </option>
                    </select>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <CiEdit
                    onClick={() =>
                      navigate("/articleadd", {
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
                      setdeletename(row.user_name);
                      setdeleteId(row.id);
                    }}
                    title="Delete"
                    style={{
                      fontSize: "1rem",
                      color: "var(--clr-primary)",
                      cursor: "pointer",
                    }}
                  />
                  <AiFillEye
                    onClick={() =>
                      navigate("/view-article", {
                        state: {
                          pagetype: "View",
                          data: row,
                        },
                      })
                    }
                    title="View"
                    style={{
                      fontSize: "1rem",
                      color: "var(--clr-primary)",
                      marginRight: "0.5rem",
                      cursor: "pointer",
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {allArticle.length <= 0 && <DataNotFound />}
        {allArticle?.length > 0 && (
          <div className={s["pagination"]}>
            <Pagination
              count={pageLength}
              size="large"
              style={{ color: "#D21903" }}
              onChange={(e, value) => setpageCount(value)}
              page={pageCount}
            />
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
      <FilterPopup open={false} />

      <Loder loading={isLoading} />
    </div>
  );
};

export default SubAdminList;
