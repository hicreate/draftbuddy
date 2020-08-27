import axios from "axios";
const key = "MW2mJnL2eRaWnZ84Gfvg89vjErgFL11h1aDU2AYE";

const apiClient = axios.create({
  baseURL: `https://api.fantasypros.com/public/v2/json/nfl/`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getPlayers() {
    return apiClient.get("players", {
      headers: {
        "x-api-key": key,
      },
    });
  },
  getNews() {
    return apiClient.get("news", {
      headers: {
        "x-api-key": key,
      },
    });
  },
};
