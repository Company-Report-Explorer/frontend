<template>
  <div>
    {{ text }}
    <span v-if="fullText.length > 200">
      <span
        class="font-weight-bold text-caption indigo--text"
        style="cursor: pointer"
        v-if="!showMore"
        @click="showMore = !showMore"
      >
        Show More
      </span>
      <span
        class="font-weight-bold text-caption indigo--text"
        style="cursor: pointer"
        v-else
        @click="showMore = !showMore"
      >
        Show Less
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => {
    return {
      showMore: false,
    };
  },
  props: {
    fullText: String,
  },
  computed: {
    text() {
      return this.showMore || String(this.fullText).length <= 200
        ? this.fullText
        : this.fullText.slice(0, 200) + "...";
    },
  },
});
</script>
