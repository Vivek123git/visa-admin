import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";

const edit_article = getBaseUrl() + "admin_api/edit_article";
const add_article = getBaseUrl() + "admin_api/add_article";
const category_list = getBaseUrl() + "admin_api/category_list";

export const category_list_api = async () => {
  let config = {
    method: "post",
    url: category_list,
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
export const article_add_api = async (data) => {
  let config = {
    method: "post",
    url: add_article,
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
export const article_update_api = async (data) => {
  let config = {
    method: "post",
    url: edit_article,
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
export const article_delete_api = async (data) => {
  let config = {
    method: "post",
    url: edit_article,
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
export const article_status_api = async (data) => {
  let config = {
    method: "post",
    url: edit_article,
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

export const fetchAllArticles = async (data) => {
  let config = {
    method: "post",
    url: getBaseUrl() + "admin_api/article_list",
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
