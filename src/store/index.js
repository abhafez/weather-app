import Vue from 'vue';
import Vuex from 'vuex';
import Weather from './modules/Weather';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Weather,
  },
});
