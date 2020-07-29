<template>
  <div>
    <div>
      <h4>Find a player</h4>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        hide-details
      ></v-text-field>
    </div>
    <v-scroll-y-transition v-if="getPlayers">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="getPlayers"
        :fixed-header="fixed"
        height="60vh"
        :items-per-page="itemsPerPage"
        :search="search"
        :loading="isLoading"
        :item-class="row_classes"
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:item.AverageDraftPosition="{ item }">
          <v-chip :color="getColor(item.AverageDraftPosition)" dark>{{
            item.AverageDraftPosition
          }}</v-chip>
        </template>

        <template v-slot:item.addToTeam="{ item }">
          <v-scroll-x-transition>
            <v-chip
              v-if="!isDrafted(item)"
              @click="addPlayer(item)"
              close-icon="mdi-account-check"
              color="light-green"
              link
              small
              close
              >Draft</v-chip
            >
            <v-chip v-else color="success" small close-icon="mdi-tick" outlined
              >Drafted</v-chip
            >
          </v-scroll-x-transition>
        </template>

        <template v-slot:item.remove="{ item }">
          <v-scroll-x-transition>
            <v-chip
              v-if="!isRemoved(item)"
              @click="removePlayer(item)"
              close-icon="mdi-alarm-light"
              color="red"
              link
              small
              close
              >Remove</v-chip
            >
            <v-chip v-else color="red" small close-icon="mdi-tick" outlined
              >Removed</v-chip
            >
          </v-scroll-x-transition>
        </template>
      </v-data-table>
    </v-scroll-y-transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PlayerTable",
  data() {
    return {
      pick: 0,
      players: "",
      singleSelect: false,
      loading: false,
      selected: [],
      search: "",
      headers: [
        {
          text: "",
          value: "addToTeam",
          sortable: false,
        },
        {
          text: "",
          value: "remove",
          sortable: false,
        },
        {
          text: "Player Name",
          align: "start",
          sortable: false,
          value: "Name",
        },
        {
          text: "Team",
          align: "start",
          sortable: true,
          value: "Team",
        },
        {
          text: "Position",
          align: "start",
          sortable: true,
          value: "Position",
        },
        {
          text: "Bye Week",
          align: "start",
          sortable: true,
          value: "ByeWeek",
        },
        {
          text: "Age",
          align: "start",
          sortable: false,
          value: "Age",
        },
        {
          text: "Overall Fantasy Rank",
          align: "start",
          sortable: true,
          value: "Rank",
        },
        {
          text: "Projected Fantasy Points",
          align: "start",
          sortable: true,
          value: "FantasyPoints",
        },
        {
          text: "ADP",
          align: "start",
          sortable: true,
          value: "AverageDraftPosition",
        },
      ],
      fixed: true,
    };
  },
  methods: {
    calculateNet(player) {
      let net = this.pick - player.AverageDraftPosition;
      console.log(net);
      this.$store.dispatch("addADP", net.toFixed(2));
      return net.toFixed(2);
    },
    clickRemove(player) {
      player.removed = true;
      console.log(player);
      this.delayRemove(player);
    },
    async addPlayer(player) {
      //we're going to add the player to an array and also give it a property that equates to true so we can disable it in the list and set a BG colour
      let midPlayer = player;
      this.pick++;
      midPlayer.drafted = true;
      midPlayer.draftPick = this.pick;
      this.$store.dispatch("addPlayer", midPlayer);
      this.$store.dispatch("increasePick");
      let net = this.calculateNet(player);
      this.$store.dispatch("setNetADP", net);
      this.delayRemove(player);
    },
    delayRemove(player) {
      setTimeout(() => {
        this.$store.dispatch("removePlayer", player);
      }, 2000);
    },
    removePlayer(player) {
      //we're going to add the player to an array and also give it a property that equates to true so we can disable it in the list and set a BG colour
      this.$store.dispatch("removePlayer", player);
      this.$store.dispatch("increasePick");
    },
    removeList(item) {
      console.log(item);
    },
    getColor(adp) {
      if (adp > 50) return "red";
      else if (adp > 25) return "orange";
      else return "green";
    },
    row_classes(item) {
      let selected = this.showTeam.filter((player) => {
        return player.PlayerID === item.PlayerID;
      });
      if (selected.length) {
        return "custom-bg";
      }
    },
    isDrafted(item) {
      let selected = this.showTeam.filter((player) => {
        return player.PlayerID === item.PlayerID;
      });
      if (selected.length) {
        return true;
      }
    },
    isRemoved() {},
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "getPlayers",
      "isLoading",
      "showTeam",
      // ...
    ]),
    itemsPerPage() {
      return 75;
    },
  },
  mounted() {},
};
</script>

<style>
.custom-bg {
  background-color: darkslategrey;
}
</style>
