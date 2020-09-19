<template>
  <div class="inline">
    <t-modal header="Title of the modal" v-model="showModal">
      <div v-if="isListed">{{ city }} is in your favorite list</div>
      <div v-else>
        Are you sure you want to add {{ city }} to your favorite list ?
      </div>
      <template v-slot:footer>
        <div class="flex justify-between">
          <t-button type="button">
            Cancel
          </t-button>
          <t-button
            v-if="!isListed"
            type="button"
            @click="addCityAndCloseModal"
          >
            Ok
          </t-button>
        </div>
      </template>
    </t-modal>

    <button
      class="inline text-sm px-4 py-2 leading-none border rounded text-green-900 border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
      type="button"
      @click="showModal = true"
    >
      Add to favorite
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    ...mapActions(['addToFavoriteList']),
    addCityAndCloseModal: function() {
      this.addToFavoriteList(this.city);
      this.showModal = false;
    },
  },
  computed: {
    ...mapGetters(['city', 'favoriteList']),
    isListed: function() {
      return this.favoriteList
        .map(city => city.toLowerCase())
        .includes(this.city.toLowerCase());
    },
  },
};
</script>
