<template>
  <v-card min-height="150px" class="pt-9" :class="adpBgColor(this.showADP)">
    <v-card-text class="text-center">
      <h1 style="font-size:3.5em;" :class="adpColor(this.showADP)">
        {{ showADP }}
      </h1>
    </v-card-text>
    <v-card-title class="overline text-center justify-center pt-1">
      NET ADP
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    adpColor(adp) {
      if (adp < -10) return "deep-orange--text";
      else if (adp < 0) return "yellow--text";
      else return "light-green--text";
    },
    adpBgColor(adp) {
      if (adp < -10) return "red accent-4";
      else if (adp < 0) return "deep-orange darken-1";
      else return "cyan darken-3";
    },
  },
  computed: {
    pick() {
      return this.$store.getters.showPick;
    },
    showADP() {
      return this.$store.getters.showNetADP;
    },
    showADPGroup() {
      return this.$store.getters.showAdpGroup;
    },
  },
};
</script>

<style></style>
