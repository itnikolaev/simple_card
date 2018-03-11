import Vue from 'vue';
import Vuex from 'vuex';

import Cart from './modules/Cart';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        baseUrl: 'http://localhost:8080',
        auth: {
            userId: '',
            accessToken: '',
            email: '',
            error: ''
        }
    },
    getters: {
        getBaseUrl(state){
            return state.baseUrl;
        },

        getAuthUserId(state){
            return state.auth.userId;
        },
        getAuthEmail(state){
            return state.auth.email;
        },
        getAuthAccessToken(state){
            return state.auth.accessToken;
        }
    },
    mutations: {

        setAuthData(state, playload){
            state.auth.userId = playload.userId;
            state.auth.accessToken = playload.accessToken;
            state.auth.email = playload.email;
        }
    },
    actions: {
        setAuthDataAction(store, playLoad){
            store.commit('setAuthData', playLoad);
        }
    },
    modules: {
        cart: Cart
    }
});