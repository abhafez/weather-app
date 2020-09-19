import axios from 'axios';
const baseUrl = 'https://api.openweathermap.org/data/2.5';

const state = {
  currentCityData: {},
  isCelsius: true,
};

const getters = {
  currentCityData: state => state.currentCityData,
  isCelsius: state => state.isCelsius,
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
  convertoToCelisus({ commit }) {
    commit('setCelsius', true);
  },
  convertoToFahr({ commit }) {
    commit('setCelsius', false);
  },
};

const mutations = {
  setCityTemp: (state, data) => (state.currentCityData = data),
  setCelsius: (state, isCelsius) => (state.isCelsius = isCelsius),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
