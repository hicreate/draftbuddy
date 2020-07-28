<template>
  <v-row>
    <v-col lg="4"> </v-col>
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
        //this.best[position] = holder;
        this.best.push({
          position: [position],
          players: holder,
        });
      });
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
