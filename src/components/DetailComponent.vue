<template>
  <div>
    <img
      :src="img_backdrop + detail.backdrop_path"
      class="w-full img-backdro md:h-screen object-cover"
      alt=""
    />
    <section class="py-10 md:absolute top-0 bg-black/70 md:h-screen">
      <div class="grid-cols-3 md:grid xl:mx-20 mx-5">
        <div>
          <img :src="img_poster + detail.poster_path" alt="" class="rounded-lg" />
        </div>
        <div class="col-span-2 mx-10 xl:mx-0">
          <h1 class="principal-color text-3xl second-font">
            {{ detail.title }} {{ detail.name }}
          </h1>
          <p class="text-lg italic my-3 second-font text-white">{{ date_format }}</p>
          <div class="flex flex-wrap">
            <div v-for="(genre, index) in detail.genres" :key="index">
              <div
                class="second-font border-2 principal-border mr-3 principal-color px-2 py-1 rounded-lg"
              >
                {{ genre.name }}
              </div>
            </div>
          </div>
          <p class="text-lg second-font my-3 text-white" v-if="runtime != ''">
            Durée : {{ runtime }}
          </p>
          <p class="principal-color text-xl second-font my-3">{{ media }}</p>
          <div class="flex">
            <img src="../assets/star.png" class="my-auto" alt="star" />
            <p class="principal-color second-font text-lg ml-3">
              {{ detail.vote_average }}
            </p>
          </div>
          <div v-if="detail.number_of_seasons && detail.number_of_episodes">
            <p class="text-xl second-font my-2 text-white">
              Nombre de saisons :
              <span class="principal-color">{{ detail.number_of_seasons }}</span>
            </p>
            <p class="text-xl second-font my-2 text-white">
              Nombre d'épisodes :
              <span class="principal-color">{{ detail.number_of_episodes }}</span>
            </p>
          </div>
          <p class="text-lg italic text-gray-400 my-2 second-font">
            {{ detail.tagline }}
          </p>
          <p class="principal-color text-2xl font-title my-2">Synopsis</p>
          <p class="text-lg text-justify text-white">{{ detail.overview }}</p>
        </div>
      </div>
    </section>
  </div>
  <section class="py-20 bg-black/30 xl:px-20" v-show="videos.length != 0">
    <h2 class="text-4xl mb-20 text-center font-title">Bande annonce</h2>
    <swiper
      :style="{
        '--swiper-navigation-color': '#fff',
      }"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(video, index) in videos" :key="index">
        <iframe
          class="mx-auto shadow-lg shadow-black rounded-lg video md:video-md lg:video-lg"
          title="YouTube video player"
          frameborder="0"
          allowfullscreen="1"
          :src="video_url + video.key"
        >
        </iframe>
      </swiper-slide>
    </swiper>
  </section>

  <section class="mx-20">
    <h2 class="my-20 text-4xl text-center font-title">Têtes d'affiche</h2>

    <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">
      <div
        class="w-56 mx-auto my-5"
        v-for="cast in casts"
        :key="cast.id"
        v-show="cast.profile_path"
      >
        <img
          :src="img_poster + cast.profile_path"
          class="w-56 h-80 shadow-lg shadow-black rounded-lg"
          alt=""
        />

        <div
          class="absolute top-0 w-full h-full p-2 opacity-0 rounded-xl hover:opacity-100"
        >
          <div class="p-1 rounded bg-black/70 top-44">
            <p class="text-xl second-font text-white">{{ cast.name }}</p>
            <p class="text-xl font-title principal-color">{{ cast.character }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
export default {
  props: ["detail", "videos", "casts", "media"],
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Navigation],
      img_backdrop: "https://www.themoviedb.org/t/p/original",
      img_poster: "https://www.themoviedb.org/t/p/w342",
      video_url: "https://www.youtube.com/embed/",
      date_format: "",
      runtime: "",
    };
  },

  methods: {
    formatdate(detailDate) {
      if (detailDate) {
        const date = new Date(detailDate);
        const options = { year: "numeric", month: "long", day: "numeric" };
        this.date_format = date.toLocaleDateString("fr-FR", options);
      }
      if (this.detail.runtime) {
        const duration = this.detail.runtime;
        const hours = duration / 60;
        const minutes = duration % 60;
        this.runtime = `${hours.toFixed(0)}h ${minutes} m`;
      }
    },
  },

  updated() {
    this.formatdate(this.detail.release_date);
    this.formatdate(this.detail.last_air_date);
  },
};
</script>
