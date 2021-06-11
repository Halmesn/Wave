<template>
  <Header />

  <Introduction />

  <Content />

  <Player />

  <Auth />
</template>

<script>
import Header from "./components/Header.vue";
import Introduction from "./components/Introduction.vue";
import Content from "./components/Content.vue";
import Player from "./components/Player.vue";
import Auth from "./components/Auth.vue";

export default {
  name: "App",
  components: {
    Header,
    Introduction,
    Content,
    Player,
    Auth,
  },
};
</script>
