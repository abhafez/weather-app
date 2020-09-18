import axios from 'axios';
const baseUrl = 'https://api.openweathermap.org/data/2.5';

const state = {
  currentCityData: {},
};

const getters = {
  currentCityData: state => state.currentCityData,
};

const actions = {
  async fetchWeather({ commit }, payload) {
    const { city, lon, lat } = payload;
    const response = await axios.get(`${baseUrl}/weather`, {
      params: {
        q: city,
        appid: '641d47bc20e1dabe6a69d811be1a11af',
        lon: lon,
        lat: lat,
      },
    });
    commit('setCityTemp', response.data);
  },
};

const mutations = {
  setCityTemp: (state, data) => (state.currentCityData = data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
