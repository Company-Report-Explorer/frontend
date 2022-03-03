<template>
  <v-form @submit.prevent="onFormSubmit()" style="position: relative">
    <v-text-field
      ref="searchBar"
      @focus="showAutocomplete = true"
      @blur="onBlur()"
      placeholder="Search Term"
      v-model="term"
      clear-icon="mdi-close"
      @click:append="onFormSubmit()"
      persistent-hint
      :hint="
        found
          ? `Found ${found} results (${retrievalTime.toFixed(4)} seconds)`
          : 'Searching...'
      "
      clearable
      append-icon="mdi-magnify"
    >
    </v-text-field>
    <div class="mt-n5 autocomplete">
      <div
        v-show="showAutocomplete"
        v-for="history in searchItems"
        :key="history"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 3 : 1"
            :color="hover ? 'indigo lighten-5' : 'white'"
            rounded="0"
            class="white relative d-flex justify-space-between"
          >
            <v-row class="pa-3">
              <v-col cols="3" md="1">
                <v-icon class="mr-2" dense>mdi-history</v-icon>
              </v-col>
              <v-col @click="onSelectHistory(history)">
                {{ history }}
              </v-col>
              <v-col cols="3" md="1" class="text-right">
                <v-icon class="pointer" @click="onRemoveHistory(history)" dense>
                  mdi-close
                </v-icon>
              </v-col>
            </v-row>
          </v-card>
        </v-hover>
      </div>
    </div>
  </v-form>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    searchTerm: String,
    retrievalTime: Number,
    found: Number,
    searchHistory: Array as PropType<string[]>,
  },
  data() {
    return {
      term: this.searchTerm,
      showAutocomplete: false,
      searchItems: this.searchHistory,
    };
  },
  methods: {
    onFormSubmit() {
      this.$emit("formSubmit", this.term);
      this.showAutocomplete = false;
      (this.$refs.searchBar as HTMLElement).blur();
    },
    onSelectHistory(history: string) {
      this.showAutocomplete = false;
      this.$emit("formSubmit", history);
    },
    onRemoveHistory(history: string) {
      this.$emit("removeHistory", history);
    },
    onBlur() {
      setTimeout(() => {
        this.showAutocomplete = false;
      }, 100);
    },
  },
  watch: {
    searchTerm: {
      handler: function (newValue: string) {
        this.term = newValue;
      },
    },
    searchHistory: {
      handler: function (newValue: string) {
        this.searchItems = this.searchHistory.filter((v) =>
          v.includes(newValue)
        );
      },
    },
    term: {
      handler: function (newValue: string) {
        this.searchItems = this.searchHistory.filter((v) =>
          v.includes(newValue ?? "")
        );
      },
    },
  },
});
</script>

<style>
.autocomplete {
  z-index: 1;
  position: absolute;
  width: 100%;
}
.pointer {
  cursor: pointer;
}
</style>
