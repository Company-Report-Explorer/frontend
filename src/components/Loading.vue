<template>
  <div class="text-center">
    <v-overlay :value="isLoading" z-index="20001">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
export default Vue.extend({
  computed: mapGetters(["isLoading"]),
});
</script>
