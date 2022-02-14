<template>
  <v-app style="background: #eceff1">
    <ErrorPrompt />
    <v-container style="min-height: 94.6vh">
      <router-view />
    </v-container>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import ErrorPrompt from "@/components/ErrorPrompt.vue";
import Footer from "@/components/Footer.vue";
export default Vue.extend({
  components: { Footer, ErrorPrompt },
});
</script>
