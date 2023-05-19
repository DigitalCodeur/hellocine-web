import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailView from "../views/DetailView.vue";
import SearchView from "../views/SearchView.vue";
import UpcomingView from '../views/UpcomingView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/genre/:genre",
      name: "genre",
      props: true,
      component: HomeView,
    },
    {
      path: "/upcoming",
      name: "upcoming",
      component: UpcomingView,
    },
    {
      path: "/detail/:media/:id",
      name: "detail",
      props: true,
      component: DetailView,
    },
    {
      path: "/search/:search",
      name: "search",
      props: true,
      component: SearchView,
    },
  ],
});

export default router;
