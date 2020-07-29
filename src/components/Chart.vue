<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: null,
    },
  },
  // props: {
  //   // chartdata: {
  //   //   type: Object,
  //   //   default: null,
  //   // },
  //   options: {
  //     type: Object,
  //     default: null,
  //   },
  // },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style></style>
