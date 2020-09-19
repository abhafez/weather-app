<template>
  <div class="home">
    <TempDisplay />
  </div>
</template>

<script>
// @ is an alias to /src
import TempDisplay from '@/components/TempDisplay.vue';
export default {
  name: 'Home',
  components: {
    TempDisplay,
  },
};
</script>
