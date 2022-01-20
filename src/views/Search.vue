<template>
  <div class="home">
    <v-row align="center">
      <v-col cols="2" lg="1">
        <router-link to="/"> LOGO </router-link>
      </v-col>
      <v-col cols="6" lg="6">
        <v-form @submit.prevent="search()">
          <v-text-field
            placeholder="Search Term"
            v-model="searchTerm"
            clear-icon="mdi-close"
            @click:append="search"
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
      <v-col cols="12" lg="12">
        <small v-show="books.length">{{
          `Found ${books.length} results (0.00 seconds)`
        }}</small>
      </v-col>
    </v-row>
    <v-row
      justify="start"
      transition="fade-transition"
      v-for="b in books"
      :key="b.title"
      class="mb-1 transition"
      v-bind:class="{ 'opacity-0': loading }"
    >
      <v-col cols="12" lg="8">
        <Card :title="b.title" :words="b.words" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
export default {
  name: "Home",
  created() {
    this.searchTerm = this.$route.query.q;
    if (this.searchTerm) this.search();
  },
  data: () => {
    return { books: [], loading: false, searchTerm: "" };
  },
  components: { Card },
  methods: {
    search() {
      if (!this.searchTerm) return;
      this.$router.push({
        name: "Search",
        query: {
          q: this.searchTerm,
        },
      });
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      this.books = [
        { title: "Book 1", words: ["Word1", "Word2"] },
        { title: "Book 2", words: ["Word1", "Word2"] },
        { title: "Book 3", words: ["Word6", "Word2"] },
      ];
    },
    clear() {
      this.loading = true;
      setTimeout(() => {
        this.books = [];
      }, 500);
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
