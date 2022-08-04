import VueRouter from 'vue-router'
import NotFound from "@/components/NotFound";
import MainPage from "@/components/MainPage";
import FilmPage from "@/components/FilmPage";
export default  new VueRouter ({
  routes: [
    {
      path: '/',
      component: MainPage,
      name: 'main'
    },
    {
      path: '/film/:id',
      component: FilmPage,
      name: 'FilmPage'
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})