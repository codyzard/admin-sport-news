import axios from "axios";
import * as Config from "../constants/Config";

export default function callApi(endpoint, method = "GET", body, headers = null) {
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: body,
    headers: headers
  }).catch((err) => {
    console.log(err)
  });
}