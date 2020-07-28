import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#3f51b5",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
      dark: {
        primary: "#e91e63",
        secondary: "#ff5722",
        accent: "#8bc34a",
        error: "#ff9800",
        warning: "#00bcd4",
        info: "#03a9f4",
        success: "#4caf50",
      },
    },
  },
});
