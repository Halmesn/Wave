import { createStore } from 'vuex';
import { auth, usersCollection, storage } from '@/global/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal: (state) => (state.authModalShow = !state.authModalShow),
    toggleAuth: (state) => (state.userLoggedIn = !state.userLoggedIn),
  },
  actions: {
    async register({ commit }, { email, password, name, age, country }) {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await usersCollection.doc(user.uid).set({ email, name, age, country });

      await user.updateProfile({
        displayName: name,
      });

      commit('toggleAuth');
    },

    async login({ commit }, { email, password }) {
      await auth.signInWithEmailAndPassword(email, password);

      commit('toggleAuth');
    },

    async signOut({ commit }) {
      await auth.signOut();

      commit('toggleAuth');
    },

    uploadSongs(ctx, file) {
      const storageRef = storage.ref(); // vue-wave-ea020.appspot.com
      const songsRef = storageRef.child(`songs/${file.name}`); // vue-wave-ea020.appspot.com/songs/file.name
      const task = songsRef.put(file);

      return task;
    },

    initLogin({ commit }) {
      const user = auth.currentUser;
      user && commit('toggleAuth');
    },
  },
});
