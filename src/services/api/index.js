import axios from "axios";
import { config } from "../../config/index";
import storage from "../storage";
import { get } from "lodash";

const token = "d228f88a47e0bb9db1d171e8ffe7de9b53a2a476";
const request = axios.create({
  baseURL: config.API_URL,
  params: {},
  headers: {
    common: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Token ${token}`,
    },
  },
});
request.interceptors.request.use(
  (config) => {
    const token = get(
      JSON.parse(storage.get("settings")),
      "state.token",
      "e072afc35374e8eba592a1cb1a435ca8a47d458b",
    );

    if (token) {
      config.headers["token"] = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { request };
