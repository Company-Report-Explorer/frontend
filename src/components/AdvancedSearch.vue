<template>
  <div class="d-flex flex-column grey lighten-5 rounded py-3 px-10 text-body-2">
    <span class="text-h6">Advanced Search</span>
    <v-divider class="my-3" />
    <div class="d-flex align-center">
      Query Expansion
      <v-switch
        class="pa-0 ma-0 ml-2"
        v-model="queryExpansion"
        color="indigo"
        hide-details=""
        :label="`${queryExpansion ? 'On' : 'Off'}`"
      ></v-switch>
    </div>
    <v-divider class="my-3" />
    <div class="d-flex align-center">
      Strict Search
      <v-switch
        class="pa-0 ma-0 ml-2"
        v-model="strictSearch"
        color="indigo"
        hide-details=""
        :label="`${strictSearch ? 'On' : 'Off'}`"
      ></v-switch>
    </div>
    <v-divider class="mt-3" />
    <div>
      <div class="mt-3 mb-n3">Publication Year</div>
      <div class="d-flex align-center">
        <v-overflow-btn
          class="my-2"
          v-model="fromYear"
          :items="yearList.filter((v) => (toYear ? v <= toYear : true))"
          label="From"
          editable
          hide-details
        ></v-overflow-btn>
        <v-overflow-btn
          class="my-2"
          v-model="toYear"
          :items="yearList.filter((v) => v >= fromYear)"
          label="To"
          editable
          hide-details
        ></v-overflow-btn>
      </div>
    </div>
    <v-divider class="mt-3 mb-2" />
    <div class="d-flex align-center">
      Average Rating:
      <v-rating
        class="ml-2"
        v-model="rating"
        color="warning"
        half-increments
        hover
        length="5"
        size="20"
      ></v-rating>
    </div>
    <v-divider class="my-2" />
    <v-btn color="blue-grey" dark depressed> Apply </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      queryExpansion: false,
      strictSearch: false,
      fromYear: null,
      toYear: null,
      rating: 3,
      yearList: [...Array(new Date().getFullYear() - 1949).keys()]
        .map((v) => v + 1950)
        .reverse(),
    };
  },
});
</script>

<style>
.v-rating .v-icon {
  padding: 0 !important;
}
</style>
