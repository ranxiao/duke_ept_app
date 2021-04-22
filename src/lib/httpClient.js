import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const httpClient = (baseURL = BASE_URL) => {
  const token = localStorage.getItem("accessToken");
  const instance = axios.create({
    baseURL,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      Authorization: `Bearer ${token}`,
    },
  });
  return instance;
};

export default httpClient;
