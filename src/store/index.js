import Vue from 'vue';
import Vuex from 'vuex';
import Weather from './modules/Weather';

Vue.use(Vuex);
Vue.use(require('vue-moment'));

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Weather,
  },
});
