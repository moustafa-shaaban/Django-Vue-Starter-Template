<script setup>
import { useI18n } from 'vue-i18n';

import { useSettingsStore } from 'src/stores/settings';

const { locale } = useI18n();
const settingsStore = useSettingsStore();

function switchLanguage() {
  const newLang = settingsStore.language === 'en' ? 'ar' : 'en'
  settingsStore.setLanguage(newLang)
  locale.value = newLang
}
</script>

<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated :class="settingsStore.darkMode ? 'bg-dark' : 'bg-primary'">
      <q-toolbar>
        <q-btn flat @click="settingsStore.toggleSideBar()" round dense icon="menu" />
        <q-toolbar-title>{{ $t('title') }}</q-toolbar-title>
        <q-space />
        <q-btn flat round dense icon="translate" @click="switchLanguage" />
        <q-btn flat round dense :icon="settingsStore.darkMode ? 'light_mode' : 'dark_mode'"
          @click="settingsStore.toggleDarkMode()" />
        <q-btn flat round dense icon="login" to="/login" />
        <q-btn flat round dense icon="person_add" to="/register" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
