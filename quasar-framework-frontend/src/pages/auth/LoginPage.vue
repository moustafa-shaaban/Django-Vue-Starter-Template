<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DOMPurify from 'dompurify';
import { useAuthStore } from 'src/stores/auth';
import { Cookies } from 'quasar';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const router = useRouter();

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

function onReset() {
  email.value = ''
  password.value = ''
}
</script>

<template>
  <q-page class="flex flex-center">
    <q-card v-if="!authStore.isAuthenticated" flat bordered class="my-card">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Sign to your account</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="login" @reset="onReset">
          <q-input filled type="email" v-model="email" @update:model-value="sanitizeInput('email')" label="Email" required lazy-rules
            :rules="[val => val && val.length > 0 || 'Email is required']" />

          <q-input filled v-model="password" @update:model-value="sanitizeInput('password')" type="password" required label="Password" lazy-rules
            :rules="[val => val && val.length > 0 || 'Password is required']" />
          <q-separator />
          <div class="q-pa-sm q-mt-md">
            <q-btn label="Login" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" class="bg-grey-8 text-white q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>
.my-card {
  width: 400px;
  height: 400px;
}
</style>
