<template
  ><div class="border border-gray-200 p-3 mb-4 rounded">
    <div>
      <h4 class="inline-block text-2xl font-bold">{{ song.modifiedName }}</h4>
      <button
        class="
                    ml-1
                    py-1
                    px-2
                    text-sm
                    rounded
                    text-white
                    bg-red-600
                    float-right
                  "
        @click="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="
                    ml-1
                    py-1
                    px-2
                    text-sm
                    rounded
                    text-white
                    bg-blue-600
                    float-right
                  "
        @click="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        class="text-white text-center font-bold p-4 mb-2 mt-2"
        v-if="showAlert"
        :class="alertVariant"
      >
        {{ alertMsg }}
      </div>

      <VeeForm
        :validation-schema="schema"
        @submit="editSong"
        :initial-values="song"
      >
        <div class="mb-3">
          <label class="inline-block mb-2 mt-2">Song Title</label>
          <VeeField
            name="modifiedName"
            type="text"
            class="
                        block
                        w-full
                        py-1.5
                        px-3
                        text-gray-800
                        border border-gray-300
                        transition
                        duration-500
                        focus:outline-none
                        focus:border-black
                        rounded
                      "
            placeholder="Enter Song Title"
          />
          <ErrorMessage class="text-red-600" name="modifiedName" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <VeeField
            name="genre"
            type="text"
            class="
                        block
                        w-full
                        py-1.5
                        px-3
                        text-gray-800
                        border border-gray-300
                        transition
                        duration-500
                        focus:outline-none
                        focus:border-black
                        rounded
                      "
            placeholder="Enter Genre"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600 mr-1"
          :disabled="inSubmission"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="inSubmission"
          @click="showForm = false"
        >
          Go Back
        </button>
      </VeeForm>
    </div>
  </div>
</template>

<script>
  import { ref, toRefs } from 'vue';
  import { songsCollection, storage } from '@/global/firebase';

  export default {
    name: 'SongDetail',
    props: {
      song: { type: Object, required: true },
      updateSong: { type: Function, required: true },
      removeSong: { type: Function, required: true },
      index: { type: Number, required: true },
    },
    setup(props) {
      const showForm = ref(false);
      const { song, updateSong, index, removeSong } = toRefs(props);

      const schema = {
        modifiedName: 'required',
        genre: 'alphaSpaces',
      };

      const inSubmission = ref(false);
      const showAlert = ref(false);
      const alertVariant = ref('bg-blue-500');
      const alertMsg = ref('Please wait! Updating song info.');

      const editSong = async (values) => {
        inSubmission.value = true;
        showAlert.value = true;
        alertVariant.value = 'bg-blue-500';
        alertMsg.value = 'Please wait! Updating song info.';
        try {
          await songsCollection.doc(song.value.docId).update(values);
        } catch (error) {
          inSubmission.value = false;
          alertVariant.value = 'bg-red-500';
          alertMsg.value = 'Something went wrong! Try again later';
          console.log(error);
          return;
        }

        updateSong.value(index.value, values);
        inSubmission.value = false;
        alertVariant.value = 'bg-green-500';
        alertMsg.value = 'Success!';
      };

      const deleteSong = async () => {
        const storageRef = storage.ref();
        const songsRef = storageRef.child(`songs/${song.value.originalName}`);

        await songsRef.delete();
        await songsCollection.doc(song.value.docId).delete();
        removeSong.value(index.value);
      };

      return {
        showForm,
        schema,
        editSong,
        inSubmission,
        showAlert,
        alertVariant,
        alertMsg,
        deleteSong,
      };
    },
  };
</script>
