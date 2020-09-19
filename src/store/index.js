import Vue from 'vue';
import Vuex from 'vuex';
import Weather from './modules/Weather';
import VueTailwind from 'vue-tailwind';

Vue.use(Vuex);
Vue.use(require('vue-moment'));
Vue.use(VueTailwind);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Weather,
  },
});
