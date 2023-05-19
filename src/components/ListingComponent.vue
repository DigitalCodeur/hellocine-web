<template>
  <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 md:mx-20">
    <div v-for="(list, index) in listing" :key="index" class="mx-auto my-5 w-220 zoom">
      <router-link
        :to="{ name: 'detail', params: { media: list.media_type, id: list.id } }"
      >
        <img
          :src="img_poster + list.poster_path"
          alt=""
          class="rounded-lg w-220 shadow-lg shadow-black"
        />
        <div
          class="absolute w-full opacity-0 rounded-b-xl h-72 top-4 bg-gradient-to-t from-black hover:opacity-100"
        >
          <div class="absolute w-full p-3 bottom-5">
            <p class="text-lg text-white font-title">{{ list.title }} {{ list.name }}</p>
            <div class="flex justify-between pt-2 pb-3">
              <p class="text-lg principal-color font-title">{{ list.media_type }}</p>
              <div class="flex">
                <img src="../assets/star.png" class="my-auto" alt="star" />
                <p class="ml-1 principal-color font-title">
                  {{ Math.round(list.vote_average * 100) / 100 }}
                </p>
              </div>
            </div>
            <p class="text-base text-white" v-if="!overviewNone">
              {{ list.overview.slice(0, 110) + "..." }}
            </p>
          </div>
        </div>
        <p class="p-2 text-lg">{{ list.title }} {{ list.name }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["listing", "overviewNone"],
  data() {
    return {
      img_poster: "https://www.themoviedb.org/t/p/w220_and_h330_face",
    };
  },
};
</script>
