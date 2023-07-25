import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";

const booking_event = getBaseUrl() + "admin_api/booking_event";
const statusupdate_event = getBaseUrl() + "admin_api/update_event_registration";

export const statusupdate_event_api = async (data) => {
  let config = {
    method: "post",
    url: statusupdate_event,
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
export const booking_event_api = async (data) => {
  let config = {
    method: "post",
    url: booking_event,
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
