<script setup>
import ListingComponent from "../components/ListingComponent.vue";
import NavComponent from "../components/NavComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
</script>

<template>
  <NavComponent />
  <main>
    <h1 class="py-10 text-xl text-center md:p-20 font-title md:text-3xl">
      Résultats de la recherche: <span class="principal-color">{{ this.search }}</span>
    </h1>
    <ListingComponent :listing="listing" :overviewNone="overviewNone" />
    <div class="flex items-center justify-center my-10">
      <v-pagination
        v-model="page"
        :pages="totalPage"
        :range-size="2"
        active-color="#ffc700"
        @update:modelValue="updateHandler"
      />
    </div>
  </main>
  <FooterComponent />
</template>

<script>
import axios from "axios";

import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  props: ["search"],
  data() {
    return {
      listing: [],
      overviewNone: true,
      page: 1,
      totalPage: 1,
      key: "87ef0d000bb1818cfb178b93bd60f415",
    };
  },

  methods: {
    searchMovie: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=${this.key}&query=${this.search}&language=fr-FR&page=${this.page}`
        )
        .then((response) => {
          //   console.log(Response.data);
          if (response.data.total_pages > 100) {
            this.totalPage = 100;
          } else {
            this.totalPage = response.data.total_pages;
          }
          this.listing = response.data.results;
        });
    },
    updateHandler: function () {
      // console.log(this.page);
      this.searchMovie();
    },
  },

  mounted() {
    this.updateHandler();
  },
  components: { VPagination },
};
</script>
