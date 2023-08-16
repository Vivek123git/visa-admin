import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";



export const formField_update_api = async (data) => {
  let config = {
    method: "patch",
    url:  getBaseUrl() + "form_fields",
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
export const formField_add_api = async (data) => {
  let config = {
    method: "post",
    url: getBaseUrl() + "form_fields",
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

export const fetchAllFormField = async (data) => {
  let config = {
    method: "get",
    url: getBaseUrl() + "form_fields",
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

export const formField_delete_api = async (data) => {
  let config = {
    method: "delete",
    url: getBaseUrl()+`form_fields/${data}`,
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
