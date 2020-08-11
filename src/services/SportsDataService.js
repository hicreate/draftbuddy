import axios from "axios";
const key = "47ca7c861f4143e48a344c15ff0fd9e6";

const apiClient = axios.create({
  baseURL: `https://api.sportsdata.io/v3/nfl/`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getSchedule() {
    return apiClient.get("scores/json/Schedules/2020", {
      headers: {
        "Ocp-Apim-Subscription-Key": key,
      },
    });
  },
  getHeadshots() {
    return apiClient.get("headshots/json/Headshots", {
      headers: {
        "Ocp-Apim-Subscription-Key": key,
      },
    });
  },
  getPlayer(playerID) {
    return apiClient.get("scores/json/Player/" + playerID, {
      headers: {
        "Ocp-Apim-Subscription-Key": key,
      },
    });
  },
  getPlayerNews(playerID) {
    return apiClient.get("scores/json/NewsByPlayerID/" + playerID, {
      headers: {
        "Ocp-Apim-Subscription-Key": key,
      },
    });
  },
};
