import axios from "axios";
import * as Config from "../constants/Config";

export default function callApi(endpoint, method = "GET", body, cancelToken = null) {
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: body,
    cancelToken: cancelToken
  }).catch((err) => {
    console.log(err.response.status)
  });
}