<template>
  <div class="py-2 bg-black shadow-lg shadow-black/50">
    <div class="justify-between md:mx-20 lg:flex">
      <div class="my-auto w-full lg:w-2/12 flex justify-between">
        <router-link to="/" class="my-auto text-2xl font-title hover:principal-color"
          >HelloCiné</router-link
        >
        <div class="block lg:hidden">
          <button
            @click="menuVisible = !menuVisible"
            class="flex items-center px-3 py-2 mx-3 text-white border border-white rounded"
            id="click-menu"
          >
            <svg
              class="w-3 h-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>
      <div class="w-full lg:flex" :class="{ hidden: menuVisible === false }">
        <nav class="lg:flex justify-between w-full lg:w-6/12">
          <ul class="lg:flex justify-between w-full mx-auto my-auto lg:w-6/12">
            <li>
              <router-link
                :to="{ name: 'genre', params: { genre: 'movie' } }"
                class="text-xl font-title hover:principal-color"
                >Films</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'genre', params: { genre: 'tv' } }"
                class="text-xl font-title hover:principal-color"
                >Séries</router-link
              >
            </li>
            <li>
              <router-link to="/upcoming" class="text-xl font-title hover:principal-color"
                >Á venir</router-link
              >
            </li>
          </ul>
        </nav>
        <form
          v-on:submit="searchMovie"
          method="get"
          class="flex w-full py-2 my-4 ml-auto rounded-md bg-blue-950/50 lg:my-0 lg:w-4/12"
        >
          <input
            type="search"
            v-model="search"
            autocomplete="off"
            id="search"
            class="w-full px-2 text-lg text-white bg-blue-950/50 focus:outline-none sm:py-0"
            placeholder="Recherche..."
          />
          <button type="submit" title="Recherche" class="px-2">
            <img src="../assets/loupe.png" class="w-6" alt="Recherche" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuVisible: false,
      search: "",
    };
  },
  methods: {
    searchMovie: function () {
      this.$router.push({ name: "search", params: { search: this.search } });
    },
  },
};
</script>
