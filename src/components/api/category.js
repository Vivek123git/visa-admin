import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";

const category_list = getBaseUrl() + "admin_api/allcategories";
const category = getBaseUrl() + "admin_api/add_category";
const edit_category = getBaseUrl() + "admin_api/edit_category";
const delete_category = getBaseUrl() + "admin_api/delete_category";

export const update_category_api = async (data) => {
  let config = {
    method: "post",
    url: edit_category,
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

export const delete_category_api = async (data) => {
    let config = {
      method: "post",
      url: delete_category,
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
  

export const add_category_api = async (data) => {
  let config = {
    method: "post",
    url: category,
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

export const fetchAllCategory = async (data) => {
  let config = {
    method: "post",
    url: category_list,
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
