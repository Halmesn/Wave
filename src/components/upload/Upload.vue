<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="
          w-full
          px-10
          py-20
          rounded
          text-center
          cursor-pointer
          border border-dashed border-gray-400
          text-gray-400
          transition
          duration-500
          hover:text-white
          hover:bg-green-400
          hover:border-green-400 hover:border-solid
        "
        :class="{ 'bg-green-400 border-green-400 border-solid': isDragOver }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="isDragOver = false"
        @dragover.prevent.stop="isDragOver = true"
        @dragenter.prevent.stop="isDragOver = true"
        @dragleave.prevent.stop="isDragOver = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.textColor">
          <i :class="upload.icon"></i> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :style="{ width: upload.currentProgress + '%' }"
            :class="upload.variant"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import { storage, auth, songsCollection } from '@/global/firebase';

  export default {
    name: 'Upload',
    setup() {
      const isDragOver = ref(false);
      const uploads = ref([]);

      const upload = ($event) => {
        isDragOver.value = false;
        const files = [...$event.dataTransfer.files];

        files.forEach((file) => {
          if (file.type !== 'audio/mpeg') return;

          const storageRef = storage.ref(); // vue-wave-ea020.appspot.com
          const songsRef = storageRef.child(`songs/${file.name}`); // vue-wave-ea020.appspot.com/songs/file.name
          const task = songsRef.put(file);

          const uploadIndex =
            uploads.value.push({
              task,
              currentProgress: 0,
              name: file.name,
              variant: 'bg-blue-400',
              icon: 'fas fa-spinner fa-spin',
              textColor: '',
            }) - 1;

          const onTaskChange = ({ bytesTransferred, totalBytes }) => {
            const progress = (bytesTransferred / totalBytes) * 100;

            uploads.value[uploadIndex].currentProgress = progress;
          };

          const onTaskSuccess = async () => {
            const song = {
              uid: auth.currentUser.uid,
              displayName: auth.currentUser.displayName,
              originalName: task.snapshot.ref.name,
              modifiedName: task.snapshot.ref.name,
              genre: '',
              commentCount: 0,
            };

            song.url = await task.snapshot.ref.getDownloadURL();
            await songsCollection.add(song);

            uploads.value[uploadIndex].variant = 'bg-green-400';
            uploads.value[uploadIndex].icon = 'fas fa-check';
            uploads.value[uploadIndex].textColor = 'text-green-400';
          };
          const onTaskFail = (error) => {
            uploads.value[uploadIndex].variant = 'bg-red-400';
            uploads.value[uploadIndex].icon = 'fas fa-times';
            uploads.value[uploadIndex].textColor = 'text-red-400';
          };

          task.on('state_changed', onTaskChange, onTaskFail, onTaskSuccess);
        });
      };

      return {
        isDragOver,
        upload,
        uploads,
      };
    },
  };
</script>
