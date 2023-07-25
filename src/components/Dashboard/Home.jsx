import React, { useState, useEffect } from "react";
import { FiUsers } from "react-icons/fi";
import { RiArticleLine } from "react-icons/ri";
import s from "./dashboard.module.css";
import Graph from "./Graph";
import Graph1 from "./Graph1";
import { fetchAllhome_data } from "../api/dashboardapi";
const Home = () => {
  const [isLoading, setisLoading] = useState(false);
  const [homedata, sethomedata] = useState();
  useEffect(() => {
    fetchAllhomeFunc();
  }, []);

  async function fetchAllhomeFunc(data) {
    setisLoading(true);
    try {
      let res = await fetchAllhome_data();
      if (res.data.status) {
        console.log(res);

        sethomedata([
          {
            title: "Total Users",
            icon: <FiUsers />,
            count: res.data.total_user,
          },
          {
            title: "Total Booking Event",
            count: res.data.total_booking_event,
            icon: <FiUsers />,
          },
          {
            title: "Total Internships",
            count: res.data.total_Internships,
            icon: <FiUsers />,
          },
          {
            title: "Total Internships Apply",
            count: res.data.total_Internships_apply,
            icon: <FiUsers />,
          },
          {
            title: "Total Article",
            count: res.data.total_Article,
            icon: <RiArticleLine />,
          },
          {
            title: "Total Event",
            count: res.data.total_Event,
            icon: <FiUsers />,
          },
        ]);
        setisLoading(false);
      } else {
        setisLoading(false);
        console.log("status false!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <div className="dashboard-section">
          <div className={s["dashboard-header-container"]}>
            {homedata?.map((data) => (
              <div className={s["dashbord-content"]}>
                <div className={s["dashboard-main-card"]}>
                  <div className="dashboard-icons">
                    <FiUsers size={30} />
                  </div>
                  <div className="dashboard-card-content">
                    <div className={s["card-title"]}>
                      <h4>{data.title}</h4>
                      <h4>{data.count}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={s["graph-container"]}>
          <div className={s["graph-content"]}>
            <div className="graph-left" style={{ width: "70%" }}>
              <Graph1 />
            </div>
            <div className="graph-right" style={{ width: "30%" }}>
              <Graph />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
