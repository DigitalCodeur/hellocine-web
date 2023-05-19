<template>
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
      <swiper-slide v-for="list in listing" :key="list.id">
        <router-link
          :to="{
            name: 'detail',
            params: { media: list.media_type, id: list.id },
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
              <p class="text-2xl uppercase principal-color second-font">
                {{ list.media_type }}
              </p>
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
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default {
  props: ["listing"],
  components: {
    Swiper,
    SwiperSlide,
  },

  setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },

  data() {
    return {
      img_backdrop: "https://www.themoviedb.org/t/p/original",
    };
  },
};
</script>
