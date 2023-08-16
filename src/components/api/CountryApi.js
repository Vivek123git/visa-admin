import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";


export const update_country_api = async (data) => {
  let config = {
    method: "patch",
    url: getBaseUrl() + "countries",
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

export const delete_country_api = async (data) => {
    let config = {
      method: "delete",
      url: getBaseUrl() + `countries/${data}`,
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
  

export const add_country_api = async (data) => {
  let config = {
    method: "post",
    url: getBaseUrl() + "countries",
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

export const fetchAllCountry = async () => {
  let config = {
    method: "get",
    url: getBaseUrl() + "countries",
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
