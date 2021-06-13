<template>
  <section class="mb-8 py-20 text-white text-center relative">
    <div
      class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/header.png)"
    ></div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">
          Wave: Music for everyone!
        </h1>
        <p class="w-full md:w-8/12 mx-auto">
          Wave is a music sharing platform where you can upload and share your
          favorite music, discover what other people are listing, and leave
          comments to be involved in the Wave community! .
        </p>
      </div>
    </div>

    <img
      class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
      src="assets/img/introduction-music.png"
    />
  </section>
</template>

<script>
  export default {
    name: 'Introduction',
  };
</script>

<style></style>
