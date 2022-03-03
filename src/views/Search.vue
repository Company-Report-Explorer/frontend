<template>
  <div class="home">
    <v-row align="center">
      <v-col class="d-flex justify-center" cols="2" lg="1">
        <router-link to="/">
          <v-img class="mb-3" width="50px" src="@/assets/logo.svg"></v-img>
        </router-link>
      </v-col>
      <v-col cols="6" lg="6">
        <SearchBar
          v-on:formSubmit="updateSearch"
          v-on:removeHistory="removeHistory"
          :found="allBooks.length"
          :retrievalTime="retrievalTime"
          :searchTerm="searchTerm"
          :searchHistory="searchHistory"
        />
      </v-col>
      <v-col class="d-flex justify-end" cols="4" lg="5">
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
import Card from "@/components/Card.vue";
import SearchBar from "@/components/SearchBar.vue";
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
export default Vue.extend({
  name: "Home",
  computed: mapGetters(["allBooks", "retrievalTime", "isLoading"]),
  created() {
    this.searchTerm =
      typeof this.$route.query.q === "string" ? this.$route.query.q : "";
    if (this.searchTerm) this.search();
  },
  data: () => {
    return {
      searchTerm: "",
      searchHistory: JSON.parse(
        localStorage.getItem("history") || "[]"
      ) as string[],
    };
  },
  components: { Card, SearchBar },
  methods: {
    ...mapActions(["fetchBooks"]),
    updateSearch(term: string) {
      if (!term || this.$route.query.q === term) return;
      this.searchTerm = term;
      this.$router.push({
        name: "Search",
        query: {
          q: this.searchTerm,
        },
      });
      this.search();
    },
    async search() {
      this.saveToLocalStorage();
      await this.fetchBooks(this.searchTerm);
      // (this.$refs.searchBar as HTMLElement).blur();
    },
    saveToLocalStorage() {
      const isAllowed = localStorage.getItem("isAllowed");
      if (!isAllowed) return;
      this.searchHistory.push(this.searchTerm);
      this.searchHistory = this.searchHistory.filter(
        (value, index, self) => self.indexOf(value) === index
      );
      if (this.searchHistory.length >= 5)
        this.searchHistory = this.searchHistory.slice(1);
      localStorage.setItem("history", JSON.stringify(this.searchHistory));
    },
    removeHistory(history: string) {
      this.searchHistory = this.searchHistory.filter((v) => v !== history);
      localStorage.setItem("history", JSON.stringify(this.searchHistory));
    },
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
