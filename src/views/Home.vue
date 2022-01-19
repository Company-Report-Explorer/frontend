<template>
  <div class="home">
    <v-row>
      <v-col md="8" sm="12">
        <v-text-field label="Terms"></v-text-field>
      </v-col>
      <v-col md="2" sm="12">
        <v-btn block elevation="2" color="teal lighten-4" large>Search</v-btn>
      </v-col>
      <v-col md="2" sm="12">
        <v-btn block elevation="2" color="red lighten-3" large>Clear</v-btn>
      </v-col>
    </v-row>
    <v-row v-for="b in books" :key="b" class="mb-5"><Card /></v-row>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
export default {
  name: "Home",
  data: () => {
    return { books: [1, 2, 3, 4, 5, 6] };
  },
  components: { Card },
};
</script>
