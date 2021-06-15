import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const Home = import('@/views/Home.vue');
const About = import('@/views/About.vue');
const Upload = import('@/views/Upload.vue');
const Song = import('@/views/Song.vue');

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  { name: 'about', path: '/about', component: About },
  {
    name: 'upload',
    path: '/upload',
    component: Upload,
    meta: {
      requireAuth: true,
    },
  },
  { name: 'song', path: '/song/:id', component: Song },
  { path: '/:catchAll(.*)*', redirect: { name: 'home' } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.requireAuth);

  if (!requireAuth) {
    next();
    return;
  }
  if (store.state.auth.userLoggedIn) next();
  else next({ name: 'home' });
});

export default router;
