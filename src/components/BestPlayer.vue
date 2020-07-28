<template>
  <v-card min-height="150px">
    <v-sparkline
      :labels="this.sparkData"
      :value="this.sparkData"
      :gradient="gradient"
      :smooth="radius || false"
      :padding="padding"
      :line-width="width"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      :fill="fill"
      :type="type"
      :auto-line-width="autoLineWidth"
      auto-draw
      height="54px;"
    ></v-sparkline>
    <v-card-subtitle class="pa-0 text-center">ADP PERFORMANCE</v-card-subtitle>
  </v-card>
</template>

<script>
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];

export default {
  data() {
    return {
      fill: false,
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: "round",
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: "top",
      gradients,
      type: "trend",
      autoLineWidth: false,
    };
  },
  computed: {
    sparkData() {
      return this.$store.getters.showAdpGroup;
    },
  },
};
</script>

<style></style>
