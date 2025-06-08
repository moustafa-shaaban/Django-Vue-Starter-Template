<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12 text-center">
          <v-card-title class="justify-center text-h4">500 - Internal Server Error</v-card-title>
          <v-card-text>
            <p class="text-body-1 mb-4">Something went wrong on our end. Please try again later.</p>
            <v-btn color="primary" to="/" class="ma-2">Go to Home</v-btn>
            <v-btn variant="outlined" @click="retry" class="ma-2">Try Again</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const retry = () => {
  // Reload the current page or redirect to the previous route
  router.go(0); // Reloads the current route
};
</script>
