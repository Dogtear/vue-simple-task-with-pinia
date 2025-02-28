<script setup>
import Navbar from '@/components/Layout/Navbar.vue';
import { useStoreAuth } from './stores/storeAuth';
import { onMounted } from 'vue';

const authStore = useStoreAuth();

onMounted(() => {
  authStore.init();
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
