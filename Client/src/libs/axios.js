import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000/api/v1",
  baseURL: "https://chatvibe-9w5q.onrender.com/api/v1",
  withCredentials: true,
});
