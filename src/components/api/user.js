import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";

const user_delete = getBaseUrl() + "admin_api/user_edit";
const user_status = getBaseUrl() + "admin_api/user_edit";
const user_update = getBaseUrl() + "admin_api/user_edit";
const users_list = getBaseUrl() + "admin_api/users_list";
const edit_education = getBaseUrl() + "admin_api/edit_education";
const add_education = getBaseUrl() + "admin_api/add_education";
const add_experience = getBaseUrl() + "admin_api/add_UserExperience";
const delete_experiece = getBaseUrl() + "admin_api/edit_experience";
const edit_experience = getBaseUrl() + "admin_api/edit_experience";

export const edit_experience_api = async (data) => {
  let config = {
    method: "post",
    url: edit_experience,
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
export const delete_experiece_api = async (data) => {
  let config = {
    method: "post",
    url: delete_experiece,
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
export const add_experience_api = async (data) => {
  let config = {
    method: "post",
    url: add_experience,
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
export const delete_education_api = async (data) => {
  let config = {
    method: "post",
    url: edit_education,
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
export const add_education_api = async (data) => {
  let config = {
    method: "post",
    url: add_education,
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
export const edit_education_api = async (data) => {
  let config = {
    method: "post",
    url: edit_education,
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
export const getuserby_id_api = async (data) => {
  let config = {
    method: "post",
    url: users_list,
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
export const user_update_api = async (data) => {
  let config = {
    method: "put",
    url: user_update,
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
export const user_status_api = async (data) => {
  let config = {
    method: "put",
    url: user_status,
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
export const user_delete_api = async (data) => {
  let config = {
    method: "put",
    url: user_delete,
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

export const fetchAllUsers = async (data) => {
  let config = {
    method: "post",
    url: users_list,
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
