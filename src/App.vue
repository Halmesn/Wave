<template>
  <Header />

  <router-view></router-view>

  <Player />

  <Auth />
</template>

<script>
  import Header from './components/Header.vue';
  import Player from './components/Player.vue';
  import Auth from './components/authModal/Auth.vue';

  export default {
    name: 'App',
    components: {
      Header,
      Player,
      Auth,
    },
  };
</script>
