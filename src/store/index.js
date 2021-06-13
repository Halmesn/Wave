import { createStore } from 'vuex';
import { auth, usersCollection } from '@/global/firebase';

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

    initLogin({ commit }) {
      const user = auth.currentUser;
      user && commit('toggleAuth');
    },
  },
});
