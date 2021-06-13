<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <Upload :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <SongDetail
              v-for="(song, i) in songs"
              :key="song.docId"
              :song="song"
              :updateSong="updateSong"
              :removeSong="removeSong"
              :index="i"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Upload from './Upload.vue';
  import SongDetail from './SongDetail.vue';
  import { ref } from 'vue';
  import { auth, songsCollection } from '@/global/firebase';

  export default {
    name: 'UploadContent',
    components: { Upload, SongDetail },
    setup() {
      const songs = ref([]);

      const addSong = (doc) => {
        const song = { ...doc.data(), docId: doc.id };
        songs.value.push(song);
      };

      const updateSong = (i, values) => {
        songs.value[i].modifiedName = values.modifiedName;
        songs.value[i].genre = values.genre;
      };

      const removeSong = (i) => songs.value.splice(i, 1);

      (async () => {
        const snapshot = await songsCollection
          .where('uid', '==', auth.currentUser.uid)
          .get();

        snapshot.forEach(addSong);
      })();

      return {
        songs,
        updateSong,
        removeSong,
        addSong,
      };
    },
  };
</script>
