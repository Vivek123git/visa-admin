import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import s from "./sidebar.module.css";
import { FiUsers } from "react-icons/fi";
import { MdOutlineArticle, MdEvent } from "react-icons/md";
import { RiCommunityLine } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { SiOpenbadges } from "react-icons/si";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import logo from "../../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ open }) => {
  console.log("open", open);
  const navigate = useNavigate();
  const [menuItems, setmenuItems] = useState([
    {
      title: " Dashboard",
      icons: <RxDashboard size={20} />,
      navigate: "dashboard",
      show: false,
      subItems: [],
    },
    {
      title: "Admin",
      icons: <MdOutlineAdminPanelSettings size={20} />,
      navigate: "admin",
      show: false,
      subItems: [],
    },
    {
      title: " Users",
      icons: <FiUsers size={20} />,
      navigate: "users",
      show: false,
      subItems: [],
    },
    {
      title: " Articles",
      icons: <MdOutlineArticle size={20} />,
      navigate: "article",
      show: false,
      subItems: [],
    },
    {
      title: "Events",
      icons: <MdEvent size={20} />,
      navigate: "event-list",
      show: false,
      subItems: [],
    },
    {
      title: "Event Registrations",
      icons: <MdEvent size={20} />,
      navigate: "booking-event",
      show: false,
      subItems: [],
    },

    {
      title: "Internships",
      icons: <AiOutlineUsergroupAdd size={20} />,
      navigate: "internship",
      show: false,
      subItems: [],
    },
    {
      title: "Community",
      icons: <RiCommunityLine size={20} />,
      navigate: "community-list",
      show: false,
      subItems: [],
    },
    {
      title: "Category",
      icons: <RxDashboard size={20} />,
      navigate: "category-list",
      show: false,
      subItems: [],
    },
    {
      title: "Skills",
      icons: <SiOpenbadges size={20} />,
      navigate: "skill-list",
      show: false,
      subItems: [],
    },
  ]);
  return (
    <>
      <section className={s["sidebar"]}>
        <div className={`${s["collapsed-logo"]} ${open ? `${s["logo-section"]}` : `${s["logo-section-hide"]}`}`}>
          <img src={logo} alt="logo" draggable="false" />
        </div>
        {menuItems.map((data, i) => (
          <div className={s["sidebar-content"]}>
            <div className={s["sidebar-item"]} onClick={() => navigate(`/${data?.navigate}`)}>
              <div className="sidebaricons">{data.icons}</div>
              <div className={open ? `${s["sidebar-title"]}` : `${s["sidebar-title-hide"]}`}>{data.title}</div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Sidebar;
