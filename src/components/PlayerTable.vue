<template>
  <div>
    <div>
      <div v-if="$vuetify.breakpoint.mdAndUp">
        <h4>Find a player</h4>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" hide-details></v-text-field>
      </div>
      <v-scroll-y-transition v-if="getPlayers">
        <!-- Data table that shows on devices above 960px -->
        <v-data-table
          v-if="$vuetify.breakpoint.mdAndUp"
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
            <v-chip :color="getColor(item.AverageDraftPosition)" dark>
              {{
              item.AverageDraftPosition
              }}
            </v-chip>
          </template>

          <template v-slot:item.actions="{ item }">
            <div class="d-flex">
              <v-scroll-x-transition>
                <v-btn @click="openSheet(item)" rounded small color="success">
                  DRAFT
                  <v-icon>mdi-account-plus</v-icon>
                </v-btn>
              </v-scroll-x-transition>
              <v-scroll-x-transition>
                <v-btn @click="removePlayer(item)" class="ml-2" rounded small color="red">
                  REMOVE
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-scroll-x-transition>
            </div>
          </template>
        </v-data-table>

        <!-- data table that shows on mobile -->
        <v-data-table
          v-else
          dense
          disable-sort="true"
          v-model="selected"
          :headers="mobileHeaders"
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
            <v-chip :color="getColor(item.AverageDraftPosition)" dark>
              {{
              item.AverageDraftPosition
              }}
            </v-chip>
          </template>

          <template v-slot:item.actions="{ item }">
            <div class="d-flex">
              <v-scroll-x-transition>
                <v-btn @click="openSheet(item)" rounded small color="success">
                  DRAFT
                  <v-icon>mdi-account-plus</v-icon>
                </v-btn>
              </v-scroll-x-transition>
              <v-scroll-x-transition>
                <v-btn @click="removePlayer(item)" class="ml-2" rounded small color="red">
                  REMOVE
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-scroll-x-transition>
            </div>
          </template>

          <!-- player slot -->

          <template v-slot:item.mobilePlayer="{ item }">
            <div class="d-flex" style="width:100% !important;">
              <div style="width:10%;" class="d-flex flex-column justify-center">
                <div class="text-left">
                  <p class="mb-0" style="font-size: 7px; font-weight: 700;">ADP</p>
                  <p class="mb-0" :style="adpColor(item.AverageDraftPosition)">
                    {{
                    item.AverageDraftPosition
                    }}
                  </p>
                </div>
              </div>
              <div class="d-flex flex-column pl-4" style="width:70%;">
                <p class="text-left pb-0 mb-0" style="font-size: 11px;">{{item.Name}}</p>
                <div class="text-left">
                  <span
                    style="font-size:9px; font-weight: 800; font-style: italic;"
                  >{{item.Team}} / {{item.Position}}</span>
                </div>
              </div>
              <div class="d-flex">
                <v-scroll-x-transition>
                  <v-btn @click="openSheet(item)" x-small fab color="success">
                    <v-icon>mdi-account-plus</v-icon>
                  </v-btn>
                </v-scroll-x-transition>
                <v-scroll-x-transition>
                  <v-btn @click="removePlayer(item)" class="ml-2" fab x-small color="red">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-scroll-x-transition>
              </div>
            </div>
          </template>
        </v-data-table>
      </v-scroll-y-transition>
    </div>
    <PlayerSheet :sheet="sheet" :player="selectedPlayer" @closed="sheetClosed"></PlayerSheet>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerSheet from "./PlayerSheet";

export default {
  name: "PlayerTable",
  components: {
    PlayerSheet
  },
  data() {
    return {
      pick: 0,
      players: "",
      selectedPlayer: null,
      singleSelect: false,
      loading: false,
      selected: [],
      search: "",
      headers: [
        {
          text: "Actions",
          value: "actions",
          sortable: false
        },
        {
          text: "Player Name",
          align: "start",
          sortable: false,
          value: "Name"
        },
        {
          text: "Team",
          align: "start",
          sortable: true,
          value: "Team"
        },
        {
          text: "Position",
          align: "start",
          sortable: true,
          value: "Position"
        },
        {
          text: "Bye Week",
          align: "start",
          sortable: true,
          value: "ByeWeek"
        },
        {
          text: "Age",
          align: "start",
          sortable: false,
          value: "Age"
        },
        {
          text: "Overall Fantasy Rank",
          align: "start",
          sortable: true,
          value: "Rank"
        },
        {
          text: "Projected Fantasy Points",
          align: "start",
          sortable: true,
          value: "FantasyPoints"
        },
        {
          text: "ADP",
          align: "start",
          sortable: true,
          value: "AverageDraftPosition"
        }
      ],
      mobileHeaders: [
        {
          align: "start",
          sortable: true,
          value: "mobilePlayer"
        }
      ],
      sheet: false,
      fixed: true
    };
  },
  methods: {
    adpColor(adp) {
      return "color:" + this.getColor(adp);
    },
    openSheet(item) {
      this.sheet = true;
      this.selectedPlayer = item;
    },
    sheetClosed() {
      this.sheet = false;
    },
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
      if (adp > this.showPick + 15) return "red";
      else if (adp > this.showPick + 8) return "orange";
      else return "green";
    },
    row_classes(item) {
      let selected = this.showTeam.filter(player => {
        return player.PlayerID === item.PlayerID;
      });
      if (selected.length) {
        return "custom-bg";
      }
    },
    isDrafted(item) {
      let selected = this.showTeam.filter(player => {
        return player.PlayerID === item.PlayerID;
      });
      if (selected.length) {
        return true;
      }
    },
    isRemoved() {}
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "getPlayers",
      "isLoading",
      "showTeam",
      "showPick"
      // ...
    ]),
    itemsPerPage() {
      return 75;
    }
  },
  mounted() {}
};
</script>

<style>
.custom-bg {
  background-color: darkslategrey;
}
</style>
