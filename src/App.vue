<script setup>
import Navbar from '@/components/Layout/Navbar.vue';
import { useStoreNotes } from './stores/storeNotes';
import { onMounted } from 'vue';

const storeNotes = useStoreNotes();

onMounted(() => {
  storeNotes.getNotes();
});
</script>

<template>
  <Navbar />
  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<style>
@import 'bulma/css/bulma.min.css';
</style>
