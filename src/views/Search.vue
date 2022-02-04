<template>
  <div class="home">
    <v-row align="center">
      <v-col class="d-flex justify-center" cols="2" lg="1">
        <router-link to="/">
          <v-img class="mb-3" width="50px" src="@/assets/logo.svg"></v-img>
        </router-link>
      </v-col>
      <v-col cols="6" lg="6">
        <v-form @submit.prevent="updateSearch()">
          <v-text-field
            placeholder="Search Term"
            v-model="searchTerm"
            clear-icon="mdi-close"
            @click:append="updateSearch"
            clearable
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-form>
      </v-col>
      <v-col class="d-flex justify-end" cols="4" lg="5">
        <router-link to="/about" class=""> About Us </router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-lg-block d-none" lg="1"></v-col>
      <v-col cols="7" lg="4">
        <small v-show="allBooks.length">{{
          `Found ${allBooks.length} results (${retrievalTime.toFixed(
            4
          )} seconds)`
        }}</small>
      </v-col>
      <!-- <v-col><small>Advanced</small></v-col> -->
    </v-row>
    <v-row
      justify="start"
      transition="fade-transition"
      v-for="b in allBooks"
      :key="b.title"
      class="mb-1 transition"
      v-bind:class="{ 'opacity-0': loading }"
    >
      <v-col class="d-lg-block d-none" lg="1"></v-col>
      <v-col cols="12" lg="8">
        <Card :title="b.title" :words="b.words" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  computed: mapGetters(["allBooks", "retrievalTime"]),
  created() {
    this.searchTerm = this.$route.query.q;
    if (this.searchTerm) this.search();
  },
  data: () => {
    return { loading: false, searchTerm: "" };
  },
  components: { Card },
  methods: {
    ...mapActions(["fetchBooks"]),
    updateSearch() {
      if (!this.searchTerm || this.$route.query.q === this.searchTerm) return;
      this.$router.push({
        name: "Search",
        query: {
          q: this.searchTerm,
        },
      });
      this.search();
    },
    search() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);

      this.fetchBooks(this.searchTerm);
    },
  },
};
</script>

<style>
.transition {
  transition: all 1s;
}
.opacity-0 {
  opacity: 0;
}
</style>
