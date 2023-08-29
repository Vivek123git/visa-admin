import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";


export const application_add_api = async (data) => {
  let config = {
    method: "post",
    url: getBaseUrl() + "application_forms",
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
export const application_update_api = async (data) => {
  let config = {
    method: "patch",
    url: getBaseUrl() + "application_forms",
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
export const application_delete_api = async (data) => {
  let config = {
    method: "delete",
    url: getBaseUrl() +`application_forms/${data}`,
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

export const fetchAllApplication = async (data) => {
  let config = {
    method: "get",
    url: getBaseUrl() + `application_forms?limit=${data.limit}&page=${data.page}`,
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
