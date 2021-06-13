<template>
  <Introduction />

  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Songs</span>
        <!-- Icon -->
        <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
      </div>
      <ol id="playlist">
        <SongItem v-for="song in songs" :key="song.docId" :song="song" />
      </ol>
    </div>
  </section>
</template>

<script>
  import Introduction from './Introduction.vue';
  import SongItem from './SongItem.vue';
  import { songsCollection } from '@/global/firebase';

  import { ref, onBeforeUnmount } from 'vue';

  export default {
    name: 'HomeContent',
    components: { Introduction, SongItem },
    setup() {
      const songs = ref([]);
      const maxPerPage = 5;
      let pending = false;

      // infinite scroll with firebase
      const getSongs = async () => {
        if (pending) return;

        pending = true;

        let snapshots;
        if (songs.value.length) {
          const lastSong = await songsCollection
            .doc(songs.value[songs.value.length - 1].docId)
            .get();
          snapshots = await songsCollection
            .orderBy('modifiedName')
            .startAfter(lastSong)
            .limit(maxPerPage)
            .get();
        } else {
          snapshots = await songsCollection
            .orderBy('modifiedName')
            .limit(maxPerPage)
            .get();
        }

        snapshots.forEach((doc) => {
          songs.value.push({ docId: doc.id, ...doc.data() });
        });

        pending = false;
      };

      getSongs();

      const onWindowScroll = () => {
        const { scrollTop, offsetHeight } = document.documentElement;
        const { innerHeight } = window;

        const isBottom = Math.round(scrollTop) + innerHeight === offsetHeight;

        isBottom && getSongs();
      };

      window.addEventListener('scroll', onWindowScroll);

      onBeforeUnmount(() =>
        window.removeEventListener('scroll', onWindowScroll)
      );

      return { songs };
    },
  };
</script>
