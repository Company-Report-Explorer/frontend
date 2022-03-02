<template>
  <div>
    <v-card class="mx-auto">
      <v-row>
        <v-col cols="12" sm="2">
          <v-img
            class="ml-sm-6"
            height="100%"
            :src="bookImage"
            v-on:error="imageNotFound = true"
            contain
          >
          </v-img>
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
              :bookId="bookId"
              :query="query"
              :bookTitle="title"
              :reviews="[]"
              @fetch="fetchReviews({ bookId, query })"
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
    bookId: String,
    title: String,
    author: String,
    isbn: String,
    rating: Number,
    url: String,
    date: Number,
    desc: String,
    reviewCount: Number,
    imageUrl: String,
    query: String,
  },
  data: () => {
    return {
      showMore: false,
      imageNotFound: false,
      noImageSrc: require("@/assets/noImage.jpeg"),
    };
  },
  components: { Review, Details },
  computed: {
    description() {
      return this.showMore || String(this.desc).length <= 200
        ? this.desc
        : this.desc.slice(0, 200) + "...";
    },
    bookImage() {
      return this.imageNotFound ? this.noImageSrc : this.imageUrl;
    },
  },
  methods: {
    ...mapActions(["fetchReviews"]),
  },
});
</script>
