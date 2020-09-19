<template>
  <clock :time="time"></clock>
</template>

<script>
import Clock from 'vue-clock2';
export default {
  components: { Clock },
  data() {
    return {
      time: '10:40:00',
    };
  },
};
</script>
