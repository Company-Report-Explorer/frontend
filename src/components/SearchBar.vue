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
        showHint
          ? !isLoading
            ? `Found ${found} results (${retrievalTime.toFixed(4)} seconds)`
            : 'Searching...'
          : ''
      "
      clearable
      append-icon="mdi-magnify"
      counter="15"
    >
      <template v-slot:counter>
        <div
          class="text-caption mt-lg-n1 pointer"
          style="color: rgba(0, 0, 0, 0.6)"
          @click="showAdvancedSetting = !showAdvancedSetting"
        >
          <span class="d-flex" v-if="!showAdvancedSetting">
            <v-icon class="mr-lg-1" dense style="font-size: 0.8rem">
              mdi-cog
            </v-icon>
            <span class="d-lg-block d-none"> Advanced Search </span>
          </span>
          <span class="d-flex" v-else>
            <v-icon class="mr-lg-1" dense style="font-size: 0.8rem">
              mdi-close-octagon
            </v-icon>
            <span class="d-lg-block d-none"> Close </span>
          </span>
        </div>
      </template>
    </v-text-field>

    <Autocompletion
      :searchItems="searchItems"
      :showAutocomplete="showAutocomplete"
      v-on:selectHistory="onSelectHistory"
      v-on:removeHistory="onRemoveHistory"
    />

    <v-row v-if="showAdvancedSetting" class="mt-0 pa-0">
      <v-col></v-col>
      <v-col cols="4">
        <div class="d-flex flex-column blue-grey lighten-4 mt-n4 rounded pa-1">
          <v-checkbox
            hide-details
            label="Phrase Search"
            class="transform-80"
          ></v-checkbox>
          <v-checkbox
            hide-details
            label="Proximity Search"
            class="transform-80"
          ></v-checkbox>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Autocompletion from "@/components/Autocompletion.vue";
import Vue, { PropType } from "vue";
export default Vue.extend({
  components: { Autocompletion },
  props: {
    searchTerm: String,
    retrievalTime: Number,
    found: Number,
    searchHistory: Array as PropType<string[]>,
    isLoading: Boolean,
    showHint: Boolean,
  },
  data() {
    return {
      term: this.searchTerm,
      showAutocomplete: false,
      searchItems: this.searchHistory,
      showAdvancedSetting: false,
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
        this.$emit("type", newValue);
      },
    },
  },
});
</script>

<style>
.pointer {
  cursor: pointer;
}
.transform-80 {
  transform: scale(0.8);
  margin-top: 0 !important;
}
</style>
