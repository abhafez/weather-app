<template>
  <div>
    <div class="bg-teal-500 p-6">
      <input
        class="inline mr-3 bg-white focus:outline-none focus:shadow-outline border  rounded-lg py-2 px-4 appearance-none leading-normal"
        type="email"
        placeholder="Alexandria, EG"
        v-model="city"
        v-on:input="debounceCitySearch"
      />
      <Modal />
    </div>
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
        <div
          class="w-128 cursor-pointer flex flex-col justify-center items-center text-center p-6 bg-white"
        >
          <div class="text-md font-bold flex flex-col text-gray-900">
            <span class="uppercase">Today</span>
            <span v-if="currentCityData.sys && currentCityData.sys.country">
              {{ currentCityData.sys.country }}
            </span>
            <span class="font-normal text-gray-700 text-sm">
              {{ new Date() | moment('MMMM,  Do HH:mm A') }}
            </span>
          </div>
          <div class="w-32 h-32 flex items-center justify-center">
            <img :src="icon" />
          </div>
          <p class="text-gray-700 mb-2">Partly cloud</p>
          <div class="text-3xl font-bold text-gray-900 mb-6">
            {{ Math.floor(tempMin) + unit }}
            <span class="font-normal text-gray-700 mx-1">/</span>
            {{ Math.floor(tempMax) + unit }}
          </div>
          <div class="">
            <div class="flex items-center text-gray-700 px-2">
              <WindImage />
              {{ windSpeed }} <cite>km/h</cite>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
        <div
          class="w-128 cursor-pointer flex flex-col justify-center items-center text-center p-6 bg-white"
        >
          <Clock />
          <FavoriteCities />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import _ from 'lodash';
import FavoriteCities from '../components/FavoriteCities';
import Modal from '../components/Modal';
import Clock from '../components/Clock';
import WindImage from '../svgs/Wind';

export default {
  name: 'TempDisplay',
  data() {
    return {
      tempMin: 0,
      tempMax: 0,
      city: '',
      windSpeed: 0,
      userLat: 29.52,
      userLon: 31.34,
    };
  },
  components: {
    WindImage,
    FavoriteCities,
    Modal,
    Clock,
  },
  methods: {
    ...mapActions(['fetchWeather', 'setCity']),
    kelvinToCelsius: temp => Math.ceil(temp - 273.15),
    celsiusToFahrenhiet: cel => cel * 1.8 + 32.0,
    fahrenheitToCelsius: fahr => ((fahr - 32) * 5) / 9,
    getDefaultCoords: function() {
      this.fetchWeather({ lat: this.userLat, lon: this.userLon });
    },
    debounceCitySearch: _.debounce(function() {
      if (this.city.length) {
        this.fetchWeather({ city: this.city });
      } else {
        this.getDefaultCoords();
      }
    }, 500),
  },
  computed: {
    ...mapGetters(['currentCityData', 'isCelsius']),
    unit: function() {
      return this.isCelsius ? 'º' : 'F';
    },
    icon: function() {
      return this.currentCityData?.weather
        ? `https://openweathermap.org/img/wn/${this.currentCityData?.weather[0]?.icon}@2x.png`
        : '';
    },
  },
  watch: {
    currentCityData: function(cityData) {
      const tempMax = cityData?.main?.temp_max;
      const tempMin = cityData?.main?.temp_min;
      this.windSpeed = cityData?.wind?.speed;
      if (this.isCelsius) {
        this.tempMax = this.kelvinToCelsius(tempMax);
        this.tempMin = this.kelvinToCelsius(tempMin);
      } else {
        this.tempMax = this.celsiusToFahrenhiet(this.kelvinToCelsius(tempMax));
        this.tempMin = this.celsiusToFahrenhiet(this.kelvinToCelsius(tempMin));
      }
    },
    city: function(city) {
      this.setCity(city);
    },
    isCelsius: function(isCelsius) {
      if (!isCelsius) {
        this.tempMax = this.celsiusToFahrenhiet(this.tempMax);
        this.tempMin = this.celsiusToFahrenhiet(this.tempMin);
      } else {
        this.tempMax = this.fahrenheitToCelsius(this.tempMax);
        this.tempMin = this.fahrenheitToCelsius(this.tempMin);
      }
    },
  },
  created() {
    // Ask the user for permission to get his coords.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position?.coords;
        this.userLat = latitude;
        this.userLon = longitude;
        this.fetchWeather({ lon: longitude, lat: latitude });
      });
    } else {
      this.fetchWeather({ lat: this.userLat, lon: this.userLon });
    }
  },
};
</script>
