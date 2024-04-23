import axios from "axios";
import { goToLogin } from "../router";
const service = axios.create({
  baseURL: "http://localhost:5173",
  timeout: 20000,
});

service.interceptors.response.use(async (res) => {
  let data = res.data;
  if (data.code == 401) {
    goToLogin();
  }
  return res;
});
export default service;
