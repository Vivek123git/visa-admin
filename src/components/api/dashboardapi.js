import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";

const home_data = getBaseUrl() + "admin_api/home_data";

export const fetchAllhome_data = async (data) => {
  let config = {
    method: "post",
    url: home_data,
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
