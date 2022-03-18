<template>
  <div class="home">
    <v-form class="middle" @submit.prevent="search()">
      <v-row>
        <v-col class="text-h1">
          <div>
            <v-img width="100px" src="@/assets/logo.svg"></v-img>Novel Novels
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-caption text-right">
          Logo designed by:
          <a href="https://logomakr.com/app/">LogoMakr.com/app</a>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <SearchBar
            v-on:formSubmit="search"
            v-on:removeHistory="removeHistory"
            v-on:type="updateValue"
            searchTerm=""
            :found="0"
            :retrievalTime="0"
            :searchHistory="searchHistory"
            :isLoading="true"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            block
            elevation="2"
            color="indigo lighten-4"
            large
            @click="search(searchTerm)"
            :disabled="!searchTerm"
          >
            Search
          </v-btn>
          <!-- <div class="d-flex justify-end">
            <v-switch
              v-model="isAllowedLocalStorage"
              inset
              color="indigo"
              hide-details
              @click="togglePermission()"
              :label="`${
                isAllowedLocalStorage ? 'Allow' : 'Not allow'
              } local storage`"
            ></v-switch>
          </div> -->
        </v-col>
      </v-row>
      <v-row class="my-16" justify="center">
        <router-link to="/about">About Us</router-link>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import Vue from "vue";
export default Vue.extend({
  name: "Home",
  components: { SearchBar },
  beforeCreate: () => {
    document.title = "Novel Novels";
  },
  data: () => {
    return {
      searchTerm: "",
      isAllowedLocalStorage: localStorage.getItem("isAllowed") === "true",
      searchHistory: JSON.parse(
        localStorage.getItem("history") || "[]"
      ) as string[],
    };
  },
  methods: {
    search(term: string) {
      if (!term) return;
      this.$router.push(`/search?q=${term}`);
    },
    togglePermission() {
      localStorage.setItem("isAllowed", String(this.isAllowedLocalStorage));
      if (!this.isAllowedLocalStorage) {
        this.searchHistory = [];
        localStorage.clear();
      }
    },
    removeHistory(history: string) {
      this.searchHistory = this.searchHistory.filter((v) => v !== history);
      localStorage.setItem("history", JSON.stringify(this.searchHistory));
    },
    updateValue(term: string) {
      this.searchTerm = term;
    },
  },
});
</script>

<style>
.middle {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 80%;
}
</style>
