<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Authenticated App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleTheme">
        <v-icon>{{ $vuetify.theme.current.name === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-moon-waxing-crescent'
          }}</v-icon>
      </v-btn>
      <v-btn @click="logout">
        Logout
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" subtitle="sandra_a88@gmailcom">{{
          authStore.username }}</v-list-item>
        <v-list-item title="Dashboard" prepend-icon="mdi-home" to="/dashboard"></v-list-item>
        <v-list-item title="Profile" prepend-icon="mdi-account" to="/profile"></v-list-item>
        <v-list-item title="Settings" prepend-icon="mdi-cog" to="/settings"></v-list-item>
        <v-list-item title="Logout" prepend-icon="mdi-logout" @click="logout"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from 'vuetify';

const authStore = useAuthStore();

const drawer = ref(true);
const router = useRouter();
const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>
