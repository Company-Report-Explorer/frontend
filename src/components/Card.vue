<template>
  <div>
    <v-card class="mx-auto">
      <v-row>
        <v-col cols="2">
          <v-img height="100%" :src="imageUrl" contain> </v-img>
        </v-col>
        <v-col>
          <v-card-title>{{ title }} ({{ date }})</v-card-title>
          <v-card-subtitle>
            by
            <span class="font-weight-bold">{{ author }}</span>
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-subtitle class="pb-0">
            {{ description }}
            <span v-if="desc.length > 200">
              <span
                class="font-weight-bold text-caption indigo--text"
                style="cursor: pointer"
                v-if="!showMore"
                @click="showMore = !showMore"
              >
                Show More
              </span>
              <span
                class="font-weight-bold text-caption indigo--text"
                style="cursor: pointer"
                v-else
                @click="showMore = !showMore"
              >
                Show Less
              </span>
            </span>
          </v-card-subtitle>

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
        </v-col>
      </v-row>
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
  data: () => {
    return { showMore: false };
  },
  components: { Review, Details },
  computed: {
    description() {
      return this.showMore || String(this.desc).length <= 200
        ? this.desc
        : this.desc.slice(0, 200) + "...";
    },
  },
  methods: {
    ...mapActions(["fetchReviews"]),
  },
});
</script>
