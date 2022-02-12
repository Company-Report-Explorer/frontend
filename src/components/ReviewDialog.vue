<template>
  <v-dialog v-model="dialog" scrollable>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="indigo"
        text
        dark
        v-bind="attrs"
        v-on="on"
        @click="$emit('fetch')"
      >
        Reviews
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5 font-weight-bold">
          Reviews of " {{ bookTitle }} "
        </span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text @scroll="onScroll">
        <v-card
          outlined
          shaped
          elevation="0"
          class="my-5"
          v-for="review in allReviews"
          :key="review.by"
        >
          <v-card-text class="text-h5 font-weight-bold">
            " {{ review.text }} "
          </v-card-text>
          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-content>
                <v-list-item-title>— {{ review.by }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-card-text>
      <!-- <v-card-actions>
        <v-btn color="green darken-1" text @click="dialog = false">
          Disagree
        </v-btn>
        <v-btn color="green darken-1" text @click="dialog = false">
          Agree
        </v-btn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: mapGetters(["allReviews"]),
  props: ["reviews", "bookTitle"],
  data: () => {
    return { dialog: false };
  },
  methods: {
    ...mapActions(["lazyLoadReviews"]),
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollHeight - scrollTop - clientHeight < 1) this.lazyLoadReviews("");
    },
  },
};
</script>
