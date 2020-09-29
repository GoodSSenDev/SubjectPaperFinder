import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

export const getPapers = async (name) => {
  window.alert("index.js");
  await api.get("/" + name);
};
const apis = {
  getPapers,
};

export default apis;
