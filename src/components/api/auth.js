import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";

const admin_login = getBaseUrl() + "admin_api/admin_login";

const authapi = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };

    return await axios.post(admin_login, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default authapi;
