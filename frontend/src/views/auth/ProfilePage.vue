<script setup>
import { useAuthStore } from '@/stores/auth';

const { username } = useAuthStore();
</script>

<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12 text-center">
          <v-card-title class="justify-center text-h4">Your Profile</v-card-title>
          <v-card-text>
            <p class="text-body-1 mb-4">Hello: {{ username }}.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
