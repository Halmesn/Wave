<template>
  <Introduction />
  <SongCollection />
</template>

<script>
  import Introduction from './Introduction.vue';
  import SongCollection from './SongCollection.vue';
  export default {
    name: 'HomeContent',
    components: { Introduction, SongCollection },
  };
</script>
