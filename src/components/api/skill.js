import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";

const skill_list = getBaseUrl() + "admin_api/allskills";
const skill = getBaseUrl() + "admin_api/add_skill";
const edit_skill = getBaseUrl() + "admin_api/edit_skill";
const delete_skill = getBaseUrl() + "admin_api/delete_skill";

export const update_skill_api = async (data) => {
  let config = {
    method: "post",
    url: edit_skill,
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


export const add_skill_api = async (data) => {
  let config = {
    method: "post",
    url: skill,
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

export const fetchAllSkill = async (data) => {
  let config = {
    method: "post",
    url: skill_list,
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

export const delete_skill_api = async (data) => {
  let config = {
    method: "post",
    url: delete_skill,
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
