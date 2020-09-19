<template>
  <div class="mt-4">
    <p class="font-serif text-lg text-gray-800 text-center">
      Favorite cities
    </p>
    <ul class="list-none">
      <li v-for="city in favoriteList" :key="city">{{ city }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'FavoriteCities',
  computed: {
    ...mapGetters(['favoriteList']),
  },
};
</script>

<style></style>
