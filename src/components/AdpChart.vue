<template>
  <div class="container">
    <line-chart v-if="loaded" :chart-data="chartdata" :options="options" />
  </div>
</template>

<script>
import LineChart from "./Chart.vue";

export default {
  name: "LineChartContainer",
  components: { LineChart },
  data: () => ({
    loaded: true,
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      responsive: true,
      maintainAspectRatio: false,
    },
    chartdata: {
      labels: ["Agg. ADP"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [40, 20],
        },
      ],
    },
  }),
  methods: {},
  computed: {},
  async mounted() {
    this.loaded = false;
    this.chartdata.datasets[0].data = await this.$store.getters.showAdpGroup;
    this.loaded = true;
  },
};
</script>
