<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <TeamLine></TeamLine>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Draft Buddy</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col lg="10" class="mx-auto">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import TeamLine from "./components/TeamLine";

export default {
  components: {
    TeamLine,
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>

<style>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
