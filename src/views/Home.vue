<template>
  <div class="home">
    <v-form class="middle" @submit.prevent="search()">
      <v-row>
        <v-col class="text-h1">
          <div>
            <v-img width="100px" src="@/assets/logo.svg"></v-img>Book Search
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
          <v-text-field
            label="Search Term"
            v-model="searchTerm"
            clear-icon="mdi-close"
            @click:append="search"
            clearable
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            block
            elevation="2"
            color="indigo lighten-4"
            large
            @click="search()"
            :disabled="!searchTerm"
          >
            Search
          </v-btn>
          <div
            v-if="isAllowedLocalStorage"
            class="text-center"
            style="cursor: pointer"
            @click="togglePermission()"
          >
            Not allow using local storage (Currently Allow)
          </div>
          <div
            v-else
            class="text-center"
            @click="togglePermission()"
            style="cursor: pointer"
          >
            Allow using local storage (Currently Not Allow)
          </div>
        </v-col>
      </v-row>
      <v-row class="my-16" justify="center">
        <router-link to="/about">About Us</router-link>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => {
    return {
      searchTerm: "",
      isAllowedLocalStorage: localStorage.getItem("isAllowed") === "true",
    };
  },
  methods: {
    search() {
      if (!this.searchTerm) return;
      this.$router.push(`/search?q=${this.searchTerm}`);
    },
    togglePermission() {
      localStorage.setItem("isAllowed", !this.isAllowedLocalStorage);
      this.isAllowedLocalStorage = localStorage.getItem("isAllowed") === "true";
      if (!this.isAllowedLocalStorage) localStorage.clear();
    },
  },
};
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
