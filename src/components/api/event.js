import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";

const event_list = getBaseUrl() + "admin_api/event_list";
const add_event = getBaseUrl() + "admin_api/add_event";
const edit_event = getBaseUrl() + "admin_api/edit_event";

export const update_event_api = async (data) => {
  let config = {
    method: "post",
    url: edit_event,
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
export const add_event_api = async (data) => {
  let config = {
    method: "post",
    url: add_event,
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

export const fetchAllEvents = async (data) => {
  let config = {
    method: "post",
    url: event_list,
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
