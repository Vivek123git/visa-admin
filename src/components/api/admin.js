import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";

const add_admin = getBaseUrl() + "admin_api/add_admin";
const admins_list = getBaseUrl() + "admin_api/admins_list";
const edit_admins = getBaseUrl() + "admin_api/edit_admins";

export const update_admin_api = async (data) => {
  let config = {
    method: "post",
    url: edit_admins,
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
export const status_admin_api = async (data) => {
  let config = {
    method: "post",
    url: edit_admins,
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
export const delete_admin_api = async (data) => {
  let config = {
    method: "post",
    url: edit_admins,
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
export const create_admin_api = async (data) => {
  let config = {
    method: "post",
    url: add_admin,
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

export const fetchAllAdmin = async (data) => {
  let config = {
    method: "post",
    url: admins_list,
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

const admins_list_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };

    return await axios.post(admins_list, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default admins_list_api;
