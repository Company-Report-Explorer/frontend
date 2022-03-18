<template>
  <div class="d-flex flex-column flex-lg-column-reverse">
    <div class="text-right font-italic font-weight-light text-caption">
      Matched book
    </div>
    <v-card>
      <v-img
        :src="bookImage"
        v-on:error="imageNotFound = true"
        class="d-lg-block d-none"
      ></v-img>

      <v-card-title> {{ title }} {{ date ? `(${date})` : "" }} </v-card-title>
      <v-card-subtitle>
        by <span class="font-weight-bold">{{ author }}</span>
      </v-card-subtitle>

      <v-card-subtitle>
        <TextShowMore :fullText="desc" />
      </v-card-subtitle>

      <v-card-actions class="pointer" @click="show = !show">
        <div class="indigo--text pl-3 font-weight-medium">Details</div>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            <div class="mb-4">
              <span class="font-weight-bold">Author:</span> {{ author }} <br />
              <span class="font-weight-bold">ISBN:</span> {{ isbn || "N/A" }}
              <br />
              <span class="font-weight-bold">Rating:</span> {{ rating }} / 5.00
              <br />
              <span class="font-weight-bold">Publication Year:</span>
              {{ date || "-" }} <br />
            </div>
            <div class="text-right">
              <a :href="url" target="_blank">
                <v-btn color="indigo" dark text>Goodreads</v-btn>
              </a>
            </div>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
    <v-divider class="mb-3 mt-5 d-block d-lg-none"></v-divider>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TextShowMore from "@/components/TextShowMore.vue";
export default Vue.extend({
  components: {
    TextShowMore,
  },
  props: {
    title: String,
    desc: String,
    imgUrl: String,
    author: String,
    date: Number,
    isbn: String,
    rating: Number,
    reviewCount: Number,
    url: String,
  },
  data: () => {
    return {
      show: false,
      showMore: false,
      imageNotFound: false,
      noImageSrc: require("@/assets/noImage.jpeg"),
    };
  },
  computed: {
    bookImage() {
      return this.imageNotFound ? this.noImageSrc : this.imgUrl;
    },
  },
  methods: {
    addCommas(num: number): string {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
});
</script>
