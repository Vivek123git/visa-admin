import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";

const internships_list = getBaseUrl() + "admin_api/internships_list";
const add_internships = getBaseUrl() + "admin_api/add_internships";
const update_internships = getBaseUrl() + "admin_api/update_internships";
const location_list = getBaseUrl() + "admin_api/location_list";
const skill_list = getBaseUrl() + "admin_api/skill_list";
const job_title_list = getBaseUrl() + "admin_api/job_title_list";
const internships_apply_list = getBaseUrl() + "admin_api/internships_apply_list";
const internships_fav_list = getBaseUrl() + "admin_api/internships_fav_list";
const update_internships_apply = getBaseUrl() + "admin_api/update_internships_apply";
const internships_question = getBaseUrl() + "admin_api/internships_question";
const create_internships_question = getBaseUrl() + "admin_api/create_internships_question";
const edit_internships_question = getBaseUrl() + "admin_api/edit_internships_question";

export const edit_internships_question_api = async (data) => {
  let config = {
    method: "post",
    url: edit_internships_question,
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
export const create_internships_question_api = async (data) => {
  let config = {
    method: "post",
    url: create_internships_question,
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
export const internships_question_api = async (data) => {
  let config = {
    method: "post",
    url: internships_question,
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

export const update_internships_apply_api = async (data) => {
  let config = {
    method: "post",
    url: update_internships_apply,
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
export const internships_fav_list_api = async (data) => {
  let config = {
    method: "post",
    url: internships_fav_list,
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

export const internships_apply_list_api = async (data) => {
  let config = {
    method: "post",
    url: internships_apply_list,
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

export const job_title_list_api = async () => {
  let config = {
    method: "post",
    url: job_title_list,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    data: "",
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const skill_list_api = async () => {
  let config = {
    method: "post",
    url: skill_list,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    data: "",
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const location_list_api = async () => {
  let config = {
    method: "post",
    url: location_list,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    data: "",
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const update_internships_api = async (data) => {
  let config = {
    method: "post",
    url: update_internships,
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

export const add_internships_api = async (data) => {
  let config = {
    method: "post",
    url: add_internships,
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

export const internships_list_api = async (data) => {
  let config = {
    method: "post",
    url: internships_list,
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
