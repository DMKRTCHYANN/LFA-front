<template>
  <div class="flex">
    <div class="w-[15%] bg-[white] min-h-screen p-6 shadow-lg">
      <nuxt-link to="/languages">
        <button
            class="flex items-center justify-center w-full max-w-xs px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <img
              src="/images/language.png"
              alt="Apartment"
              class="w-6 h-6 mr-2 transition-transform duration-300 hover:scale-110"
          />
          <p class="font-semibold tracking-wide">Languages</p>
        </button>
      </nuxt-link>
    </div>
    <div class="w-[85%] bg-gray-200 p-6">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
