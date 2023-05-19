<script setup>
import NavComponent from "../components/NavComponent.vue";
// import HeaderComponent from "../components/HeaderComponent.vue";
// import ListingComponent from "../components/ListingComponent.vue";
</script>

<template>
  <NavComponent />
  <header>
    <swiper
      :spaceBetween="30"
      :centeredSlides="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :navigation="false"
      :style="{
        '--swiper-pagination-color': '#ffc700',
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide
        v-for="list in listing"
        :key="list.id"
        v-show="new Date(list.release_date) > new Date()"
      >
        <router-link
          :to="{
            name: 'detail',
            params: { media: 'movie', id: list.id },
          }"
        >
          <div>
            <img
              :src="img_backdrop + list.backdrop_path"
              class="w-full lg:img-backdrop"
              alt=""
            />
          </div>
          <div
            class="absolute w-5/6 p-5 opacity-0 bg-black/50 md:opacity-100 lg:w-3/5 md:mx-20 rounded-xl bottom-14"
          >
            <p class="text-4xl text-white font-title">{{ list.title }} {{ list.name }}</p>
            <div class="flex my-5">
              <p class="text-2xl uppercase principal-color second-font">movie</p>
              <div class="flex ml-10">
                <img src="../assets/star.png" class="my-auto" alt="star" />
                <p class="ml-1 text-xl principal-color font-title">
                  {{ list.vote_average.toFixed(1) }}
                </p>
              </div>
            </div>
            <p class="hidden text-xl text-justify text-white lg:block">
              {{ list.overview.slice(0, 300) + "..." }}
            </p>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
  </header>
  <h2 class="p-10 text-2xl text-center font-title md:text-4xl">Films à venir</h2>
  <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 md:mx-20">
    <div
      v-for="(list, index) in listing"
      :key="index"
      class="mx-auto my-5 w-220 zoom"
      v-show="new Date(list.release_date) > new Date()"
    >
      <router-link :to="{ name: 'detail', params: { media: 'movie', id: list.id } }">
        <img
          :src="img_poster + list.poster_path"
          alt=""
          class="rounded-lg shadow-lg shadow-black"
        />
        <div
          class="absolute w-full opacity-0 rounded-b-xl h-80 top-4 bg-gradient-to-t from-black hover:opacity-100"
        >
          <div class="absolute w-full p-3 bottom-5">
            <p class="text-lg text-white font-title">{{ list.title }} {{ list.name }}</p>
            <div class="flex justify-between pt-2 pb-3">
              <p class="text-lg principal-color font-title">movie</p>
              <div class="flex">
                <img src="../assets/star.png" class="my-auto" alt="star" />
                <p class="ml-1 principal-color font-title">
                  {{ list.vote_average.toFixed(1) }}
                </p>
              </div>
            </div>
            <p class="text-base text-white">
              {{ list.overview.slice(0, 150) + "..." }}
            </p>
          </div>
        </div>
        <p class="p-2 text-lg">{{ list.title }} {{ list.name }}</p>
      </router-link>
    </div>
  </div>

  <div class="flex items-center justify-center my-10">
    <v-pagination
      v-model="page"
      :pages="totalPage"
      :range-size="2"
      active-color="#ffc700"
      @update:modelValue="updateHandler"
    />
  </div>
</template>

<script>
import axios from "axios";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  data() {
    return {
      totalPage: 1,
      page: 1,
      listing: [],
      modules: [Autoplay, Pagination, Navigation],
      key: "87ef0d000bb1818cfb178b93bd60f415",
      img_backdrop: "https://www.themoviedb.org/t/p/original",
      img_poster: "https://www.themoviedb.org/t/p/w220_and_h330_face",
    };
  },
  methods: {
    // getApiResponse: function () {},
    getTendance: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.key}&language=fr-FR&page=${this.page}`
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
    },

    updateHandler: function () {
      // console.log(this.page);
      this.getTendance();
    },
  },
  mounted() {
    this.getTendance();
  },
  components: { Swiper, SwiperSlide, VPagination },
};
</script>
