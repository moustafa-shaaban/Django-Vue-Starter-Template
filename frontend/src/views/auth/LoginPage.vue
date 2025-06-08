<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DOMPurify from 'dompurify';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const valid = ref(false);
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const router = useRouter();

const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'Email must be valid',
  v => v.length <= 100 || 'Email must be less than 100 characters',
];

const passwordRules = [
  v => !!v || 'Password is required',
  //v => v.length >= 8 || 'Password must be at least 8 characters',
  v => v.length <= 50 || 'Password must be less than 50 characters',
  //v => /[A-Za-z]/.test(v) || 'Password must contain at least one letter',
  //v => /[0-9]/.test(v) || 'Password must contain at least one number',
];

const sanitizeInput = (field) => {
  if (field === 'email') {
    email.value = DOMPurify.sanitize(email.value.trim());
  } else if (field === 'password') {
    password.value = DOMPurify.sanitize(password.value.trim());
  }
};

async function login() {
  try {
    const sanitizedEmail = DOMPurify.sanitize(email.value);
    const sanitizedPassword = DOMPurify.sanitize(password.value);
    await authStore.login({ email: sanitizedEmail, password: sanitizedPassword })
    router.push('/dashboard')
  } catch (error) {
    console.log(error)
  }
};

onMounted(() => {
  if (!Cookies.get('csrftoken')) {
    try {
      authStore.getCSRFToken();
    } catch (error) {
      console.log(error)
    }
  }
})
</script>

<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-card-title class="text-center">Login</v-card-title>
          <v-card-text>
            <v-form v-model="valid" @submit.prevent="login">
              <v-text-field v-model="email" label="Email" type="email" :rules="emailRules" required
                prepend-icon="mdi-email" @input="sanitizeInput('email')"></v-text-field>
              <v-text-field v-model="password" label="Password" :type="showPassword ? 'text' : 'password'"
                :rules="passwordRules" required prepend-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword" @input="sanitizeInput('password')"></v-text-field>
              <v-btn type="submit" color="primary" block class="mt-4" :disabled="!valid">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<!-- <template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <h3>Email</h3>
      <input type="email" v-model="user.email" />
      <h3>Password</h3>
      <input type="password" v-model="user.password" />
      <input type="submit" value="Login">
    </form>
  </div>
</template> -->

<!-- <script setup>
import { reactive, onMounted } from 'vue';
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router';

import { axiosAPI } from '@/api/axios';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const user = reactive({
  email: '',
  password: ''
})

async function login() {
  try {
    await authStore.login(user)
  } catch (error) {
    console.log(error)
  }
};

onMounted(() => {
  if (!Cookies.get('csrftoken')) {
    try {
      authStore.getCSRFToken();
    } catch (error) {
      console.log(error)
    }
  }
})
</script> -->

<style lang="scss" scoped></style>
