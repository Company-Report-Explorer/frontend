<template>
  <div class="d-flex flex-column grey lighten-5 rounded py-3 px-10 text-body-2">
    <span class="text-h6">Advanced Search</span>
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
    <v-row>
      <v-col>
        <v-btn color="red lighten-2" @click="reset()" dark depressed block>
          Reset
        </v-btn>
      </v-col>
      <v-col>
        <v-btn color="blue-grey" @click="apply()" dark depressed block>
          Apply
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
export default Vue.extend({
  data() {
    const oldOptions = this.$store.getters.getAdvancedOptions;
    return {
      strictSearch: oldOptions.ss || false,
      fromYear: oldOptions.fromYear || null,
      toYear: oldOptions.toYear || null,
      rating: oldOptions.rating || 0,
      yearList: [...Array(new Date().getFullYear() - 1949).keys()]
        .map((v) => v + 1950)
        .reverse(),
    };
  },
  methods: {
    ...mapActions(["setAdvancedOptions", "clearAdvancedOptions"]),
    apply() {
      const options = {
        ss: this.strictSearch,
        fromYear: this.fromYear,
        toYear: this.toYear,
        rating: this.rating,
      };
      this.setAdvancedOptions(options);
      this.$emit("applyAdvancedSearch");
    },
    reset() {
      this.strictSearch = false;
      this.fromYear = 0;
      this.toYear = 0;
      this.rating = 0;
      this.clearAdvancedOptions();
    },
  },
});
</script>

<style>
.v-rating .v-icon {
  padding: 0 !important;
}
</style>
