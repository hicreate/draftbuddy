<template>
  <v-bottom-sheet v-model="sheet" @input="closed">
    <v-sheet style="border-top: 5px solid #363636;" class="text-center pt-2" height="70vh">
      <div style="height:64px;" class="text-right pa-2">
        <v-btn @click="closed" fab>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-skeleton-loader
        width="75%"
        class="mx-auto"
        :loading="!this.playerDetails.PhotoUrl"
        type="table"
        transition="scale-transition"
        height="40vh"
      >
        <div>
          <v-card max-width="75%" elevation="0" class="mx-auto">
            <div id="sheet-holder" class="d-flex align-end">
              <div id="sheet-name" class="d-flex align-end">
                <v-img max-width="96px" max-height="148px" :src="playerDetails.PhotoUrl"></v-img>

                <div class="text-left">
                  <v-card-title
                    class="text-uppercase font-weight-bold font-italic"
                  >{{ player.Name }}</v-card-title>
                  <v-card-subtitle class="pb-xs-0">
                    <span>{{ player.Team }} / {{ player.Position }}</span>
                  </v-card-subtitle>
                </div>
              </div>

              <v-spacer></v-spacer>

              <!-- this is the draft button and simple table for larger screens -->
              <div v-if="$vuetify.breakpoint.mdAndUp">
                <v-btn large color="success">
                  DRAFT NOW
                  <v-icon class="ml-2">mdi-account-plus</v-icon>
                </v-btn>
                <v-simple-table dense class="mx-auto my-2" style="border: 1px grey solid;">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center">Bye</th>
                        <th class="text-center">Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ player.ByeWeek }}</td>
                        <td>{{ player.Age }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>

              <!-- this is the draft button and simple table for smaller screens -->
              <div style="width: 100%;" v-else>
                <v-simple-table dense class="mx-auto my-2" style="border: 1px grey solid;">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center px-1">Proj. Pts</th>
                        <th class="text-center px-1">Rank</th>
                        <th class="text-center px-1">Pos.Rank</th>
                        <th class="text-center px-1">Bye</th>
                        <th class="text-center px-1">Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="px-1">{{player.FantasyPoints}}</td>
                        <td class="px-1">{{player.Rank}}</td>
                        <td class="px-1">{{player.PositionRank}}</td>
                        <td class="px-1">{{ player.ByeWeek }}</td>
                        <td class="px-1">{{ player.Age }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
            </div>
            <v-divider></v-divider>
          </v-card>
          <div class="py-6"></div>
          <v-card max-width="75%" elevation="0" class="mx-auto">
            <v-row></v-row>
          </v-card>
          <v-card max-width="75%" elevation="0" class="mx-auto">
            <v-row>
              <v-col>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th
                          v-for="game in selectedSchedule"
                          :key="game.GameKey"
                          class="text-center pa-2"
                          style="font-size:11px;"
                        >
                          Week
                          <br />
                          {{game.Week}}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          v-for="game in selectedSchedule"
                          :key="game.GameKey"
                          class="text-center pa-2"
                        >
                          <span
                            v-if="game.HomeTeam === player.Team"
                            style="font-size: 11px;"
                          >vs. {{game.AwayTeam}}</span>
                          <span v-else style="font-size: 11px;">@ {{game.HomeTeam}}</span>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-skeleton-loader>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import SportsDataService from "../services/SportsDataService";

export default {
  name: "PlayerSheet",
  props: {
    sheet: Boolean,
    player: Object
  },
  data() {
    return {
      playerImage: require("../../public/player.svg"),
      playerDetails: null,
      playerNews: null,
      value: 0,
      interval: {},
      schedule: "",
      gameWeek: 1
    };
  },
  methods: {
    closed() {
      this.$emit("closed", false);
      this.value = 0;
      this.playerDetails = "";
      this.playerNews = "";
    },
    homeGames(game) {
      return game.HomeTeam == this.player.Team;
    },
    awayGames(game) {
      return game.AwayTeam == this.player.Team;
    },
    getSchedules() {
      SportsDataService.getSchedule().then(response => {
        this.schedule = response.data;
      });
    },
    getPlayerDetails(playerID) {
      console.log("Playuer ID", playerID);
      SportsDataService.getPlayer(playerID).then(response => {
        this.playerDetails = response.data;
      });
    },
    getPlayerNews(playerID) {
      console.log("Player ID", playerID);
      SportsDataService.getPlayerNews(playerID).then(response => {
        this.playerNews = response.data;
      });
    }
  },
  computed: {
    selectedScheduleHome() {
      let slim = this.schedule.filter(game => {
        return game.HomeTeam === this.player.Team;
      });
      return slim;
    },
    selectedSchedule() {
      let slimHome = this.schedule.filter(game => {
        return game.HomeTeam === this.player.Team;
      });
      let slimAway = this.schedule.filter(game => {
        return game.AwayTeam === this.player.Team;
      });
      return slimHome
        .concat(slimAway)
        .sort((a, b) => (a.Week > b.Week ? 1 : -1));
    }
  },
  created() {
    this.getSchedules();
  },
  mounted() {},
  watch: {
    player: function() {
      if (this.player) {
        this.getPlayerDetails(this.player.PlayerID);
        this.getPlayerNews(this.player.PlayerID);
      }
    }
  }
};
</script>

<style>
@media (max-width: 763px) {
  #sheet-name {
    width: 100% !important;
    flex-direction: row;
    flex-grow: 1;
  }

  #sheet-holder {
    flex-direction: column;
  }
}
</style>
