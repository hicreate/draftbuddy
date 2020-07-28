<template>
  <v-card>
    <v-card-title><slot name="name"></slot></v-card-title>
    <v-card-subtitle><slot name="position"></slot></v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style></style>
