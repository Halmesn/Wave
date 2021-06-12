import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate from './plugins/VeeValidate';
import './assets/tailwind.css';
import './assets/main.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VeeValidate);

app.mount('#app');
