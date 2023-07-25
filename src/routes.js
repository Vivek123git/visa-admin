import React from "react";
import Admin from "./pages/Admin";
import Adminadd from "./pages/Adminadd";
import ArticleAdd from "./pages/ArticleAdd";
import Articles from "./pages/Articles";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/LoginPage";
import Home1 from "./pages/Home1";
import Profile from "./pages/profile";
import UserAdd from "./pages/UserAdd";
import Users from "./pages/Users";
import { EventList } from "./pages/EventList";
import AddEvent from "./components/Events/AddEvent";
import BookingEvent from "./pages/BookingEvent";
import Internships from "./pages/Internships";
import IntrenshipAdd from "./pages/IntrenshipAdd";
import IntrenApplyList from "./pages/IntrenApplyList";
import IntrenBookmarkList from "./pages/IntrenBookmarkList";
import CommunityList from "./pages/CommunityList";
import AddCommunity from "./pages/AddCommunity";
import CommunityMemberList from "./components/Community/CommunityMemberList";
import CommunityPostList from "./components/Community/CommunityPostList";
import AddQuestionList from "./components/Community/AddQuestionList";
import IntrenQuestionList from "./components/Internships/IntrenQuestionList";
import SubmitQuestionList from "./components/Internships/SubmitQuestionList";
import ViewArticle from "./components/Articles/ViewArticle";
import ViewEvent from "./components/Events/ViewEvent";
import Category from "./components/Category/Category";
import AllCategory from "./components/Category/AllCategory";
import Skill from "./components/Skill/Skill";
import AllSkill from "./components/Skill/AllSkill";

const routeArray = [
  // { params: undefined, component: <Home1 /> },
  { params: "admin", component: <Admin /> },
  { params: "users", component: <Users /> },
  { params: "article", component: <Articles /> },
  { params: "view-article", component: <ViewArticle /> },
  { params: "dashboard", component: <Dashboard /> },
  { params: "adminadd", component: <Adminadd /> },
  { params: "useradd", component: <UserAdd /> },
  { params: "articleadd", component: <ArticleAdd /> },
  { params: "profile", component: <Profile /> },
  { params: "event-list", component: <EventList /> },
  { params: "add-event", component: <AddEvent /> },
  { params: "view-event", component: <ViewEvent /> },
  { params: "booking-event", component: <BookingEvent /> },
  { params: "internship", component: <Internships /> },
  { params: "intrenship-add", component: <IntrenshipAdd /> },
  { params: "intrenship-apply-list", component: <IntrenApplyList /> },
  { params: "intrenship-bookmark-list", component: <IntrenBookmarkList /> },
  { params: "community-list", component: <CommunityList /> },
  { params: "community-add", component: <AddCommunity /> },
  { params: "community-member-list", component: <CommunityMemberList /> },
  { params: "community-post-list", component: <CommunityPostList /> },
  { params: "question-list", component: <AddQuestionList /> },
  { params: "intrenship-question-list", component: <IntrenQuestionList /> },
  { params: "submit-question-list", component: <SubmitQuestionList /> },
  { params: "add-category", component: <Category /> },
  { params: "category-list", component: <AllCategory /> },
  { params: "add-skill", component: <Skill/> },
  { params: "skill-list", component: <AllSkill /> },
];

export default routeArray;
