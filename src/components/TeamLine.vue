<template>
  <v-list dense>
    <v-scroll-x-transition :group="true">
      <v-list-item v-for="player in yourTeam" :key="player.PlayerID" link>
        <v-list-item-icon class="mr-1 text-center">
          <h1 class="text-center">{{ player.draftPick }}</h1>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ player.Name }}</v-list-item-title>
          <v-list-item-subtitle>
            <span class="pr-1"
              ><span class="success--text">ADP:</span>
              {{ player.AverageDraftPosition }}
            </span>
            <span>
              <span class="error--text"> PICK:</span>
              {{ player.draftPick }}
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar>
          <v-btn color="black">
            {{ player.Position }}
          </v-btn>
        </v-list-item-avatar>
      </v-list-item>
    </v-scroll-x-transition>
  </v-list>
</template>

<script>
export default {
  name: "TeamLine",
  data() {
    return {};
  },
  computed: {
    yourTeam() {
      return this.$store.getters.showTeam;
    },
    showPick() {
      return this.$store.getters.showPick;
    },
  },
};
</script>

<style></style>
