<script setup>
import { ref, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useTheme } from 'vuetify'
import { useAuthStore } from './stores/auth'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
const drawer = ref(false);

const authStore = useAuthStore();
</script>
<template>
  <RouterView />
  <!-- <v-layout class="">
    <v-app-bar>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>My files</v-toolbar-title>
      <v-btn @click="toggleTheme">toggle theme</v-btn>
      <v-btn v-if="authStore.isAuthenticated" @click="authStore.logout">Logout</v-btn>
      <template v-else>
        <v-btn :to="{ name: 'login' }">Login</v-btn>
        <v-btn :to="{ name: 'register' }">Register</v-btn>
      </template>

<v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
</v-app-bar>

<v-navigation-drawer v-model="drawer">
  <v-list>
    <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" subtitle="sandra_a88@gmailcom"
      title="Sandra Adams"></v-list-item>
  </v-list>

  <v-divider></v-divider>

  <v-list density="compact" nav>
    <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
    <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
    <v-list-item prepend-icon="mdi-star" title="Toggle Theme" value="starred" @click="toggleTheme"></v-list-item>
  </v-list>
</v-navigation-drawer>

<v-main class="d-flex align-center justify-center" height="300">
  <v-container>
    <RouterView />
  </v-container>
</v-main>
</v-layout> -->
</template>
