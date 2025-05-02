<template>
  <div class="flex items-center justify-end p-4">
    <img
        @click="logout"
        src="/images/logout.png"
        alt="Logout"
        class="w-10 h-10 cursor-pointer hover:opacity-75 transition-opacity duration-200"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCookie } from '#app';

definePageMeta({
  middleware: ['auth'],
  layout: 'navbar'
});

const router = useRouter();

const logout = () => {
  const authToken = useCookie('auth_token');
  authToken.value = null;
  router.push('/login');
};
</script> 