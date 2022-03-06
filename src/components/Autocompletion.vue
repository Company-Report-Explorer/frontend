<template>
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
            <v-col @click="onSelectHistory(history)"> {{ history }} </v-col>
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
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    showAutocomplete: Boolean,
    searchItems: [],
  },
  methods: {
    onSelectHistory(history: string) {
      this.$emit("selectHistory", history);
    },
    onRemoveHistory(history: string) {
      this.$emit("removeHistory", history);
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
