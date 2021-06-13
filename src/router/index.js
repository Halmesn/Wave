import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Upload from '@/views/Upload.vue';
import store from '@/store';

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
  if (store.state.userLoggedIn) next();
  else next({ name: 'home' });
});

export default router;
