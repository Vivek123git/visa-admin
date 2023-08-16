import React from "react";
import Admin from "./pages/Admin";
import Adminadd from "./pages/Adminadd";
import ApplicationAddPage from "./pages/ApplicationAddPage";
import ApplicationListPage from "./pages/ApplicationListPage";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/LoginPage";
import Home1 from "./pages/Home1";
import Profile from "./pages/profile";
import UserAdd from "./pages/UserAdd";
import Users from "./pages/Users";
import { FormFieldListPage } from "./pages/FormFieldList";
import AddForm from "./components/FormField/FormFieldAdd";
// import BookingEvent from "./pages/BookingEvent";
// import Internships from "./pages/Internships";
// import IntrenshipAdd from "./pages/IntrenshipAdd";
// import IntrenApplyList from "./pages/IntrenApplyList";
// import IntrenBookmarkList from "./pages/IntrenBookmarkList";
// import CommunityList from "./pages/CommunityList";
// import AddCommunity from "./pages/AddCommunity";
// import CommunityMemberList from "./components/Community/CommunityMemberList";
// import CommunityPostList from "./components/Community/CommunityPostList";
// import AddQuestionList from "./components/Community/AddQuestionList";
// import IntrenQuestionList from "./components/Internships/IntrenQuestionList";
// import SubmitQuestionList from "./components/Internships/SubmitQuestionList";
import ViewApplication from "./components/Application/ViewApplication";
import ViewFormField from "./components/FormField/ViewFormField";
import CountryAdd from "./components/Country/CountryAdd";
import CountryList from "./components/Country/CountryList";
import VisaType from "./components/VisaType/VisaType";
import VisaTypeList from "./components/VisaType/VisaTypeList";

const routeArray = [
  // { params: undefined, component: <Home1 /> },
  { params: "admin", component: <Admin /> },
  { params: "users", component: <Users /> },
  { params: "application", component: <ApplicationListPage /> },
  { params: "view-article", component: <ViewApplication /> },
  { params: "dashboard", component: <Dashboard /> },
  { params: "adminadd", component: <Adminadd /> },
  { params: "useradd", component: <UserAdd /> },
  { params: "add-application", component: <ApplicationAddPage /> },
  { params: "profile", component: <Profile /> },
  { params: "form-list", component: <FormFieldListPage /> },
  { params: "add-form", component: <AddForm /> },
  { params: "view-form", component: <ViewFormField /> },
  // { params: "booking-event", component: <BookingEvent /> },
  // { params: "internship", component: <Internships /> },
  // { params: "intrenship-add", component: <IntrenshipAdd /> },
  // { params: "intrenship-apply-list", component: <IntrenApplyList /> },
  // { params: "intrenship-bookmark-list", component: <IntrenBookmarkList /> },
  // { params: "community-list", component: <CommunityList /> },
  // { params: "community-add", component: <AddCommunity /> },
  // { params: "community-member-list", component: <CommunityMemberList /> },
  // { params: "community-post-list", component: <CommunityPostList /> },
  // { params: "question-list", component: <AddQuestionList /> },
  // { params: "intrenship-question-list", component: <IntrenQuestionList /> },
  // { params: "submit-question-list", component: <SubmitQuestionList /> },
  { params: "add-country", component: <CountryAdd /> },
  { params: "add-country-list", component: <CountryList /> },
  { params: "add-visa-type", component: <VisaType/> },
  { params: "visa-type-list", component: <VisaTypeList /> },
];

export default routeArray;
