<script setup>
import NavComponent from "../components/NavComponent.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import ListingComponent from "../components/ListingComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
</script>

<template>
  <NavComponent />
  <HeaderComponent :listing="listing" />
  <div class="md:mx-20">
    <h2 class="p-10 text-2xl text-center font-title md:text-4xl">
      Tendances <span v-if="time_window == 'week'"> de la semaine</span>
      <span v-else>du Jour</span>
    </h2>
    <div class="flex justify-between mb-10 text-xl md:justify-start">
      <button
        class="pt-2 mx-5 principal-border hover:principal-color"
        :class="{ 'border-b-4': time_window == 'day' }"
        @click="timeWindowDay"
      >
        Aujourd'hui
      </button>
      <button
        class="pt-2 mx-5 principal-border hover:principal-color"
        :class="{ 'border-b-4': time_window == 'week' }"
        @click="timeWindowWeek"
      >
        Cette Semaine
      </button>
    </div>
  </div>
  <ListingComponent :listing="listing" />

  <div class="flex items-center justify-center my-10">
    <v-pagination
      v-model="page"
      :pages="totalPage"
      :range-size="2"
      active-color="#ffc700"
      @update:modelValue="updateHandler"
    />
  </div>

  <FooterComponent />
</template>

<script>
import axios from "axios";

import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  props: ["genre"],
  data() {
    return {
      time_window: "",
      page: 1,
      totalPage: 1,
      listing: [],
      key: "87ef0d000bb1818cfb178b93bd60f415",
    };
  },
  methods: {
    // getApiResponse: function () {},
    getTendance: function () {
      if (this.genre == "tv") {
        axios
          .get(
            `https://api.themoviedb.org/3/trending/${this.genre}/${this.time_window}?api_key=${this.key}&language=fr-FR&page=${this.page}`
          )
          .then((response) => {
            // console.log(response.data);
            if (response.data.total_pages > 100) {
              this.totalPage = 100;
            } else {
              this.totalPage = response.data.total_pages;
            }
            this.listing = response.data.results;
          });
      } else if (this.genre == "movie") {
        axios
          .get(
            `https://api.themoviedb.org/3/trending/${this.genre}/${this.time_window}?api_key=${this.key}&language=fr-FR&page=${this.page}`
          )
          .then((response) => {
            // console.log(response.data);
            if (response.data.total_pages > 100) {
              this.totalPage = 100;
            } else {
              this.totalPage = response.data.total_pages;
            }
            this.listing = response.data.results;
          });
      } else {
        axios
          .get(
            `https://api.themoviedb.org/3/trending/all/${this.time_window}?api_key=${this.key}&language=fr-FR&page=${this.page}`
          )
          .then((response) => {
            // console.log(response.data);
            if (response.data.total_pages > 100) {
              this.totalPage = 100;
            } else {
              this.totalPage = response.data.total_pages;
            }

            this.listing = response.data.results;
          });
      }
    },
    timeWindowDay: function () {
      this.time_window = "day";
      this.getTendance();
    },
    timeWindowWeek: function () {
      this.time_window = "week";
      this.getTendance();
    },

    updateHandler: function () {
      // console.log(this.page);
      this.getTendance();
    },
  },
  updated() {
    this.time_window = "day";
    this.updateHandler();
  },
  mounted() {
    this.time_window = "day";
    this.getTendance();
  },
  components: { HeaderComponent, VPagination },
};
</script>
