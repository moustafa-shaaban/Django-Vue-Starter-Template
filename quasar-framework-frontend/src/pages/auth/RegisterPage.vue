<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DOMPurify from 'dompurify';
import { useAuthStore } from 'src/stores/auth';

const authStore = useAuthStore();

const valid = ref(false);
const username = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const router = useRouter();

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

<template>
  <q-page class="flex flex-center">
    <q-card v-if="!authStore.isAuthenticated" flat bordered class="my-card">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Register for a new account</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="register" @reset="onReset">
          <!-- <q-input filled v-model="user.name" label="Name" required lazy-rules
            :rules="[val => val && val.length > 0 || 'Name is required']" /> -->
          <q-input filled v-model="user.email" type="email" required label="Email" lazy-rules
            :rules="[val => val && val.length > 0 || 'Email is required']" />
          <q-input filled v-model="user.username" type="text" label="Username" required lazy-rules
            :rules="[val => val && val.length > 0 || 'Username is required']" />
          <q-input filled v-model="user.password" type="password" required label="Password" lazy-rules
            :rules="[val => val && val.length > 0 || 'Password is required']" />
          <q-input filled v-model="user.password2" type="password" required label="Confirm Password" lazy-rules
            :rules="[val => val && val.length > 0 || 'Password is required']" />
          <!-- <q-input filled v-model="user.birthday" type="date" required label="Date of Birth" lazy-rules
            :rules="[val => val && val.length > 0 || 'Date of Birth is required']" /> -->
          <q-separator />
          <div class="q-pa-sm q-mt-md">
            <q-btn label="Register" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" class="bg-grey-8 text-white q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
