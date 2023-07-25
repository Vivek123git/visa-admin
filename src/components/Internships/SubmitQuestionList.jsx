import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import s from "./internship.module.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
const SubmitQuestionList = () => {
  const location = useLocation();
  const [arrayquestion, setarrayquestion] = useState(JSON.parse(location.state.qus_ans));
  const navigate = useNavigate();
  return (
    <>
      <div className="submit-question">
        <div className={s["user-list-heading"]}>
          <div className={s["user-list-title"]}>
            <div className="beat_left">
              <div className={s["title"]} onClick={() => navigate(-1)}>
                <AiOutlineArrowLeft /> Back
              </div>
            </div>
          </div>
        </div>
        <div className="sumbit-question-container">
          <div className="question-title"></div>
          {arrayquestion.map((data, i) => (
            <div className={s["question-body"]}>
              <h5>
                Q.{i + 1} {data?.ques}{" "}
              </h5>
              <p>Ans- {data?.ans}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubmitQuestionList;
