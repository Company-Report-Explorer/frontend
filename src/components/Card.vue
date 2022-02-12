<template>
  <div>
    <v-card class="mx-auto">
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle>
          by
          <span class="font-weight-bold">{{ author }}</span>
        </v-card-subtitle>
      </v-img>

      <v-card-subtitle class="pb-0">
        Publication Date: {{ date }}
      </v-card-subtitle>

      <!-- <v-card-text class="text--primary">
      <div v-for="w in words" :key="w">{{ w }}</div>
    </v-card-text> -->

      <v-card-actions>
        <Review :bookTitle="title" :reviews="[]" @fetch="fetchReviews()" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Review from "@/components/ReviewDialog.vue";
import { mapActions } from "vuex";

export default {
  props: ["title", "author", "date"],
  components: { Review },
  methods: {
    ...mapActions(["fetchReviews"]),
  },
};
</script>
