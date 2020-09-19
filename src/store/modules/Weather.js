import axios from 'axios';
const baseUrl = 'https://api.openweathermap.org/data/2.5';

const state = {
  currentCityData: {},
  isCelsius: true,
  city: 'Alexandria, EG',
  showModal: false,
  favoriteList: [],
};

const getters = {
  currentCityData: state => state.currentCityData,
  isCelsius: state => state.isCelsius,
  city: state => state.city,
  modal: state => state.showModal,
  favoriteList: state => state.favoriteList,
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
  setCity({ commit }, city) {
    commit('setCity', city);
  },
  convertoToFahr({ commit }) {
    commit('setCelsius', false);
  },
  addToFavoriteList({ commit }, city) {
    commit('addToFavoriteList', city);
  },
};

const mutations = {
  setCityTemp: (state, data) => (state.currentCityData = data),
  setCelsius: (state, isCelsius) => (state.isCelsius = isCelsius),
  setCity: (state, city) => (state.city = city),
  setShowModal: (state, modalState) => (state.showModal = modalState),
  addToFavoriteList: (state, city) =>
    (state.favoriteList = [...state.favoriteList, city]),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
