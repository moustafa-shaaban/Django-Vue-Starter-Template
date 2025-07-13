import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    darkMode: false,
    language: 'en',
    sideBar: false,
  }),
  persist: true,
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
    },
    setLanguage(lang) {
      this.language = lang
    },
    toggleSideBar() {
      this.sideBar = !this.sideBar
    },
  },
})
