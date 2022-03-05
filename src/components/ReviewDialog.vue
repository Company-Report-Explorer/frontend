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
        Reviews ({{ "99+" }})
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <span class="text-h5 font-weight-bold">
          Reviews of
          <span class="font-italic">
            {{ bookTitle }}
          </span>
        </span>
        <v-icon
          class="pointer text-bold mb-1 text-h5"
          @click="dialog = false"
          dense
        >
          mdi-close
        </v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text @scroll="onScroll">
        <v-card
          outlined
          shaped
          elevation="0"
          class="my-5"
          v-for="review in allReviews"
          :key="review.id"
        >
          <v-card-text class="text-md-h6 text-body-1 font-weight-bold">
            " {{ review.text }} "
          </v-card-text>
          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-content>
                <v-list-item-title
                  class="d-md-flex justify-end text-body-2"
                  style="gap: 1rem"
                >
                  <div>
                    <v-icon class="pb-1" dense>mdi-thumb-up</v-icon> Likes:
                    {{ review.likes }}
                  </div>

                  <div>
                    <v-icon class="pb-1" dense>mdi-star</v-icon>
                    Rating: {{ review.rating }}
                  </div>

                  <div>
                    <v-icon class="pb-1" dense>mdi-comment</v-icon>
                    Comments: {{ review.comments }}
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card-actions>
        </v-card>
        <div v-if="!isAllReviews" class="d-flex justify-center text-h6 pa-3">
          Loading...
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
export default Vue.extend({
  props: {
    reviews: [],
    bookTitle: String,
    bookId: String,
    query: String,
  },
  computed: mapGetters(["allReviews", "isAllReviews"]),
  data: () => {
    return { dialog: false, offset: 0 };
  },
  methods: {
    ...mapActions(["lazyLoadReviews", "clearReviews"]),
    onScroll(e: Event) {
      if (!this.dialog) return;
      const target = e.target as Element;
      const size = 10;
      const { scrollHeight, scrollTop, clientHeight } = target;
      if (
        scrollHeight - scrollTop - clientHeight < 1 &&
        scrollHeight > 20 &&
        !this.isAllReviews
      )
        this.lazyLoadReviews({
          bookId: this.bookId,
          offset: ++this.offset * size,
          query: this.query,
        });
    },
  },
  watch: {
    dialog: function (newValue) {
      if (!newValue) this.clearReviews();
    },
  },
});
</script>
