<template>
  <div>
    <v-card class="mx-auto">
      <v-img
        class="white--text align-end grey darken-2"
        height="200px"
        :src="imageUrl"
        contain
      >
        <div style="background-color: rgb(55, 71, 79, 0.7)">
          <v-card-title>{{ title }} ({{ date }})</v-card-title>
          <v-card-subtitle>
            by
            <span class="font-weight-bold">{{ author }}</span>
          </v-card-subtitle>
        </div>
      </v-img>

      <v-card-subtitle class="pb-0">
        {{ desc.slice(0, 200) }}...
        <span class="font-weight-bold text-caption" style="cursor: pointer">
          Show More
        </span>
      </v-card-subtitle>

      <!-- <v-card-subtitle class="pb-0">
        Publication Date: {{ date }}
      </v-card-subtitle> -->

      <!-- <v-card-text class="text--primary">
      <div v-for="w in words" :key="w">{{ w }}</div>
    </v-card-text> -->

      <v-card-actions>
        <Details
          :title="title"
          :publicationYear="date"
          :author="author"
          :isbn="isbn"
          :reviewCount="reviewCount"
          :rating="rating"
          :url="url"
        />
        <Review
          :bookTitle="title"
          :reviews="[]"
          @fetch="fetchReviews('', 0, '')"
        />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Details from "@/components/BookDetails.vue";
import Review from "@/components/ReviewDialog.vue";
import { mapActions } from "vuex";
import Vue from "vue";
export default Vue.extend({
  props: {
    title: String,
    author: String,
    isbn: String,
    rating: Number,
    url: String,
    date: Number,
    desc: String,
    reviewCount: Number,
    imageUrl: String,
  },
  components: { Review, Details },
  methods: {
    ...mapActions(["fetchReviews"]),
  },
});
</script>
