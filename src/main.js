import Vue from 'vue';
import { store } from './store';
import router from './routes.js';
import App from './App.vue';

new Vue({
    router: router,
    el: '#app',
    store: store,
    render: h => h(App)
});