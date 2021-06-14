<template>
  <!-- Music Header -->
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div
      class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
      style="background-image: url(/assets/img/song-header.png)"
    ></div>
    <div class="container mx-auto flex items-center">
      <!-- Play/Pause Button -->
      <button
        type="button"
        class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full
        focus:outline-none"
        @click="playSong(song)"
      >
        <i class="fas fa-play"></i>
      </button>
      <div class="z-50 text-left ml-8">
        <!-- Song Info -->
        <div class="text-3xl font-bold">{{ song.modifiedName }}</div>
        <div>{{ song.genre }}</div>
      </div>
    </div>
  </section>
  <!-- Form -->
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">Comments ({{ song.commentCount }})</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <div
          class="text-white text-center font-bold p-5 mb-4"
          v-if="showAlert"
          :class="alertVariant"
        >
          {{ alertMsg }}
        </div>
        <VeeForm
          :validation-schema="schema"
          @submit="submitComment"
          v-show="userLoggedIn"
        >
          <VeeField
            name="comment"
            as="textarea"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
              duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."
          ></VeeField>
          <ErrorMessage class="text-red-600" name="comment" />

          <button
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600 block"
            :disabled="inSubmission"
          >
            Submit
          </button>
        </VeeForm>
        <!-- Sort Comments -->
        <select
          class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
          v-model="sort"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  </section>
  <!-- Comments -->
  <ul class="container mx-auto">
    <li
      class="p-6 bg-gray-50 border border-gray-200"
      v-for="comment in sortedComments"
      :key="comment.docId"
    >
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">{{ comment.name }}</div>
        <time>{{ comment.datePosted }}</time>
      </div>

      <p>
        {{ comment.content }}
      </p>
    </li>
  </ul>
</template>

<script>
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';
  import { songsCollection, auth, commentsCollection } from '@/global/firebase';
  import { reactive, ref, computed, watch } from 'vue';

  export default {
    name: 'SongContent',
    setup() {
      const store = useStore();
      const router = useRouter();
      const route = useRoute();
      const song = reactive({});
      const comments = ref([]);
      const sort = ref('latest');
      const sortQuery = route.query.sort;
      sort.value =
        sortQuery === 'latest' || sortQuery === 'oldest' ? sortQuery : 'latest';

      watch(sort, (newValue) => {
        if (newValue === route.query.sort) return;
        router.push({
          query: {
            sort: newValue,
          },
        });
      });

      const userLoggedIn = computed(() => store.state.userLoggedIn);

      const schema = {
        comment: 'required|min:3',
      };

      const getComments = async () => {
        const snapshots = await commentsCollection
          .where('songId', '==', route.params.id)
          .get();
        comments.value = [];
        snapshots.forEach((doc) => {
          comments.value.push({ docId: doc.id, ...doc.data() });
        });
      };

      const sortedComments = computed(() =>
        comments.value.sort((a, b) => {
          if (sort.value === 'latest')
            return new Date(b.datePosted) - new Date(a.datePosted);
          else return new Date(a.datePosted) - new Date(b.datePosted);
        })
      );

      const getSong = async () => {
        const songSnapshot = await songsCollection.doc(route.params.id).get();

        if (!songSnapshot.exists) {
          router.push({ name: 'home' });
          return;
        }

        Object.assign(song, songSnapshot.data());
      };

      getSong();
      getComments();

      const inSubmission = ref(false);
      const showAlert = ref(false);
      const alertVariant = ref('bg-blue-500');
      const alertMsg = ref('Please wait! Adding your comment.');

      const submitComment = async (values, { resetForm }) => {
        inSubmission.value = true;
        showAlert.value = true;
        alertVariant.value = 'bg-blue-500';
        alertMsg.value = 'Please wait! Adding your comment.';

        const comment = {
          content: values.comment,
          datePosted: new Date().toString(),
          songId: route.params.id,
          name: auth.currentUser.displayName,
          uid: auth.currentUser.uid,
        };

        try {
          await commentsCollection.add(comment);
        } catch (error) {
          inSubmission.value = false;
          alertVariant.value = 'bg-red-500';
          alertMsg.value =
            'An unexpected error occurred. Please try again later';
          return;
        }
        song.commentCount += 1;
        await songsCollection.doc(route.params.id).update({
          commentCount: song.commentCount,
        });
        getComments();
        inSubmission.value = false;
        alertVariant.value = 'bg-green-500';
        alertMsg.value = 'Successfully added your comment.';
        resetForm();
      };

      const playSong = (song) => store.dispatch('playSong', song);

      return {
        song,
        submitComment,
        schema,
        inSubmission,
        showAlert,
        alertVariant,
        alertMsg,
        userLoggedIn,
        comments,
        sortedComments,
        sort,
        playSong,
      };
    },
  };
</script>

<style></style>
