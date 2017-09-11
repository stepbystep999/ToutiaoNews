import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.config.debug = true;

Vue.use(VueResource);
Vue.use(VueRouter);

import App from './App.vue'
//import newshot from './components/router/newshot.vue'

// const routes = [
//     {
//         path: '/',
//         component: App
//     },
//     {
//         path: '/newshot',
//         component: newshot
//     },

// ]

// const router = new VueRouter({
//     mode: 'history',
//     base: __dirname,
//     routes: routes
// })

new Vue({
    //router: router,
    el: '#app',
    render: h => h(App)
})
