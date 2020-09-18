<template>
  <div class="hello">
    <h1>{{ currentCityTemp }}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TempDisplay',
  props: {
    msg: String,
  },
  computed: mapGetters(['currentCityTemp']),
};
</script>
