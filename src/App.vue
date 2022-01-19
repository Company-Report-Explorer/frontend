<template>
  <v-app style="background: #eceff1">
    <v-container style="min-height: 93.6vh">
      <router-view />
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  components: { Footer },
};
</script>
