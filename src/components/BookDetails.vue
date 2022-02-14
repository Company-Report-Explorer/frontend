<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo"
          text
          dark
          v-bind="attrs"
          v-on="on"
          @click="$emit('fetch')"
        >
          Details
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">{{ title }}</v-card-title>

        <v-card-text class="pt-5">
          <span class="font-weight-bold">Author:</span> {{ author }} <br />
          <span class="font-weight-bold">ISBN:</span> {{ isbn || "N/A" }} <br />
          <span class="font-weight-bold">Rating:</span> {{ rating }} / 5.00
          <br />
          <span class="font-weight-bold">Publication Year:</span>
          {{ publicationYear }} <br />
          <span class="font-weight-bold">Number of Reviews:</span>
          {{ reviewCount }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="goToGoodRead()">
            Go to GoodRead
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    title: String,
    author: String,
    isbn: String,
    rating: Number,
    url: String,
    publicationYear: Number,
    reviewCount: Number,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    goToGoodRead(): void {
      const link = window.open(this.url, "_blank");
      if (!link) return;
      link.focus();
    },
  },
});
</script>
