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
import s from "./internship.module.css";
import { useNavigate } from "react-router-dom";
import { Grid, Pagination } from "@mui/material";
import Select from "react-select";
import { article_delete_api, article_status_api, fetchAllArticles } from "../api/article";
import { notificationHandler } from "../../utils/Notification";
import Loder from "../../Loder/Loder";
import DataNotFound from "../ErrorPage/DataNotFound";
import { BiFilter, BiSearch } from "react-icons/bi";
import DeletePopup from "../Dialogbox/DeletePopup";
import FilterPopup from "../Dialogbox/FilterPopup";
import { internships_list_api, job_title_list_api, location_list_api, skill_list_api, update_internships_api } from "../api/internship.js";

const InternshipList = () => {
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
  const [LocationArry, setLocationArry] = useState([]);
  const [SkillArry, setSkillArry] = useState([]);
  const [job_titleArry, setjob_titleArry] = useState([]);
  const [jobArryId, setjobArryId] = useState(null);
  const [skillArryId, setskillArryId] = useState(null);
  const [locationArryId, setlocationArryId] = useState(null);
  useEffect(() => {
    fetchAllIntrenshipfun();
  }, [pageCount]);

  async function fetchAllIntrenshipfun(data) {
    let skillsString = skillArryId?.map((item) => item?.value)?.toString();
    let locationString = locationArryId?.map((item) => item?.value)?.toString();
    let jobString = jobArryId?.map((item) => item?.value)?.toString();
    setisLoading(true);
    try {
      const temp = {
        search: data ? data.trim() : "",
        id: "",
        page: pageCount,
        limit: 8,
        job_title: jobString,
        skills: skillsString,
        location: locationString,
        duration: "",
        stipend: "",
        sort_by: "",
        status: "",
      };
      let res = await internships_list_api(temp);
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
    setjobArryId(null);
    setlocationArryId(null);
    setskillArryId(null);
    setisLoading(true);
    try {
      const temp = {
        id: "",
        page: "",
        limit: 8,
        job_title: "",
        skills: "",
        location: "",
        duration: "",
        stipend: "",
        sort_by: "",
        status: "",
      };
      let res = await internships_list_api(temp);
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

  async function deletearticleFunc() {
    setisLoading(true);
    let temp = {
      id: deleteId,
      is_delete: "1",
    };
    try {
      let res = await update_internships_api(temp);
      console.log(res);
      if (res.data.status) {
        setisLoading(false);
        setdeletedialobbox(false);
        fetchAllIntrenshipfun();
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

  const intrenship_status = async (data) => {
    setisLoading(true);
    let temp = {
      id: data.id,
      status: data.status == "Active" ? "InActive" : "Active",
    };
    try {
      let res = await update_internships_api(temp);
      console.log(res);

      if (res.data.status) {
        setisLoading(false);
        fetchAllIntrenshipfun();
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

  useEffect(() => {
    getAlllocation();
    getAllSkill();
    getAlljob_title();
  }, []);

  const getAlllocation = async () => {
    try {
      let res = await location_list_api();
      if (res.data.status) {
        let cc = res.data.results.map((item) => {
          return { value: item.id, label: item.name };
        });
        setLocationArry(cc);
      } else {
        notificationHandler({ type: "success", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "danger", msg: error.message });
      console.log(error);
    }
  };
  const getAllSkill = async () => {
    try {
      let res = await skill_list_api();
      if (res.data.status) {
        let cc = res.data.results.map((item) => {
          item = { value: item.id, label: item.name };
          return item;
        });
        setSkillArry(cc);
      } else {
        notificationHandler({ type: "success", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "danger", msg: error.message });
      console.log(error);
    }
  };
  const getAlljob_title = async () => {
    try {
      let res = await job_title_list_api();
      if (res.data.status) {
        let cc = res.data.results.map((item) => {
          item = { value: item.id, label: item.name };
          return item;
        });
        setjob_titleArry(cc);
      } else {
        notificationHandler({ type: "success", msg: res.data.message });
      }
    } catch (error) {
      notificationHandler({ type: "danger", msg: error.message });
      console.log(error);
    }
  };

  const handleChange = (selected) => {
    setjobArryId(selected);
  };
  const handleChange1 = (selected) => {
    setskillArryId(selected);
  };
  const handleChange2 = (selected) => {
    setlocationArryId(selected);
  };
  return (
    <div className="container">
      <div className={s["article-list-title"]}>
        <h3>Internship List</h3>
      </div>
      <div className={s["user-list-heading"]}>
        <div className={s["user-list-title"]}>
          <div className="beat_left">
            <div
              className={s["title"]}
              onClick={() =>
                navigate("/intrenship-add", {
                  state: {
                    pagetype: "Add",
                  },
                })
              }
            >
              <IoMdAdd /> Internship
            </div>
          </div>
        </div>
        <div className={s["user-list-search"]}>
          <div className={s["search-box"]}>
            <span style={{ paddingRight: "0.5rem" }}>
              <BiSearch size={23} />
            </span>
            <input type="text" spellCheck="false" onChange={(e) => fetchAllIntrenshipfun(e.target.value)} placeholder="Search by name..." />
          </div>
        </div>
      </div>
      <div className={s["filter-container"]}>
        <div className={s["filter-left"]}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={4}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Job</label>
                <Select isMulti options={job_titleArry} onChange={handleChange} value={jobArryId} />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Skill</label>
                <Select isMulti options={SkillArry} onChange={handleChange1} value={skillArryId} />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Location</label>
                <Select isMulti options={LocationArry} onChange={handleChange2} value={locationArryId} />
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="filter-right">
          <div className={s["filter-btn"]} onClick={() => fetchAllIntrenshipfun()}>
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
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Company</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Apply Count</StyledTableCell>
              <StyledTableCell align="center">Bookmark</StyledTableCell>
              <StyledTableCell align="center">Mode</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
              <StyledTableCell align="center">Add</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allArticle.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.name} </StyledTableCell>
                <StyledTableCell align="center">{row.about_company} </StyledTableCell>
                <StyledTableCell align="center">{row.type}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.internships_apply_count}
                  {row.internships_apply_count > 0 ? (
                    <span
                      className={s["more-option"]}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("/intrenship-apply-list", {
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
                  {row.internships_fav_count}
                  {row.internships_fav_count > 0 ? (
                    <span
                      className={s["more-option"]}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("/intrenship-bookmark-list", {
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
                <StyledTableCell align="center">{row.type_2}</StyledTableCell>
                <StyledTableCell align="center">{row.Created_date}</StyledTableCell>
                <StyledTableCell align="center">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => intrenship_status(row)}
                    className={`${row.status === "Active" ? s.active_admin : s.inactive_admin}`}
                  >
                    {row.status}
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <CiEdit
                    onClick={() =>
                      navigate("/intrenship-add", {
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
                      setdeletename(row.name);
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
                      navigate("/intrenship-question-list", {
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
        {allArticle.length <= 0 && <DataNotFound />}
        {allArticle?.length > 0 && (
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
      <FilterPopup open={false} />

      <Loder loading={isLoading} />
    </div>
  );
};

export default InternshipList;
