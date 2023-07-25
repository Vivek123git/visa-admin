import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";
import s from "./community.module.css";
import { useNavigate } from "react-router-dom";
import Loder from "../../Loder/Loder";
import DataNotFound from "../ErrorPage/DataNotFound";
import { BiSearch } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { community_question_api, create_community_questionn_api } from "../api/Community";
import { IoMdAdd } from "react-icons/io";
import { Card, Grid, Menu, MenuItem } from "@mui/material";
import Expand from "react-expand-animated";
const AddQuestionList = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [allmember, setallmember] = useState([]);
  const [questionexpandbox, setquestionexpandbox] = useState(false);
  const [question, setquestion] = useState("");
  const location = useLocation();

  useEffect(() => {
    fetchAllmemberlist();
  }, []);

  async function fetchAllmemberlist(data) {
    setisLoading(true);
    try {
      const temp = {
        search: data ? data : "",
        community_id: location?.state?.data?.id,
      };
      let res = await community_question_api(temp);
      if (res.data.status) {
        setallmember(res.data.results);
        setisLoading(false);
      } else {
        setisLoading(false);
        console.log("status false!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const create_community_questionn_func = async () => {
    setisLoading(true);
    try {
      const temp = {
        community_id: location?.state?.data?.id,
        question: question,
      };

      let res = await create_community_questionn_api(temp);
      if (res.data.status) {
        console.log(res);
        fetchAllmemberlist();
        setquestion("");
        setquestionexpandbox(false);
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
        <h3>Question List</h3>
      </div>
      <div className={s["user-list-heading"]}>
        <div className={s["user-list-title"]}>
          <div className="beat_left">
            <div className={s["title"]} onClick={() => setquestionexpandbox(!questionexpandbox)}>
              <IoMdAdd /> Add
            </div>
          </div>
        </div>
        <div className={s["user-list-search"]}>
          <div className={s["search-box"]}>
            <span style={{ paddingRight: "0.5rem" }}>
              <BiSearch size={23} />
            </span>
            <input type="text" spellCheck="false" onChange={(e) => fetchAllmemberlist(e.target.value)} placeholder="Search by name..." />
          </div>
        </div>
      </div>

      <Expand open={questionexpandbox}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <div className="form-group">
              <label for="exampleInputEmail1" className="my-1">
                Add Question*
              </label>
              <textarea
                type="text"
                rows="3"
                className="form-control"
                spellCheck={false}
                value={question}
                onChange={(e) => setquestion(e.target.value)}
                placeholder="Add Question"
              />
            </div>
            <div
              className={s["title"]}
              style={{ textAlign: "center", margin: "auto", marginBlock: "1rem" }}
              onClick={() => {
                create_community_questionn_func();
              }}
            >
              Submit
            </div>
          </Grid>
        </Grid>
      </Expand>
      <div className="beat_table">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S.no</StyledTableCell>
              <StyledTableCell>Question</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allmember.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{row.question}</StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  <div
                    style={{ cursor: "pointer" }}
                    // onClick={() => community_status_update(row)}
                    className={`${row.status === "Active" ? s.active_admin : s.inactive_admin}`}
                  >
                    {row.status}
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">{row.Created_date}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {allmember.length <= 0 && <DataNotFound />}
      </div>

      <Loder loading={isLoading} />
    </div>
  );
};

export default AddQuestionList;
