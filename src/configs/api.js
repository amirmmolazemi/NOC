import axios from "axios";

const api = axios.create({
  baseURL: "http://172.30.200.219:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
