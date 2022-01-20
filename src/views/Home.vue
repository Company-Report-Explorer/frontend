<template>
  <div class="home">
    <v-form class="middle" @submit.prevent="search()">
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
        </v-col>
      </v-row>
      <v-row class="mt-16" justify="center">
        <router-link to="/about">About Us</router-link>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => {
    return { searchTerm: "" };
  },
  methods: {
    search() {
      if (!this.searchTerm) return;
      this.$router.push(`/search?q=${this.searchTerm}`);
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
