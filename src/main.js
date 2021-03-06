import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate from '@/global/VeeValidate';
import { auth } from '@/global/firebase';
import './assets/tailwind.css';
import './assets/main.css';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(store);
    app.use(router);
    app.use(VeeValidate);

    app.mount('#app');
  }
});
