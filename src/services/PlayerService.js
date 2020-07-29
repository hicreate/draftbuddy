import axios from "axios";

const apiClient = axios.create({
  baseURL: ``,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getPlayers() {
    return apiClient.get("./adp.json");
  },
};
