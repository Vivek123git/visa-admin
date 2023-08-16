import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";


export const update_visaType_api = async (data) => {
  let config = {
    method: "patch",
    url: getBaseUrl() + "visa",
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


export const add_visaType_api = async (data) => {
  let config = {
    method: "post",
    url: getBaseUrl() + "visa",
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

export const fetchAllVisa = async (data) => {
  let config = {
    method: "get",
    url: getBaseUrl() + "visa",
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

export const delete_visaType_api = async (data) => {
  let config = {
    method: "delete",
    url: getBaseUrl() + `visa/${data}`,
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
