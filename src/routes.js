import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './components/auth/Login';
import Products from './components/template/Index';
import Cart from './components/cart/List';
import Order from './components/cart/Order';
import E404 from './components/E404';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: { name: 'products' }, meta: { requiresAuth: true } },
        { path: '/products', name: 'products', component: Products, meta: { requiresAuth: true } },
        { path: '/cart', name: 'cart', component: Cart, meta: { requiresAuth: true } },
        { path: '/order', name: 'order', component: Order, meta: { requiresAuth: true } },
        { path: '/login', name: 'login', component: Login, meta: { notRequiresAuth: true } },
        { path: '*', name: 'e404', component: E404, meta: { requiresAuth: true } }
    ]
});

router.beforeEach((to, from, next) => {
    const accessToken = localStorage.getItem('access_token');

    if (to.matched.some(record => record.meta.requiresAuth )) {
        if (!accessToken) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.notRequiresAuth )) {
        if( accessToken && (to.path == '/login') ){
            next({
                path: '/',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;