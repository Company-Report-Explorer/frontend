<template>
  <div class="home">
    <v-row align="center">
      <v-col
        class="d-flex justify-center align-self-start pt-4"
        cols="2"
        lg="1"
      >
        <router-link to="/">
          <v-img class="mb-3" width="50px" src="@/assets/logo.svg"></v-img>
        </router-link>
      </v-col>
      <v-col cols="6" lg="6">
        <SearchBar
          v-on:formSubmit="updateSearch"
          v-on:removeHistory="removeHistory"
          v-on:applyAdvancedSearch="advancedSearch"
          :found="allBooks.length"
          :retrievalTime="retrievalTime"
          :totalTime="totalTime"
          :searchTerm="searchTerm"
          :searchHistory="searchHistory"
          :isLoading="isLoading"
          :showHint="true"
          :showAdvancedSearch="true"
        />
      </v-col>
      <v-col class="d-flex justify-end align-self-start pt-9" cols="4" lg="5">
        <router-link to="/about" class=""> About Us </router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-lg-block d-none" lg="1"></v-col>
      <v-col cols="11" lg="4"> </v-col>
    </v-row>
    <v-row v-if="isLoading">
      <v-col class="d-lg-block d-none" lg="1"></v-col>
      <v-col lg="8">
        <v-sheet color="blue-grey lighten-5" class="pa-3">
          <v-skeleton-loader
            class="mx-auto"
            type="image, article"
          ></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row v-if="!isLoading && correctedQuery" class="mt-n5">
      <v-col class="d-lg-block d-none" lg="1"></v-col>
      <v-col lg="8">
        Did you mean
        <span
          class="indigo--text pointer font-weight-bold font-italic"
          @click="updateSearch(correctedQuery)"
        >
          {{ correctedQuery }}
        </span>
        ?
      </v-col>
    </v-row>
    <v-row v-if="allBooks.length === 0 && !isLoading">
      <v-col class="d-lg-block d-none" lg="1"></v-col>
      <v-col class="d-flex justify-center font-weight-medium" lg="8">
        - No Results Found -
      </v-col>
    </v-row>
    <v-row
      justify="start"
      transition="fade-transition"
      v-for="b in allBooks"
      :key="b.title"
      class="mb-1 transition"
      v-bind:class="{ 'opacity-0': isLoading }"
    >
      <v-col class="d-lg-block d-none" lg="1"></v-col>
      <v-col cols="12" lg="8">
        <Card
          :bookId="b.id"
          :title="b.title"
          :author="b.author"
          :date="b.publicationYear"
          :desc="b.description"
          :isbn="b.isbn"
          :rating="b.rating"
          :reviewCount="b.textReviewsCount"
          :url="b.url"
          :imageUrl="b.imageUrl"
          :query="searchTerm"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

import Card from "@/components/Card.vue";
import SearchBar from "@/components/SearchBar.vue";

export default Vue.extend({
  name: "Home",
  computed: mapGetters([
    "allBooks",
    "retrievalTime",
    "totalTime",
    "correctedQuery",
    "getAdvancedOptions",
  ]),
  created() {
    this.searchTerm =
      typeof this.$route.query.q === "string" ? this.$route.query.q : "";
    const options = {
      qe: this.$route.query.qe,
      ss: this.$route.query.ss,
      fromYear: this.$route.query.fromYear,
      toYear: this.$route.query.toYear,
      rating: this.$route.query.rating,
    };
    this.setAdvancedOptions(options);
    this.pruneOptions = Object.fromEntries(
      Object.entries(options).filter((v) => v[1])
    );
    if (this.searchTerm) this.search();
  },
  data: () => {
    return {
      searchTerm: "",
      searchHistory: JSON.parse(
        localStorage.getItem("history") || "[]"
      ) as string[],
      isLoading: false,
      pruneOptions: {},
    };
  },
  components: { Card, SearchBar },
  methods: {
    ...mapActions([
      "fetchBooks",
      "clearAdvancedOptions",
      "clearReviews",
      "setAdvancedOptions",
    ]),
    updateSearch(term: string, force: boolean = false) {
      if (!force && (!term || this.$route.query.q === term)) return;
      this.searchTerm = term;
      this.$router
        .push({
          name: "Search",
          query: {
            q: this.searchTerm,
            ...this.pruneOptions,
          },
        })
        .catch((err) => {
          console.log("Error occurred: ", err);
        });
      this.search();
    },
    async search() {
      this.saveToLocalStorage();
      this.isLoading = true;
      await this.fetchBooks({
        query: this.searchTerm,
        options: this.pruneOptions,
      });
      this.isLoading = false;
    },
    saveToLocalStorage() {
      const isAllowed = localStorage.getItem("isAllowed");
      if (!isAllowed) return;
      this.searchHistory.push(this.searchTerm);
      this.searchHistory = this.searchHistory.filter(
        (value, index, self) => self.indexOf(value) === index
      );
      if (this.searchHistory.length > 5)
        this.searchHistory = this.searchHistory.slice(1);
      localStorage.setItem("history", JSON.stringify(this.searchHistory));
    },
    removeHistory(history: string) {
      this.searchHistory = this.searchHistory.filter((v) => v !== history);
      localStorage.setItem("history", JSON.stringify(this.searchHistory));
    },
    advancedSearch(term: string) {
      this.pruneOptions = Object.fromEntries(
        Object.entries(this.getAdvancedOptions).filter((v) => v[1])
      );
      this.updateSearch(term, true);
    },
  },
  beforeDestroy() {
    this.clearReviews();
    this.clearAdvancedOptions();
  },
});
</script>

<style>
.transition {
  transition: all 1s;
}
.opacity-0 {
  opacity: 0;
}
</style>
