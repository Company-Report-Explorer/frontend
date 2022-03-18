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
      hint=" "
      clearable
      append-icon="mdi-magnify"
      :counter="showAdvancedSearch ? 0 : false"
    >
      <template v-slot:message>
        <div v-if="showHint">
          <div v-if="isLoading">Searching...</div>
          <div v-else>
            Found {{ found }} results ({{ totalTime.toFixed(4) }} seconds)
            <v-tooltip bottom color="dark">
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="text-caption" v-bind="attrs" v-on="on">
                  mdi-information
                </v-icon>
              </template>
              <span class="text-caption">
                HTTPS and Server:
                {{ (totalTime - retrievalTime).toFixed(4) }} seconds<br />
                Retrieval Time: {{ retrievalTime.toFixed(4) }} seconds<br />
                Total Time: {{ totalTime.toFixed(4) }} seconds
              </span>
            </v-tooltip>
          </div>
        </div></template
      >
      <template v-slot:counter>
        <div
          v-if="showAdvancedSearch"
          class="text-caption mt-lg-n1 pointer d-md-block d-none"
          style="color: rgba(0, 0, 0, 0.6)"
          @click="showAdvancedSetting = !showAdvancedSetting"
        >
          <span
            class="d-flex"
            v-if="showAdvancedSearch && !showAdvancedSetting"
          >
            <v-icon class="mr-lg-1" dense style="font-size: 0.8rem">
              mdi-cog
            </v-icon>
            <span class="d-lg-block d-none unselectable">
              Advanced Search
              {{ isAdvancedOptionsOn ? "(Active)" : "" }}
            </span>
          </span>
          <span class="d-flex" v-else>
            <v-icon class="mr-lg-1" dense style="font-size: 0.8rem">
              mdi-close-octagon
            </v-icon>
            <span class="d-lg-block d-none unselectable"> Close </span>
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

    <v-expand-transition>
      <v-row v-if="showAdvancedSetting" class="mt-0 pa-0 d-md-flex d-none">
        <v-col class="d-lg-block d-none"></v-col>
        <v-col cols="12" lg="7">
          <AdvancedSearch
            class="mt-n2"
            v-on:applyAdvancedSearch="onApplyAdvancedSearch"
          />
        </v-col>
      </v-row>
    </v-expand-transition>
  </v-form>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { mapGetters } from "vuex";
import Autocompletion from "@/components/Autocompletion.vue";
import AdvancedSearch from "@/components/AdvancedSearch.vue";
export default Vue.extend({
  components: { Autocompletion, AdvancedSearch },
  computed: mapGetters(["isAdvancedOptionsOn"]),
  props: {
    searchTerm: String,
    retrievalTime: Number,
    totalTime: Number,
    found: Number,
    searchHistory: Array as PropType<string[]>,
    isLoading: Boolean,
    showHint: Boolean,
    showAdvancedSearch: Boolean,
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
      }, 200);
    },
    onApplyAdvancedSearch() {
      this.showAdvancedSetting = false;
      this.$emit("applyAdvancedSearch", this.term);
    },
  },
  watch: {
    isLoading: {
      handler: function (newValue: boolean) {
        if (newValue) this.showAdvancedSetting = false;
      },
    },
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
.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
