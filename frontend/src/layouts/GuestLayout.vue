<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Welcome</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleTheme">
        <v-icon>{{ $vuetify.theme.current.name === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-moon-waxing-crescent'
        }}</v-icon>
      </v-btn>
      <v-btn to="/login" class="mx-2">Login</v-btn>
      <v-btn to="/register" color="primary">Register</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row justify="center" align="center" style="min-height: 80vh">
          <RouterView />
          <!-- <v-col cols="12" sm="8" md="6">
            <v-card>
              <v-card-title class="text-center">Welcome to Our App</v-card-title>
              <v-card-text>
                <p class="text-center mb-4">Discover amazing features by joining our community!</p>
                <v-row>
                  <v-col>
                    <v-btn block to="/login" variant="outlined">Login</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn block to="/register" color="primary">Register</v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col> -->
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useTheme } from 'vuetify';

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
