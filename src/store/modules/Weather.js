import axios from 'axios';
const baseUrl = 'https://api.openweathermap.org/data/2.5';

const state = {
  currentCityTemp: 'hello',
};

const getters = {
  currentCityTemp: state => state.currentCityTemp,
};

const actions = {
  async fetchWeather({ commit }, payload) {
    const { city, lon, lat } = payload;
    const response = await axios.get(`${baseUrl}/weather`, {
      params: {
        q: city || null,
        appid: '641d47bc20e1dabe6a69d811be1a11af',
        lon: lon || null,
        lat: lat || null,
      },
    });
    commit('setCityTemp', response.data);
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
