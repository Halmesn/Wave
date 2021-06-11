import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Form as VeeForm, Field as VeeField } from 'vee-validate';
import './assets/tailwind.css';
import './assets/main.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.component('VeeForm', VeeForm);
app.component('VeeField', VeeField);

app.mount('#app');
