<script setup>
import DetailComponent from "../components/DetailComponent.vue";
import NavComponent from "../components/NavComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
</script>

<template>
  <NavComponent />
  <DetailComponent :detail="detail" :videos="videos" :casts="casts" :media="media" />
  <FooterComponent />
</template>

<script>
import axios from "axios";
export default {
  props: ["media", "id"],
  data() {
    return {
      detail: [],
      videos: [],
      casts: [],
      key: "87ef0d000bb1818cfb178b93bd60f415",
    };
  },
  methods: {
    // getApiResponse: function () {},
    getDetail: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/${this.media}/${this.id}?api_key=${this.key}&language=fr-FR`
        )
        .then((response) => {
          //   console.log(response.data);
          this.detail = response.data;
        });
    },
    getVideo: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/${this.media}/${this.id}/videos?api_key=${this.key}&language=fr-FR`
        )
        .then((Response) => {
          // console.log(Response.data);
          this.videos = Response.data.results;
        });
    },
    getCast: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/${this.media}/${this.id}/credits?api_key=${this.key}&language=fr-FR`
        )
        .then((Response) => {
          // console.log(Response.data);
          this.casts = Response.data.cast;
        });
    },
  },
  mounted() {
    this.getDetail();
    this.getVideo();
    this.getCast();
  },
};
</script>
