import { defineStore } from 'pinia'

import { axiosAPI } from 'src/api/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: null,
    username: null,
  }),
  actions: {
    async getCSRFToken() {
      const response = await axiosAPI.get('csrf/')
      let token = response.headers.get('X-CSRFToken')
      return token
    },
    async login(email, password) {
      try {
        await axiosAPI.post('http://localhost:8000/_allauth/browser/v1/auth/login', email, password)
        const response = await axiosAPI.get(
          'http://localhost:8000/_allauth/browser/v1/auth/session',
        )
        console.log(response)
        console.log(response.data)
        this.username = response.data.data.user.display
        this.isAuthenticated = true
      } catch (error) {
        console.log(error)
      }
    },

    async logout() {
      this.isAuthenticated = null
      await axiosAPI.delete('http://localhost:8000/_allauth/browser/v1/auth/session')
      localStorage.removeItem('Authenticated')
      this.username = null
      localStorage.removeItem('Username')
      // await axiosAPI.delete("http://localhost:8000/_allauth/browser/v1/auth/session");
    },

    async register(username, email, password) {
      await axiosAPI.post(
        'http://localhost:8000/_allauth/browser/v1/auth/signup',
        username,
        email,
        password,
      )
    },

    async verifyEmail(key) {
      await axiosAPI.post('http://localhost:8000/_allauth/browser/v1/auth/email/verify', key)
    },
  },
  persist: true,
})
