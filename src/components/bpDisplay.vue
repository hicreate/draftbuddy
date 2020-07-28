<template>
  <v-row>
    <v-col lg="4" v-for="pos in best" :key="pos.position">
      <v-card style="border-left: 5px solid #363636;">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline" style="font-size:10px !important;">
              BEST AVAILABLE {{ pos.players[0].Position }}
              <v-divider></v-divider>
            </div>
            <v-list-item-title
              class="subtitle-2 font-weight-bold text-uppercase"
              >{{ pos.players[0].Name }}</v-list-item-title
            >
            <v-list-item-subtitle
              >Proj. Pts:
              {{ pos.players[0].FantasyPoints }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >Pos. Rank:
              {{ pos.players[0].PositionRank }}</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-avatar
            size="74px"
            class="d-flex flex-column blue-grey darken-3 pa-1"
          >
            <h6>ADP</h6>
            <h2 :class="adpColor(pos.players[0].AverageDraftPosition)">
              {{ pos.players[0].AverageDraftPosition }}
            </h2>
          </v-list-item-avatar>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      positions: ["RB", "WR", "TE", "QB", "DST", "K"],
      best: [],
    };
  },
  methods: {
    getPlayers() {
      const players = this.mainPlayers;
      this.positions.forEach((position) => {
        console.log(position);
        let holder = players.filter((player) => {
          return player.Position === position;
        });
        holder.sort(function(a, b) {
          return a.AverageDraftPosition - b.AverageDraftPosition;
        });
        //check if the position already exists, if so update, if not push
        const exists = this.best.filter((pos) => {
          return pos.position[0] === position;
        });

        if (exists.length > 0) {
          const elementsIndex = this.best.findIndex(
            (element) => element.position[0] == position
          );
          console.log("position already exists", elementsIndex);
          this.best[elementsIndex].players = holder;
        } else {
          //this.best[position] = holder;
          this.best.push({
            position: [position],
            players: holder,
          });
        }
      });
    },
    adpColor(adp) {
      if (adp > 50) return "deep-orange--text";
      else if (adp > 25) return "yellow--text";
      else return "light-green--text";
    },
  },
  computed: {
    mainPlayers() {
      return this.$store.getters.getPlayers;
    },
  },
  watch: {
    mainPlayers: function() {
      this.getPlayers();
    },
  },
  mounted() {},
};
</script>

<style></style>
