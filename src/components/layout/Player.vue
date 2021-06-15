<template>
  <div
    class="
      fixed
      bottom-0
      left-0
      bg-white
      p-5
      pb-4
      text-left
      align-top
      w-full
      h-16
    "
  >
    <div class="relative">
      <!-- Play/Pause Button -->
      <div class="float-left w-7 h-7 leading-3">
        <button type="button" @click="togglePlay">
          <i
            class="fa text-gray-500 text-xl"
            :class="{
              'fa-play': !isPlaying,
              'fa-pause': isPlaying,
            }"
          ></i>
        </button>
      </div>
      <!-- Current Position -->
      <div
        class="float-left h-7 leading-3 text-gray-400 text-lg w-14 ml-5 mt-1"
      >
        <span class="player-currenttime">{{ seek }}</span>
      </div>
      <!-- Scrub -->
      <div class="float-left w-7 h-7 leading-3 ml-7 mt-2 player-scrub">
        <div
          class="
            absolute
            left-0
            right-0
            text-lg text-center
            mx-auto
            player-song-info
          "
          v-show="currentSong.modifiedName"
        >
          <span class="song-title">{{ currentSong.modifiedName }}</span>
          <span class="song-artist">
            (uploaded by {{ currentSong.displayName }})</span
          >
        </div>
        <!-- Scrub Container  -->
        <span
          class="
            block
            w-full
            h-2
            rounded
            m-1
            mt-2
            bg-gray-200
            relative
            cursor-pointer
          "
          @click="updateSeek"
        >
          <!-- Player Ball -->
          <span
            class="absolute top-neg-8 text-gray-800 text-lg"
            :style="{ left: playerProgress }"
          >
            <i class="fas fa-circle"></i>
          </span>
          <!-- Player Progress Bar-->
          <span
            class="
              block
              h-2
              rounded
              bg-gradient-to-r
              from-green-500
              to-green-400
            "
            :style="{ width: playerProgress }"
          ></span>
        </span>
      </div>
      <!-- Duration -->
      <div
        class="float-left h-7 leading-3 text-gray-400 text-lg w-14 ml-8 mt-1"
      >
        <span class="player-duration">{{ duration }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex';
  import { computed } from 'vue';

  export default {
    name: 'Player',
    setup() {
      const store = useStore();

      const isPlaying = computed(() => store.getters.isPlaying);
      const seek = computed(() => store.state.player.seek);
      const duration = computed(() => store.state.player.duration);
      const playerProgress = computed(() => store.state.player.playerProgress);
      const currentSong = computed(() => store.state.player.currentSong);

      const togglePlay = () => store.dispatch('togglePlay');
      const updateSeek = (event) => store.dispatch('updateSeek', event);

      return {
        isPlaying,
        togglePlay,
        seek,
        duration,
        playerProgress,
        currentSong,
        updateSeek,
      };
    },
  };
</script>

<style></style>
