import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";

const get_admin_profile = getBaseUrl() + "admin_api/get_admin_profile";
const profile_update_admin = getBaseUrl() + "admin_api/profile_update_admin";

export const profile_update_admin_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    return await axios.put(profile_update_admin, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
const get_admin_profile_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };

    return await axios.get(get_admin_profile, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default get_admin_profile_api;
