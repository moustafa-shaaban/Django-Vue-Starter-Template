<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-card-title class="text-center">Register</v-card-title>
          <v-card-text>
            <v-form v-model="valid" @submit.prevent="submitRegister">
              <v-text-field v-model="username" label="Username" :rules="usernameRules" required
                prepend-icon="mdi-account" @input="sanitizeInput('username')"></v-text-field>
              <v-text-field v-model="email" label="Email" type="email" :rules="emailRules" required
                prepend-icon="mdi-email" @input="sanitizeInput('email')"></v-text-field>
              <v-text-field v-model="password" label="Password" :type="showPassword ? 'text' : 'password'"
                :rules="passwordRules" required prepend-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword" @input="sanitizeInput('password')"></v-text-field>
              <v-btn type="submit" color="primary" block class="mt-4" :disabled="!valid">Register</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DOMPurify from 'dompurify';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const valid = ref(false);
const username = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const router = useRouter();

const usernameRules = [
  v => !!v || 'Username is required',
  v => /^[a-zA-Z0-9_-]{3,20}$/.test(v) || 'Username must be 3-20 characters, letters, numbers, underscores, or hyphens only',
];

const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'Email must be valid',
  v => v.length <= 100 || 'Email must be less than 100 characters',
];

const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 8 || 'Password must be at least 8 characters',
  v => v.length <= 50 || 'Password must be less than 50 characters',
  v => /[A-Za-z]/.test(v) || 'Password must contain at least one letter',
  v => /[0-9]/.test(v) || 'Password must contain at least one number',
  v => /[!@#$%^&*]/.test(v) || 'Password must contain at least one special character',
];

const sanitizeInput = (field) => {
  if (field === 'username') {
    username.value = DOMPurify.sanitize(username.value.trim());
  } else if (field === 'email') {
    email.value = DOMPurify.sanitize(email.value.trim());
  } else if (field === 'password') {
    password.value = DOMPurify.sanitize(password.value.trim());
  }
};

const submitRegister = async () => {
  if (!valid.value) return;

  try {
    // Sanitize all inputs
    const sanitizedUsername = DOMPurify.sanitize(username.value);
    const sanitizedEmail = DOMPurify.sanitize(email.value);
    const sanitizedPassword = DOMPurify.sanitize(password.value);

    // Placeholder for actual API call
    await authStore.register({
      username: sanitizedUsername,
      email: sanitizedEmail,
      password: sanitizedPassword,
    })

    // On successful registration, redirect to dashboard
    router.push('/dashboard');
  } catch (error) {
    console.error('Registration failed:', error);
    // Handle error (e.g., show error message)
  }
};
</script>

<style lang="scss" scoped></style>
