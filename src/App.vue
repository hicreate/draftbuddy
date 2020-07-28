<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <TeamLine></TeamLine>
    </v-navigation-drawer>

    <v-app-bar app clipped-left hide-on-scroll="true">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        >Draft<span class="font-weight-bold">Buddy</span
        ><v-icon>mdi-football</v-icon></v-toolbar-title
      >
    </v-app-bar>

    <v-main>
      <v-container
        style="background-color: rgba(0, 0, 0, 0.85);"
        class="fill-height"
        fluid
      >
        <v-row align="center" justify="center">
          <v-col lg="10" class="mx-auto">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app>
      <span
        ><a
          class="white--text text-decoration-none"
          href="https://hicreate.co.uk"
          target="_blank"
          >hicreate</a
        >
        &copy; {{ new Date().getFullYear() }}</span
      >
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

#inspire {
  background-image: url("../public/23631.jpg");
  background-size: cover;
}
</style>
