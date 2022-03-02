<template>
  <v-footer dark padless>
    <v-card flat tile class="indigo lighten-2 white--text text-center flex">
      <v-card-text class="white--text">
        <div class="d-flex justify-center">
          BookSearch | Copyright © {{ new Date().getFullYear() }}
          <span class="d-lg-block d-none font-weight-bold">
            —
            <a
              class="pointer"
              target="_blank"
              href="https://www.inf.ed.ac.uk/teaching/courses/tts/"
            >
              Text Technologies For Data Science - Group Project
            </a>
            |
            <a
              class="pointer"
              target="_blank"
              href="https://github.com/orgs/NovelNovels/repositories"
            >
              <v-icon dense>mdi-github</v-icon> GitHub
            </a>
          </span>
        </div>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<style>
.pointer {
  cursor: pointer;
}
a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
  color: inherit !important;
}
</style>
