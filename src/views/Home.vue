<template>
  <v-container>
    <v-row>
      <v-col lg="3">
        <CurrentPick> </CurrentPick>
      </v-col>
      <v-col lg="3">
        <NetAdp> </NetAdp>
      </v-col>
      <v-col lg="6"><BestPlayer></BestPlayer></v-col>
    </v-row>
    <bpDisplay></bpDisplay>
    <v-row>
      <v-col>
        <PlayerTable></PlayerTable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerTable from "../components/PlayerTable";
import CurrentPick from "../components/CurrentPick";
import NetAdp from "../components/NetAdp";
import bpDisplay from "../components/bpDisplay";
import BestPlayer from "../components/BestPlayer";

export default {
  name: "Home",
  components: {
    PlayerTable,
    CurrentPick,
    NetAdp,
    bpDisplay,
    BestPlayer,
  },
  data() {
    return {};
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "getPlayers",
      // ...
    ]),
  },
  created() {
    this.$store.dispatch("fetchPlayers");
  },
};
</script>
