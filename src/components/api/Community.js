import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";

const community_all_list = getBaseUrl() + "admin_api/community_all_list";
const create_community = getBaseUrl() + "admin_api/create_community";
const postcategory_list = getBaseUrl() + "admin_api/postcategory_list";
const update_community = getBaseUrl() + "admin_api/update_community";
const status_community = getBaseUrl() + "admin_api/update_community";
const member_list = getBaseUrl() + "admin_api/member_list";
const post_list = getBaseUrl() + "admin_api/post_list";
const community_question = getBaseUrl() + "admin_api/community_question";
const create_community_questionn = getBaseUrl() + "admin_api/create_community_question";

export const create_community_questionn_api = async (data) => {
  let config = {
    method: "post",
    url: create_community_questionn,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    data: data,
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const community_question_api = async (data) => {
  let config = {
    method: "post",
    url: community_question,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    data: data,
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const post_list_api = async (data) => {
  let config = {
    method: "post",
    url: post_list,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    data: data,
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const member_list_api = async (data) => {
  let config = {
    method: "post",
    url: member_list,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    data: data,
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const delete_community_api = async (data) => {
  let config = {
    method: "post",
    url: status_community,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    data: data,
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const update_community_api = async (data) => {
  let config = {
    method: "post",
    url: update_community,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    data: data,
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const postcategory_list_api = async () => {
  let config = {
    method: "post",
    url: postcategory_list,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const create_community_api = async (data) => {
  let config = {
    method: "post",
    url: create_community,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    data: data,
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const community_all_list_api = async (data) => {
  let config = {
    method: "post",
    url: community_all_list,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    data: data,
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
