import axios from "./index";

export default class ParserApi {
  static ProcessNews = (data) => {
    return axios.post(`${base}/process-news`, data);
  };
}

let base = "http://127.0.0.1:5008";
