import VueRouter from 'vue-router'
import FilmCard from "@/components/FilmCard";
import NotFound from "@/components/NotFound";
import MainPage from "@/components/MainPage";

export default  new VueRouter ({
  routes: [
    {
      path: '/',
      component: MainPage,
      name: 'main'
    },
    {
      path: '/film/:id',
      component: FilmCard,
      name: 'FilmCard'
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})