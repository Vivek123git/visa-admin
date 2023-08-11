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
import AddEvent from "./components/FormField/FormFieldAdd";
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
import ViewArticle from "./components/Application/ViewArticle";
import ViewEvent from "./components/FormField/ViewEvent";
import Category from "./components/Country/CountryAdd";
import AllCategory from "./components/Country/CountryList";
import Skill from "./components/VisaType/VisaType";
import AllSkill from "./components/VisaType/VisaTypeList";

const routeArray = [
  // { params: undefined, component: <Home1 /> },
  { params: "admin", component: <Admin /> },
  { params: "users", component: <Users /> },
  { params: "application", component: <Articles /> },
  { params: "view-article", component: <ViewArticle /> },
  { params: "dashboard", component: <Dashboard /> },
  { params: "adminadd", component: <Adminadd /> },
  { params: "useradd", component: <UserAdd /> },
  { params: "add-application", component: <ArticleAdd /> },
  { params: "profile", component: <Profile /> },
  { params: "event-list", component: <EventList /> },
  { params: "add-form", component: <AddEvent /> },
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
  { params: "add-country-list", component: <Category /> },
  { params: "country", component: <AllCategory /> },
  { params: "add-visa-type", component: <Skill/> },
  { params: "visa-type-list", component: <AllSkill /> },
];

export default routeArray;
