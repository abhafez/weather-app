<template>
  <div>
    <input
      class="bg-white focus:outline-none focus:shadow-outline border  rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
      type="email"
      placeholder="Alexandria, EG"
      v-model="city"
      v-on:input="debounceCitySearch"
    />
    <div
      class="w-64 cursor-pointer border rounded flex flex-col justify-center items-center text-center p-6 bg-white"
    >
      <div class="text-md font-bold flex flex-col text-gray-900">
        <span class="uppercase">Today</span>
        <span class="font-normal text-gray-700 text-sm">July 29</span>
      </div>
      <div class="w-32 h-32 flex items-center justify-center">
        <!-- TODO: IMG HERE -->
      </div>
      <p class="text-gray-700 mb-2">Partly cloud</p>
      <div class="text-3xl font-bold text-gray-900 mb-6">
        {{ Math.floor(tempMin) }}
        {{ isCelsius ? 'º' : 'F' }}
        <span class="font-normal text-gray-700 mx-1">/</span>
        {{ Math.floor(tempMax) }}
        {{ isCelsius ? 'º' : 'F' }}
      </div>
      <div class="flex justify-between w-full">
        <div class="flex items-center text-gray-700 px-2">
          <WindImage />
          {{ windSpeed }} <cite>km/h</cite>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import _ from 'lodash';
import WindImage from '../svgs/Wind';

export default {
  name: 'TempDisplay',
  data() {
    return {
      tempMin: 0,
      tempMax: 0,
      windSpeed: 0,
      isCelsius: true,
      city: '',
      userLat: 29.52,
      userLon: 31.34,
    };
  },
  components: {
    WindImage,
  },
  methods: {
    ...mapActions(['fetchWeather']),
    kelvinToCelsius: temp => {
      return Math.ceil(temp - 273.15);
    },
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
  computed: { ...mapGetters(['currentCityData']) },
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
