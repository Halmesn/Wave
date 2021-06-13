<template>
  <Header />

  <router-view></router-view>

  <Player />

  <AuthModal />
</template>

<script>
  import Header from './components/layout/Header.vue';
  import Player from './components/layout/Player.vue';
  import AuthModal from './components/authModal/AuthModal.vue';

  export default {
    name: 'App',
    components: {
      Header,
      Player,
      AuthModal,
    },
  };
</script>
