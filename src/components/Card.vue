<template>
  <v-card class="mx-auto">
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>{{ title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0"> Most Common Words </v-card-subtitle>

    <v-card-text class="text--primary">
      <div v-for="w in words" :key="w">{{ w }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="indigo" text> Details </v-btn>

      <v-btn color="indigo" text> Reviews </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["title", "desc", "words"],
};
</script>
