<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
    <div class="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
      <div class="p-8 sm:p-10">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-6 tracking-tight">Welcome Back!</h1>
        <div class="space-y-6">
          <form @submit.prevent="login">
            <div>
              <input
                  v-model="email"
                  class="w-full p-3 border border-gray-200 rounded-lg text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  type="email"
                  placeholder="Enter your email"
                  required
              />
            </div>
            <div class="mt-4">
              <PasswordInput
                  v-model="password"
                  class="w-full"
                  placeholder="Enter your password"
              />
            </div>
            <div class="flex justify-center mt-6">
              <button
                  class="w-full max-w-xs bg-blue-600 text-white py-3 rounded-lg font-semibold tracking-wide hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  :disabled="isLoading"
              >
                {{ isLoading ? 'Logging in...' : 'Login' }}
              </button>
            </div>
          </form>
          <p v-if="errorMessage" class="text-red-500 text-center mt-4 text-sm font-medium animate-pulse">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useCookie} from '#app';
import PasswordInput from "~/components/PasswordInput.vue";

definePageMeta({
  middleware: ["auth"]
});

const email = ref('');
const password = ref('');
const errorMessage = ref(null);
const isLoading = ref(false);
const router = useRouter();
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const login = async () => {
  errorMessage.value = null;
  isLoading.value = true;
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email.value, password: password.value}),
      credentials: 'include',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to login');
    }
    const data = await response.json();
    console.log('Login successful, waiting before redirect...');
    const tokenCookie = useCookie('auth_token');
    tokenCookie.value = data.access_token;
    await delay(2000);
    await router.push('/');
  } catch (err) {
    errorMessage.value = err.message || 'Invalid email or password';
    console.error('Login failed:', err.message);
  } finally {
    isLoading.value = false;
  }
};
</script>