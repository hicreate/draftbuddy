<template>
  <v-card height="180px" class="cyan darken-4 pt-9">
    <v-card-text>
      <h1 style="font-size:3.5em;" class="light-green--text text-center pb-0">{{ pick }}</h1>
    </v-card-text>
    <v-card-title class="overline text-center justify-center pt-1">CURRENT DRAFT PICK</v-card-title>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    pick() {
      return this.$store.getters.showPick;
    }
  }
};
</script>

<style></style>
