import helpers from '@/helpers';
import { Howl } from 'howler';

export default {
  state: {
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
  },
  mutations: {
    playSong: (state, payload) => {
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    updatePosition: (state) => {
      state.seek = helpers.formatTime(state.sound.seek());
      state.duration = helpers.formatTime(state.sound.duration());
      state.playerProgress = `${(state.sound.seek() / state.sound.duration()) *
        100}%`;
    },
  },
  getters: {
    isPlaying: (state) => {
      if (state.sound.playing) return state.sound.playing();

      return false;
    },
  },
  actions: {
    async playSong({ commit, state, dispatch }, payload) {
      if (state.sound instanceof Howl) state.sound.unload();
      commit('playSong', payload);
      state.sound.play();
      state.sound.on('play', () =>
        requestAnimationFrame(() => dispatch('progress'))
      );
    },

    async togglePlay({ state }) {
      if (!state.sound.playing) return;
      if (state.sound.playing()) state.sound.pause();
      else state.sound.play();
    },

    progress({ commit, state, dispatch }) {
      commit('updatePosition');
      if (state.sound.playing())
        requestAnimationFrame(() => dispatch('progress'));
    },

    updateSeek({ state, dispatch }, payload) {
      if (!state.sound.playing) return;

      const { x, width } = payload.currentTarget.getBoundingClientRect();
      const clickX = payload.clientX - x;
      const percentage = clickX / width;
      const seconds = state.sound.duration() * percentage;

      state.sound.seek(seconds);
      state.sound.once('seek', () => dispatch('progress'));
    },
  },
};
