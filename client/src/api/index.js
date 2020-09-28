import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const paperNameSearch = (payload) => api.post("/paper", payload);

const apis = {
  paperNameSearch,
};

export default apis;
