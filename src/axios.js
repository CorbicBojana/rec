import axios from "axios";
import config from "./config";

const { API_URL } = config;

const instance = axios.create({
  baseURL: API_URL
});

export default instance;
