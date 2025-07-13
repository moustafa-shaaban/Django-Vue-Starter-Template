<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const retry = () => {
  // Reload the current page or redirect to the previous route
  router.go(0); // Reloads the current route
};
</script>
<template>
  <q-page class="about">
    <h5>500 - Internal Server Error</h5>
    <p class="text-body-1 mb-4">Something went wrong on our end. Please try again later.</p>
    <q-btn to="/">Go to Home</q-btn>
    <q-btn @click="retry">try again</q-btn>
  </q-page>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
