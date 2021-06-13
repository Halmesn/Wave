<template>
  <Introduction />

  <Content />
</template>

<script>
  import Introduction from '@/components/Introduction.vue';
  import Content from '@/components/Content.vue';

  export default {
    name: 'Home',
    components: { Introduction, Content },
  };
</script>
