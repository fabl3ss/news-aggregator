import axios from "axios";

export default class AuthApi {
  static Login = (data) => {
    return axios.post(`${base}/sign-in`, data);
  };

  static Register = (data) => {
    return axios.post(`${base}/sign-up`, data);
  };

  static Logout = (data) => {
    return axios.post(`${base}/logout`, data, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
  };
}

let base = "http://localhost:5002/auth";
