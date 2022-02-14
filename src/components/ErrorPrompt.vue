<template>
  <div class="text-center">
    <v-dialog v-model="isErrorShown" width="500" persistent>
      <v-card>
        <v-card-title class="text-h5 red lighten-2 white--text">
          Error Found
        </v-card-title>

        <v-card-text class="pt-5"> {{ errorDetail }} </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="clearError()"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default Vue.extend({
  computed: mapGetters(["isErrorShown", "errorDetail"]),
  methods: {
    ...mapActions(["clearError"]),
  },
});
</script>
